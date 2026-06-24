import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromCookie, hashPassword } from "@/lib/auth";

function checkAdmin(request: NextRequest) {
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) return false;
  const payload = verifyToken(token);
  return payload && payload.role === "ADMIN";
}

export async function GET(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return NextResponse.json({ data: users, success: true });
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name: name.trim(), email: email.trim().toLowerCase(), password: hashedPassword, role: role || "USER" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return NextResponse.json({ data: user, success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
