import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  const formData = await request.formData()
  const applicationData = Object.fromEntries(formData)

  // Configure Gmail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // This should be an App Password if 2FA is enabled
    },
  })

  // Format the application data for email
  const applicationDetails = `
    New Apartment Application Details:
    --------------------------------
    Name: ${applicationData.name}
    Email: ${applicationData.email}
    Phone: ${applicationData.phone}
    Annual Income: $${applicationData.income}
    
    Additional Information:
    ${applicationData.message}
    
    Property Details:
    ----------------
    Apartment ID: ${applicationData.apartmentId}
    
    This is an automated message from your HomeHaven application system.
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: "carlosreynaga108@gmail.com",
    subject: "New Apartment Application Received - HomeHaven",
    text: applicationDetails,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">New Apartment Application Received</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <h3 style="color: #334155;">Applicant Information</h3>
          <p><strong>Name:</strong> ${applicationData.name}</p>
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>Phone:</strong> ${applicationData.phone}</p>
          <p><strong>Annual Income:</strong> $${applicationData.income}</p>
          
          <h3 style="color: #334155; margin-top: 20px;">Additional Information</h3>
          <p>${applicationData.message}</p>
          
          <h3 style="color: #334155; margin-top: 20px;">Property Details</h3>
          <p><strong>Apartment ID:</strong> ${applicationData.apartmentId}</p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
          This is an automated message from your HomeHaven application system.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json(
      {
        message: "Application submitted successfully",
        details: "You will receive a confirmation email shortly.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        error: "Failed to submit application",
        details: "Please try again or contact support if the problem persists.",
      },
      { status: 500 },
    )
  }
}

