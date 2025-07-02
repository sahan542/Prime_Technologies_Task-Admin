"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TActiveLinkProps = {
  href: string;
  exact?: boolean;
  children: ReactNode;
  className?: string;
};

const ActiveLink = ({
  href,
  children,
  exact = false,
  className,
}: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center h-full px-4 font-medium transition-colors duration-300 hover:bg-[#4A4690]",
        isActive ? "bg-[#4A4690]" : "",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
