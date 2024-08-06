"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({children}: {children: ReactNode}) {
  return (
    <nav className="bg-richGreen text-primary-foreground flex justify-center px-4">
      {/* Adding logo */}
      <div className="px-10 py-4 flex-initial">
        <img src="/reframery-logo.png" className="w-10 h-10 object-cover" />
      </div>
        {children}
    </nav>
  );
}

export function NavLink(props : Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return <Link {...props} className={cn("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus:text-secondary-foreground", pathname === props.href && "bg-background text-foreground")}/>
}