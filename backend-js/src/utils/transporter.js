import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport(
    {
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
      },
      service: process.env.SERVICE 
    }
)

export {
    transporter
}