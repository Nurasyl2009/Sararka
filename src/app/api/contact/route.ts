import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Заполните обязательные поля: имя, email и сообщение", success: false },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Некорректный email адрес", success: false },
        { status: 400 }
      );
    }

    const contactRequest = await prisma.contactRequest.create({
      data: { name: name.trim(), phone: phone?.trim() || null, email: email.trim().toLowerCase(), message: message.trim() },
    });

    return NextResponse.json({ data: { id: contactRequest.id }, message: "Заявка успешно отправлена", success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Ошибка сервера. Попробуйте позже.", success: false }, { status: 500 });
  }
}
