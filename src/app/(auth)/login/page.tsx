import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="space-y-5">
      <div className="text-center text-3xl font-bold mb-5">Log in</div>
      <AuthForm method='logIn'/>
    <p className="opacity-80 pt-1">No account yet? <Link className="text-black font-bold" href="/signup">Sign up</Link></p>
    </main>


  )
}