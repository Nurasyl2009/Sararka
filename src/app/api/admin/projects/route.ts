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
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: projects, success: true });
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, slug, description, content, image, category, technologies, featured, published } = body;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Проект с таким slug уже существует" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: description.trim(),
        content: content?.trim() || null,
        image: image?.trim() || null,
        category: category || "general",
        technologies: technologies || [],
        featured: featured || false,
        published: published !== undefined ? published : true,
      },
    });
    return NextResponse.json({ data: project, success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
