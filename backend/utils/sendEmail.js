const nodemailer= require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const sendEmail=(options)=>{
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMPT_EMAIL,

          pass: process.env.SMPT_PASSWORD
        }
      });
      const message={
          from:`${process.env.SMTP_FROM_NAME} < ${process.env.SMTP_FROM_EMAIL}`,
          to: options.email,
          subject:options.subject,
          text:options.message
      }
      transport.sendMail(message)

}


module.exports=sendEmail