import { openai } from "../utils/openai.js"
import Razorpay from "razorpay"
import crypto from "crypto"

const diseasePrediction = async(req, res)=>{
    try {

        const {symptoms} = req.body

        console.log(symptoms)

        const gptQuery = "Act as a symptom based disease prediction." + "Symptom is: " + symptoms + ". Give only five name of disease in a comma separated like for example:  Angina pectoris, Coronary artery disease, Heart attack (Myocardial infarction), Gastroesophageal reflux disease (GERD), Pleurisy. And Also give brief description of diseases in with comma(,) separated and in new line. And suggest one doctor specialist only name not their description at the end and in new line"

        const gptResponse = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        return res.status(200).json({
            gptResponse
        })
        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const paymentGateway = async(req, res)=>{
    try {
        const razorpay = new Razorpay({

            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
    
        const options = req.body;

        console.log("options: ", options)
        const order = await razorpay.orders.create(options);
    
        if(!order) {
            return res.status(500).send("Error");
        }
    
        
            res.status(200).json({
                order
            })

        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const orderValidate =  async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        console.log("sha************",sha)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        console.log(digest)

        if(digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }
    
        res.status(200).json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
    
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

export { 
    diseasePrediction,
    paymentGateway,
    orderValidate 
 }