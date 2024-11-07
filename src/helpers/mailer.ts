import  nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';



export const sendMail = async ({email, emailType , userId}:any) => {
    try {

        //mail configuration

      const hashedToken = await bcryptjs.hash(userId.toString() , 10)

// SENDING TOKENS IN DATABASE
        if (emailType === 'VERIFY') {
          await User.findByIdAndUpdate(userId , 
            {$set:
             { verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000}
            }
          )
        } else if (emailType === 'RESET') {
          await User.findByIdAndUpdate(userId , 
            {$set:
              {forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000}
            }
          )
        }
          
        

        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "ee3af5c367b814",
            pass: "c3ee24f9f22ad4"
          }
        });





          const mailOptions = {
            from: 'anshul@gmail.com', // sender address
            to: email, 
            subject: emailType==='VERIFY'?"Verify your email" : " reset your password", // Subject line
            html:`"<p> Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType === 'VERIFY' ? "verify your email":'resey your pass'}
            or copy and paste the link below in your browser
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` , // html body
          }

//SENDING MAIL BY NODEMALER
          const mailRseponse = await transporter.sendMail(mailOptions)
          return mailRseponse

        




    } catch ( error:any) {
        throw new Error(error.message)
    }
}
