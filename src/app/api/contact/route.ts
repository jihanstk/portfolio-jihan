import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email to you
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background-color:#f0eef6;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0eef6;padding:32px 16px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(139,92,246,0.08);">
                
                <!-- Header with gradient -->
                <tr>
                  <td style="background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#c4b5fd 100%);padding:40px 32px;text-align:center;">
                    <div style="width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;line-height:60px;font-size:28px;">✉️</div>
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">New Message Received</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Someone reached out via your portfolio</p>
                  </td>
                </tr>

                <!-- Sender Info Card -->
                <tr>
                  <td style="padding:28px 32px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8ff;border-radius:12px;border:1px solid #ede9fe;">
                      <tr>
                        <td style="padding:20px 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:16px;border-bottom:1px solid #ede9fe;">
                                <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#a78bfa;font-weight:600;">From</p>
                                <p style="margin:0;font-size:18px;font-weight:700;color:#1e1b4b;">${name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top:14px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="width:50%;vertical-align:top;">
                                      <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#a78bfa;font-weight:600;">📧 Email</p>
                                      <a href="mailto:${email}" style="color:#4c1d95;font-size:14px;text-decoration:none;font-weight:500;">${email}</a>
                                    </td>
                                    ${phone ? `
                                    <td style="width:50%;vertical-align:top;">
                                      <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#a78bfa;font-weight:600;">📱 Phone</p>
                                      <a href="tel:${phone}" style="color:#4c1d95;font-size:14px;text-decoration:none;font-weight:500;">${phone}</a>
                                    </td>` : ""}
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:20px 32px 0;">
                    <p style="margin:0 0 10px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#a78bfa;font-weight:600;">💬 Message</p>
                    <div style="background:#faf8ff;border-radius:12px;border:1px solid #ede9fe;border-left:4px solid #a78bfa;padding:20px 24px;">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;">${message.replace(/\n/g, "<br/>")}</p>
                    </div>
                  </td>
                </tr>

                <!-- Reply Button -->
                <tr>
                  <td style="padding:24px 32px;" align="center">
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px;">Reply to ${name}</a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:0 32px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f3f0ff;">
                      <tr>
                        <td style="padding-top:16px;text-align:center;">
                          <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">SK Mustakin Rahman Jehan</p>
                          <p style="margin:0;font-size:11px;color:#9ca3af;">Full Stack Developer • Portfolio Contact Form</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
