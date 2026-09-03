import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "habibboboho@gmail.com",
      replyTo: email,
      subject: `📩 Pesan Baru Portfolio dari ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 28px; border: 1px solid #334155; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
              .header { font-size: 20px; font-weight: bold; color: #c084fc; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 12px; }
              .field { margin-bottom: 16px; }
              .label { font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: bold; letter-spacing: 0.5px; }
              .value { font-size: 15px; color: #f1f5f9; margin-top: 4px; }
              .message-box { background: #0f172a; border-radius: 12px; padding: 16px; border: 1px solid #334155; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; }
              .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">🚀 Pesan Baru dari Portofolio Kamu!</div>
              <div class="field">
                <div class="label">Pengirim</div>
                <div class="value"><b>${name}</b> (${email})</div>
              </div>
              <div class="field">
                <div class="label">Pesan</div>
                <div class="message-box">${message}</div>
              </div>
              <div class="footer">
                Pesan ini dikirim otomatis melalui form Get in Touch di website portofolio kamu.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Gagal memproses pengiriman pesan." },
      { status: 500 }
    );
  }
}
