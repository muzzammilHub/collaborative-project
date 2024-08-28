import { transporter} from "../utils/transporter.js"

const sendPdfByEmail = async(req, res) => {
  
  
  const email = req.query.email
  console.log("Email****", email)
  const pdf = req.file

  if (!pdf) {
    return res.status(400).json({
        success: false,
        message:'No PDF file uploaded'
    });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'E-Prescription',
    text: 'Your Prescription',
    attachments: [
      {
        filename: 'generated.pdf',
        content: pdf.buffer
      }
    ]
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    
    res.status(201).json({
        success: true,
        message: 'Email sent successfully'
    });
  } catch (error) {
    
    res
    .status(500)
    .json({
        error
    })
  }
}

export  {
  sendPdfByEmail
}