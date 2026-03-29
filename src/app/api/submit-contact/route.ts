// app/api/submit-contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── types 
interface ContactPayload {
  // step 1 – contact
  name: string;
  email: string;
  phone: string;
  // step 2 – property
  buildingType: string;
  buildingTypeOther?: string;
  state: string;
  city: string;
  streetAddress: string;
  floors: string;
  // step 3 – appliances
  appliances: string[];
  appliancesOther?: string;
  applianceQuantities: Record<string, number>;
  // step 4 – requirements
  hoursNeeded: string;
  hoursNeededOther?: string;
  installationTime: string;
  installationTimeOther?: string;
  comments?: string;
}


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export async function POST(req: Request) {
  console.log("SMTP_USER:", process.env.SMTP_USER);
  try {
    const body: ContactPayload = await req.json();
    
    console.log("Received payload:", JSON.stringify(body, null, 2));

    
    const requiredFields = [
      'name', 'email', 'phone',
      'buildingType', 'state', 'city', 'streetAddress', 'floors',
      'appliances', 'applianceQuantities',
      'hoursNeeded', 'installationTime'
    ];

    for (const field of requiredFields) {
      if (!body[field as keyof ContactPayload] || 
          (Array.isArray(body[field as keyof ContactPayload]) && (body[field as keyof ContactPayload] as any[]).length === 0) ||
          (typeof body[field as keyof ContactPayload] === 'object' && 
           Object.keys(body[field as keyof ContactPayload] as object).length === 0 && 
           field === 'applianceQuantities')) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Conditional validation for "Other" fields
    if (body.buildingType === "Other" && !body.buildingTypeOther?.trim()) {
      return NextResponse.json(
        { error: "Please specify building type" },
        { status: 400 }
      );
    }

    if (body.appliances.includes("Other") && !body.appliancesOther?.trim()) {
      return NextResponse.json(
        { error: "Please specify other appliances" },
        { status: 400 }
      );
    }

    if (body.hoursNeeded === "Other" && !body.hoursNeededOther?.trim()) {
      return NextResponse.json(
        { error: "Please specify hours needed" },
        { status: 400 }
      );
    }

    if (body.installationTime === "Other" && !body.installationTimeOther?.trim()) {
      return NextResponse.json(
        { error: "Please specify installation timeline" },
        { status: 400 }
      );
    }


    const applianceList = Object.entries(body.applianceQuantities)
      .map(([app, qty]) => `<li style="padding: 4px 0;">${app}: <strong>${qty}</strong></li>`)
      .join('');

 transporter// confirmation email → customer ──
await transporter.sendMail({
  from: `Lumogrid <${process.env.SMTP_USER}>`,
  to: body.email,
  subject: "Thank you for your interest in Lumogrid Solar! 🌞",
  html: `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 28px; font-weight: 700; color: #16a34a;">☀️ Lumogrid</span>
      </div>

      <h2 style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 8px;">
        Hi ${body.name}, you're all set!
      </h2>
      <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
        Thank you for reaching out to Lumogrid. We've received your request and our customer service team will be in touch with you shortly to discuss a tailored solar energy solution for your home.
      </p>

      <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 13px; font-weight: 600; color: #15803d; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
          What happens next
        </p>
        <p style="color: #374151; font-size: 14px; margin-bottom: 6px;">📧 You'll receive updates via email at <strong>${body.email}</strong></p>
        <p style="color: #374151; font-size: 14px; margin-bottom: 6px;">📞 A rep will contact you on <strong>${body.phone}</strong> within 24 hours</p>
        <p style="color: #374151; font-size: 14px;">🏠 A free home assessment will be scheduled at your convenience</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
          📋 Your Submission Summary
        </h3>
        
        <!-- Contact Info -->
        <div style="margin-bottom: 20px;">
          <p style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">
            Contact Information
          </p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Name:</strong> ${body.name}</p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Email:</strong> ${body.email}</p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Phone:</strong> ${body.phone}</p>
        </div>

        <!-- Property Details -->
        <div style="margin-bottom: 20px;">
          <p style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">
            Property Details
          </p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Building Type:</strong> ${body.buildingType}${body.buildingTypeOther ? ` (${body.buildingTypeOther})` : ''}</p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Address:</strong> ${body.streetAddress}, ${body.city}, ${body.state}</p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Number of Floors:</strong> ${body.floors}</p>
        </div>

        <!-- Appliances -->
        <div style="margin-bottom: 20px;">
          <p style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">
            Appliances to Power
          </p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            ${applianceList}
          </ul>
          ${body.appliancesOther ? `<p style="color: #374151; font-size: 14px; margin: 8px 0;"><strong>Other Appliances:</strong> ${body.appliancesOther}</p>` : ''}
        </div>

        <!-- Requirements -->
        <div>
          <p style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">
            Power Requirements
          </p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Hours Needed Per Day:</strong> ${body.hoursNeeded}${body.hoursNeededOther ? ` (${body.hoursNeededOther})` : ''}</p>
          <p style="color: #374151; font-size: 14px; margin: 4px 0;"><strong>Installation Timeline:</strong> ${body.installationTime}${body.installationTimeOther ? ` (${body.installationTimeOther})` : ''}</p>
          ${body.comments ? `<p style="color: #374151; font-size: 14px; margin: 8px 0 4px 0;"><strong>Additional Comments:</strong><br/>${body.comments}</p>` : ''}
        </div>
      </div>

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <p style="font-size: 13px; color: #1e40af; margin: 0;">
          💡 <strong>Tip:</strong> Keep this email for your records. Our team will reference these details during your consultation.
        </p>
      </div>

      <p style="color: #9ca3af; font-size: 13px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        If you have any questions in the meantime, reply to this email or call us.<br />
        © 2025 Lumogrid · Lagos, Nigeria
      </p>
    </div>
  `,
});

    const csEmail = process.env.CS_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `Lumogrid Leads <${process.env.SMTP_USER}>`,
      to: csEmail,
      subject: `[New Lead] ${body.name} — Solar Assessment Request`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
          <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 16px;">
            🆕 New Lead — Solar Assessment Request
          </h2>

          <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
              Contact Information
            </h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280; width: 120px;">Name</td>
                <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #111827;">${body.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Email</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.email}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Phone</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.phone}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
              Property Details
            </h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280; width: 120px;">Building Type</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.buildingType}${body.buildingTypeOther ? ` (${body.buildingTypeOther})` : ''}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Address</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.streetAddress}, ${body.city}, ${body.state}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Floors</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.floors}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
              Appliances & Quantities
            </h3>
            <ul style="margin: 0; padding-left: 20px; list-style: none;">
              ${applianceList}
            </ul>
            ${body.appliancesOther ? `<p style="font-size: 13px; color: #6b7280; margin-top: 10px;"><strong>Other:</strong> ${body.appliancesOther}</p>` : ''}
          </div>

          <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
              Requirements
            </h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280; width: 150px;">Hours Needed/Day</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.hoursNeeded}${body.hoursNeededOther ? ` (${body.hoursNeededOther})` : ''}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Installation Timeline</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.installationTime}${body.installationTimeOther ? ` (${body.installationTimeOther})` : ''}</td>
              </tr>
              ${body.comments ? `
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Comments</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827;">${body.comments}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background: #fef3c7; border-radius: 8px; padding: 14px 18px;">
            <p style="font-size: 13px; color: #92400e; margin: 0;">
              ⏰ Please follow up within <strong>24 hours</strong> of this request.
            </p>
          </div>

          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
            Sent automatically by Lumogrid · ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("FULL ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}