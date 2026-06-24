import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromCookie } from "@/lib/auth";

function checkAdmin(request: NextRequest) {
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) return false;
  const payload = verifyToken(token);
  return payload && payload.role === "ADMIN";
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!["NEW", "READ", "REPLIED"].includes(status)) {
      return NextResponse.json({ error: "Недопустимый статус" }, { status: 400 });
    }

    const request2 = await prisma.contactRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ data: request2, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.contactRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
