import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.NEXT_PUBLIC_MAIL_API_KEY)

const sendMail = async (data) => {
  const { email, date } = data
  // Goes to us
  const notificationMsg = {
    to: process.env.NEXT_PUBLIC_MAIL_TO,
    from: process.env.NEXT_PUBLIC_MAIL_FROM,
    subject: `Presale registration from ${email}`,
    text: `Presale registration from ${email} on ${date}`
  }

  // Goes to the user
  const confirmationMsg = {
    to: email,
    from: process.env.NEXT_PUBLIC_MAIL_FROM,
    subject: `Confirmation | DeezNutz Presale`,
    text: `Hello ${email},\n\nThis is a confirmation, that your registration for the DeezNutz NFT drop has been received successfully.\nWe'll come back to you as soon as possible.\n\nThank you so much.\nDeezNutz Team`
  }

  try {
    await sgMail.send(notificationMsg)
    await sgMail.send(confirmationMsg)
    return true
  } catch (error) {
    return false
  }
}

export default sendMail
