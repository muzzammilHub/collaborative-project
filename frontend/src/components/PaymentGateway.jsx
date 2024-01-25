// import DoctorImg from "./doctor.png";
import useRazorpay from "react-razorpay"

function PaymentGateway() {
    const [Razorpay] = useRazorpay();
    const amount = 500;
    const currency = "INR";
    const receiptid = "id1";

    const paymentHandler = async (e) => {
        try {

            e.preventDefault();

            const response = await fetch("http://localhost:4000/api/v1/user/payment",{
                method: "POST",
                body: JSON.stringify({
                    amount,
                    currency,
                    receipt: receiptid,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const order = await response.json();
            console.log(order);

            var options = {
                "key": "rzp_test_ZVS6J7U6e45TIZ", // Enter the Key ID generated from the Dashboard
                 amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                 currency,
                "name": "Acme Corp", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": order?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": async function (response){
                    console.log("response***********", response)
                    const body = {
                          ...response,
                    };

                    console.log("body*********", body)
                    const validateRes = await fetch("http://localhost:4000/api/v1/user/order-validate",
                        
                        {
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const jsonRes = await validateRes.json();
                    console.log(jsonRes);
                },
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    "name": "Ghiyas", //your customer's name
                    "email": "ghiyas@example.com", 
                    "contact": "900009570"  //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options)
            rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
            });
            rzp1.open();
            

            
        } catch (error) {
            console.log("error: " , error)
        }
    };
    return (
        <div className="product">
         <h2>Live Consultant</h2>
         <p> Consult live with doctors </p>
         {/* <img src={DoctorImg} /> */}
         <br />
         <button onClick={paymentHandler}>Buy Token</button>
         </div>
         
    );
}

export default PaymentGateway;