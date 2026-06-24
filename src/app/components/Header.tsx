"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import logo from "@/app/public/logopng.webp";
import { LocaleSwitcher } from "@/components/locale-switcher";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

export default function Header() {
  const tNav = useTranslations("Navigation");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none mt-4">
      <div 
        className="header-container w-[92%] max-w-[1150px] border border-white/15 bg-[#0d0f1a]/75 backdrop-blur-md rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),_0_1px_0_0_rgba(255,255,255,0.05)_inset] pointer-events-auto transition-shadow duration-300"
      >
        <MaxWidthWrapper className="flex items-center justify-between gap-4 py-2.5">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Image
              src={logo}
              alt="Mediaverse Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Navigation links */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-lavender/70 sm:flex">
            <a href="#top" className="hover:text-white transition-colors">
              {tNav("home")}
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              {tNav("services")}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {tNav("contact")}
            </a>
          </nav>

          <LocaleSwitcher />
        </MaxWidthWrapper>
      </div>
    </header>
  );
}
