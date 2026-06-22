import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Delete existing data to prevent duplicates
  await prisma.contactRequest.deleteMany();
  await prisma.news.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.service.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Администратор",
      email: "admin@saryarka-eng.kz",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create manager user
  const managerPassword = await bcrypt.hash("manager123", 12);
  const manager = await prisma.user.create({
    data: {
      name: "Менеджер",
      email: "manager@saryarka-eng.kz",
      password: managerPassword,
      role: "USER",
    },
  });
  console.log(`Created manager user: ${manager.email}`);

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: "Проектирование инженерных систем",
        slug: "engineering-design",
        description: "Разработка комплексных проектов инженерных систем для промышленных и гражданских объектов.",
        icon: "🏗️",
        order: 1,
      },
    }),
    prisma.service.create({
      data: {
        title: "Электромонтажные работы",
        slug: "electrical-installation",
        description: "Профессиональный монтаж электрических систем любой сложности.",
        icon: "⚡",
        order: 2,
      },
    }),
  ]);
  console.log(`Created ${services.length} services`);

  // Create projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: "Автоматизация НПЗ «КазМунайГаз»",
        slug: "automation-kazmunaygaz",
        description: "Комплексная автоматизация установок первичной переработки нефти.",
        category: "Автоматизация",
        technologies: ["Siemens SCADA", "PLC S7-1500", "WinCC OA"],
        featured: true,
      },
    }),
    prisma.project.create({
      data: {
        title: "Электромонтаж ТЦ «Мега»",
        slug: "electrical-mega-mall",
        description: "Полный комплекс электромонтажных работ нового торгово-развлекательного центра.",
        category: "Электромонтаж",
        technologies: ["ABB", "Schneider Electric"],
        featured: true,
      },
    }),
  ]);
  console.log(`Created ${projects.length} projects`);

  // Create news
  const news = await Promise.all([
    prisma.news.create({
      data: {
        title: "Компания получила сертификат ISO 9001:2015 нового образца",
        slug: "iso-9001-2015-certification",
        excerpt: "По итогам аудита компания успешно прошла ресертификацию системы менеджмента качества.",
        content: "<p>В ноябре 2024 года компания успешно прошла ресертификацию...</p>",
        category: "Компания",
        published: true,
      },
    }),
    prisma.news.create({
      data: {
        title: "Участие в международной выставке KIOGE 2024",
        slug: "kioge-2024-exhibition",
        excerpt: "Компания представила свои разработки в области промышленной автоматизации.",
        content: "<p>На выставке KIOGE 2024 наша компания презентовала...</p>",
        category: "Мероприятия",
        published: true,
      },
    }),
  ]);
  console.log(`Created ${news.length} news articles`);

  // Create contact requests
  const requests = await Promise.all([
    prisma.contactRequest.create({
      data: {
        name: "Ерлан Ибрагимов",
        email: "erlan@example.kz",
        phone: "+7 701 123 4567",
        message: "Нам нужен расчет стоимости проектирования вентиляции для склада 2000 кв.м.",
        status: "NEW",
      },
    }),
    prisma.contactRequest.create({
      data: {
        name: "ТОО СтройСервис",
        email: "info@stroyservis.kz",
        message: "Приглашаем принять участие в тендере на электромонтажные работы.",
        status: "READ",
      },
    }),
  ]);
  console.log(`Created ${requests.length} contact requests`);

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
