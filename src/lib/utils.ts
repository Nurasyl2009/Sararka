import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: Date | string): string {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[а-яёА-ЯЁ]/g, (char) => {
      const translitMap: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
        ж: "zh", з: "z", и: "i", й: "j", к: "k", л: "l", м: "m",
        н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
        ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
        ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        А: "a", Б: "b", В: "v", Г: "g", Д: "d", Е: "e", Ё: "yo",
        Ж: "zh", З: "z", И: "i", Й: "j", К: "k", Л: "l", М: "m",
        Н: "n", О: "o", П: "p", Р: "r", С: "s", Т: "t", У: "u",
        Ф: "f", Х: "kh", Ц: "ts", Ч: "ch", Ш: "sh", Щ: "shch",
        Ъ: "", Ы: "y", Ь: "", Э: "e", Ю: "yu", Я: "ya",
      };
      return translitMap[char] || char;
    })
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "READ":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "REPLIED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "NEW":
      return "Новая";
    case "READ":
      return "Прочитана";
    case "REPLIED":
      return "Отвечено";
    default:
      return status;
  }
}
