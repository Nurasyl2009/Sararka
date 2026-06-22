// TypeScript types for the application

export type Role = "ADMIN" | "USER";
export type RequestStatus = "NEW" | "READ" | "REPLIED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  category: string;
  technologies: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactRequest {
  id: string;
  name: string;
  phone?: string;
  email: string;
  message: string;
  status: RequestStatus;
  createdAt: Date;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  icon?: string;
  image?: string;
  order: number;
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalNews: number;
  totalRequests: number;
  newRequests: number;
  totalUsers: number;
}

export const SERVICE_DATA = [
  {
    slug: "engineering-design",
    title: "Проектирование инженерных систем",
    shortTitle: "Проектирование",
    description:
      "Разработка комплексных проектов инженерных систем для промышленных и гражданских объектов с применением современного программного обеспечения.",
    icon: "🏗️",
    features: [
      "Технологическое проектирование",
      "Электроснабжение и электрооборудование",
      "Системы вентиляции и кондиционирования",
      "Водоснабжение и канализация",
      "Системы пожарной безопасности",
    ],
    color: "from-blue-600 to-blue-800",
  },
  {
    slug: "electrical-installation",
    title: "Электромонтажные работы",
    shortTitle: "Электромонтаж",
    description:
      "Профессиональный монтаж электрических систем любой сложности: от жилых домов до крупных промышленных предприятий.",
    icon: "⚡",
    features: [
      "Монтаж кабельных трасс",
      "Установка распределительных щитов",
      "Монтаж осветительных систем",
      "Заземление и молниезащита",
      "Пуско-наладочные работы",
    ],
    color: "from-yellow-600 to-orange-700",
  },
  {
    slug: "automation",
    title: "Автоматизация объектов",
    shortTitle: "Автоматизация",
    description:
      "Внедрение современных систем автоматизации и диспетчеризации для повышения эффективности производства и снижения затрат.",
    icon: "🤖",
    features: [
      "SCADA системы",
      "Программируемые логические контроллеры",
      "Системы диспетчерского управления",
      "Интеграция IoT-решений",
      "Промышленные сети передачи данных",
    ],
    color: "from-purple-600 to-indigo-700",
  },
  {
    slug: "maintenance",
    title: "Техническое обслуживание",
    shortTitle: "Обслуживание",
    description:
      "Комплексное техническое обслуживание инженерных систем с гарантией бесперебойной работы вашего оборудования.",
    icon: "🔧",
    features: [
      "Плановое техническое обслуживание",
      "Аварийный ремонт 24/7",
      "Диагностика и тестирование",
      "Замена оборудования",
      "Сервисные контракты",
    ],
    color: "from-green-600 to-teal-700",
  },
];
