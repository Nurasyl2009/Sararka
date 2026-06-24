import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromCookie } from "@/lib/auth";

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
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: news, success: true });
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, image, category, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const existing = await prisma.news.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Новость с таким slug уже существует" }, { status: 400 });
    }

    const newsItem = await prisma.news.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        content: content.trim(),
        excerpt: excerpt?.trim() || null,
        image: image?.trim() || null,
        category: category || "general",
        published: published !== undefined ? published : true,
      },
    });
    return NextResponse.json({ data: newsItem, success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
