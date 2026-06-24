"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 border border-white/10 rounded-lg p-1 bg-white/5">
      {['ru', 'kz'].map((l) => (
        <button
          key={l}
          onClick={() => changeLanguage(l)}
          className={`text-[10px] uppercase font-bold px-2 py-1 rounded transition-colors ${
            locale === l ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
