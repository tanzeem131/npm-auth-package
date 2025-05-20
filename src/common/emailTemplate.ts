// lib/emailTemplates.ts

interface EmailTemplateOptions {
  heading: string;
  subheading: string;
  content: string; // can be OTP, link, or any HTML string
  isLink?: boolean; // if true, render content as button/link
}

export function getEmailTemplate({
  heading,
  subheading,
  content,
  isLink = false,
}: EmailTemplateOptions) {
  const subject = heading;

  const text = `${heading} - ${subheading}: ${content}`;

  const formattedContent = isLink
    ? `
      <div style="text-align: center; margin: 20px 0;">
        <a href="${content}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          ${subheading}
        </a>
      </div>`
    : `
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold;">
        ${content}
      </div>`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>${heading}</h2>
      <p>${subheading}</p>
      ${formattedContent}
      <p style="color: #666; font-size: 12px;">This message is auto-generated. Do not share this with anyone.</p>
    </div>
  `;

  return { subject, text, html };
}
