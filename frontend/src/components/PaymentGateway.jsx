import axios from "axios"

function PaymentGateway({formData, id}) {
    console.log("id", id)
    const amount = 199
    const paymentHandler = async (e) => {
        try {

            e.preventDefault()

            const {data:{key}} = await axios.get("http://127.0.0.1:4000/api/getkey")

            const {data:{order}} = await axios.post("http://127.0.0.1:4000/api/v1/user/checkout",{
                amount
            })

            const options = {
                key, 
                amount: order.amount,
                currency: "INR",
                name: "HealthChart",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.id, 
                callback_url: `http://127.0.0.1:4000/api/v1/user/paymentverification?id=${id}`,
                prefill: {
                  name: "Muzzammil",
                  email: "youremail@example.com",
                  contact: "9999999999",
                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#3399cc",
                },
              }

              const razor = new window.Razorpay(options)
              razor.open()
            
        }catch (error) {
            console.log(error)
        } 
    }
    return (
        <div>
        <div className="flex items-center justify-center mt-[8rem]">
            
        <div className="payment-portal bg-gray-200 rounded p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Live Consultant</h2>
          <p className="text-gray-600 mb-4">Consult live with doctors</p>
          <img
            src="https://img.freepik.com/free-vector/people-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709683200&semt=sph"
            alt="Doctor Image"
            className="mb-4 h-[15rem]"
          />
          <button
            className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={paymentHandler}
          >
            Buy Token
          </button>
        </div>
      </div>
      </div>
    )
}

export default PaymentGateway