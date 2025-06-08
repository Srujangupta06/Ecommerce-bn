export const generateOTP = (n: number): string => {
    let otp = '';
    for (let i = 0; i < n; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}


// OTP Expires in 2 minutes
export const setOTPExpiration = (): Date => {
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);
    return otpExpiresAt
}