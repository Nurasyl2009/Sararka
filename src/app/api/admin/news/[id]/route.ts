import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromCookie } from "@/lib/auth";

function checkAdmin(request: NextRequest) {
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) return false;
  const payload = verifyToken(token);
  return payload && payload.role === "ADMIN";
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, excerpt, image, category, published } = body;

    const newsItem = await prisma.news.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(slug && { slug: slug.trim().toLowerCase() }),
        ...(content && { content: content.trim() }),
        excerpt: excerpt?.trim() || null,
        image: image?.trim() || null,
        ...(category && { category }),
        ...(published !== undefined && { published }),
      },
    });
    return NextResponse.json({ data: newsItem, success: true });
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
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
