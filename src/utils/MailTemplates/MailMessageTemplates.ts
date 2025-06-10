
export const sendOtpMailTemplate = (firstName:string, generatedOTP:string) => {
    return `
            <div>
                <h1>E-commerce Registration Process</h1>

                <p>Dear ${firstName},</p>

                <p>Thank you for registering with our platform. To complete your registration, please verify your email using the One-Time Password (OTP) provided below:</p>

                <h2>Your OTP: <strong>${generatedOTP}</strong></h2>

                <p>This OTP is valid for <strong>1 minute</strong>. Please do not share it with anyone.</p>

                <p>If you did not initiate this request, please ignore this email.</p>

                <br />

                <p>Best regards,</p>
                <p>The E-commerce Team</p>
            </div>`
}


