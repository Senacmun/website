import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { nome, email, assunto, mensagem, foto_perfil } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nome} via SenaMUN" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Nova mensagem de ${nome} - ${assunto}`,
      html: `
        <div style="font-family: system-ui, sans-serif, Arial; font-size: 12px;">
          <div>Nova mensagem recebida. Por favor, responda o mais rápido possível.</div>
          <div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: lightgrey;">
            <table role="presentation">
              <tbody>
                <tr>
                  <td style="vertical-align: top;">
                    <img src="${foto_perfil}" alt="Foto" style="width: 50px; height: 50px; border-radius: 50%; padding: 6px; margin: 0 10px; background-color: aliceblue;" />
                  </td>
                  <td style="vertical-align: top;">
                    <div style="color: #2c3e50; font-size: 16px;"><strong>Nome: ${nome}</strong></div>
                    <div style="color: #2c3e50; font-size: 14px;"><a href="mailto:${email}">Email: ${email}</a></div>
                    <div style="color: #2c3e50; font-size: 14px;">Assunto: ${assunto}</div>
                    <p style="font-size: 14px; margin-top: 15px; line-height: 1.5;">${mensagem.replace(/\n/g, "<br>")}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}
