import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  title: ReactNode;
  href: string;
  subtitle: string;
  icon: ReactNode;
}

export default function Card({ title, subtitle, href, icon }: CardProps) {
  return (
    <Link href={href} legacyBehavior>
      <a className="block h-full">
        <div className="group h-full overflow-hidden rounded-xl border border-yellow-custom dark:border-yellow-custom bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl dark:bg-[#1E293B]">
          <div className="flex min-h-[124px] items-start gap-3 p-5 text-light-blue-custom dark:text-[#60A5FA]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[2.5rem] text-light-blue-custom dark:text-[#60A5FA]">
              {icon}
            </div>
            <div className="flex min-h-[84px] flex-1 flex-col justify-center">
              <h2 className="text-base font-semibold text-yellow-custom transition-colors duration-300 group-hover:text-[#F97316] dark:text-yellow-custom">
                {title}
              </h2>
              <p className="text-sm leading-6 text-gray-800 transition-colors duration-300 dark:text-[#E5E7EB]">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
