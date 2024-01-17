import { openai } from "../utils/openai.js"

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

export { diseasePrediction }