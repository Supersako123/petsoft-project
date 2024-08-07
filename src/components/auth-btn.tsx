"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";


type AuthBtnProps = {
  type: "signUp" | "logIn";
};



export default function AuthBtn({ type }: AuthBtnProps) {
  const loadingText = type === "signUp" ? "Signing up" : "Logging in"
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="flex gap-1">
      {pending ? <ReloadIcon className="animate-spin" /> : null}
      {pending ? loadingText : (type === "signUp" ? "Sign Up" : "Log In")}
    </Button>
  );
}