"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Router from "next/router";
import Logo from "./logo";

export default function AppHeader() {

  const navItems = [
    {
      name: "Dashboard",
      path: "/app/dashboard"
    },
    {
      name: "Account",
      path: "/app/account"
    }
  ]


  const activePathname = usePathname();

  const navButtons = navItems.map(item => (

    <li >
      <Link className={`text-[#E5E8EC] p-2 rounded-sm ${item.path === activePathname ? "bg-black/20" : ""}`} href={item.path}>{item.name}</Link>
    </li>

  ))




  return (
    <header className="border-b-[2px] border-white/20 min-h-20 flex justify-between items-center">
     <Logo/>
      <nav>
        <ul className="flex gap-2">
          {navButtons}
        </ul>
      </nav>
    </header>
  )


}