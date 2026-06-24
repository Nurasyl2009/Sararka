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
    const { title, slug, description, content, image, category, technologies, featured, published } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(slug && { slug: slug.trim().toLowerCase().replace(/\s+/g, "-") }),
        ...(description && { description: description.trim() }),
        content: content?.trim() || null,
        image: image?.trim() || null,
        ...(category && { category }),
        ...(technologies !== undefined && { technologies }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
      },
    });
    return NextResponse.json({ data: project, success: true });
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
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
