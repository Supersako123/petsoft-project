import React from "react";
import { cn } from "@/lib/utils";

export default function ContentBlock({children, className} : {children: React.ReactNode, className?: string}) {

  return (
    <div className={cn("bg-[#F7F8FA] shadow-md rounded-md overflow-hidden w-full h-full", className)}>{children}</div>


  )



}