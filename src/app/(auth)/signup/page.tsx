import React from "react";
import Link from "next/link";
import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";


export default function Page() {
  return (
    <main className="space-y-5">
      <div className="text-center text-3xl font-bold mb-5">Sign up</div>
      <AuthForm method= 'signUp'/>
    <p className="opacity-80 pt-1">Already have an account? <Link className="text-black font-bold" href="/login">Log in</Link></p>
    </main>

  )
}