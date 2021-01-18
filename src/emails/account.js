const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, Name) => {
        sgMail.send({
            to: email,
            from: 'hetrpatel1506@gmail.com',
            subject: 'Account Created in Task-Manager app',
            text: `Welcome, To Task-manager app , ${Name} , We hope you like our service.`
      })
}

const sendcancelationEmail = (email, Name) => {
    sgMail.send({
        to:email,
        from: 'hetrpatel1506@gmail.com',
        subject: 'Account deleted in Task-Manager app',
        text: `Good bye, ${Name}, Thanks for using our sevice `
    })
}
module.exports = {
    sendWelcomeEmail: sendWelcomeEmail,
    sendcancelationEmail: sendcancelationEmail
}