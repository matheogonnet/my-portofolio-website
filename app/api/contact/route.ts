import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Validation des données du formulaire
const validateFormData = (data: any) => {
  const errors: string[] = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Please provide a valid email address')
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  return errors
}

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    // Ne pas échouer sur les certificats invalides
    rejectUnauthorized: false
  }
})

// Vérifier la configuration avant utilisation
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP configuration error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

export async function POST(request: Request) {
  try {
    // Récupération et parsing des données
    const data = await request.json()

    // Validation des données
    const validationErrors = validateFormData(data)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }

    // Configuration de l'email
    const mailOptions = {
      from: {
        name: "Portfolio Contact Form",
        address: process.env.EMAIL_USER || ''
      },
      to: 'matheo.gonnet@yahoo.fr',
      subject: `Portfolio Contact Form - Message from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${data.name}
        Email: ${data.email}
        Message:
        ${data.message}
      `
    }

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)

    // Réponse en cas de succès
    return NextResponse.json(
      { message: 'Email sent successfully', id: info.messageId },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Réponse en cas d'erreur avec plus de détails
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error && 'code' in error ? (error as any).code : undefined
      },
      { status: 500 }
    )
  }
} 