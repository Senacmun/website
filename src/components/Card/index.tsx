import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  href: string;
  subtitle: string;
  icon: ReactNode;
}

export default function Card({ title, subtitle, href, icon }: CardProps) {
  return (
    <Link href={href} legacyBehavior>
      <a className="block h-full">
        <div className="group h-full bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden shadow-xl border border-yellow-custom dark:border-yellow-custom transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 hover:scale-105">
          <div className="p-6 flex items-center gap-2 text-light-blue-custom dark:text-[#60A5FA]">
            <div className="text-5xl text-light-blue-custom dark:text-[#60A5FA]">{icon}</div>
            <div>
              <h2 className="font-semibold text-lg text-yellow-custom dark:text-yellow-custom group-hover:text-[#F97316] transition-colors duration-300">
                {title}
              </h2>
              <p className="text-gray-800 dark:text-[#E5E7EB] transition-colors duration-300">{subtitle}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}