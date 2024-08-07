"use client";

import { logIn, signUp } from "@/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthBtn from "./auth-btn";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



type AuthFormProps = {
  method: "signUp" | "logIn";
};

export default function AuthForm({ method }: AuthFormProps) {
  const [signUpInfo, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInInfo, dispatchLogIn] = useFormState(logIn, undefined);


  const router = useRouter();

  if (signUpInfo?.success) {
    toast.success("Sign up Successful");
    router.push('/login')
  }
  

  return (
    <form action={method === "logIn" ? dispatchLogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={method === "logIn" ? "test@test.com" : ""}  />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" defaultValue={method === "logIn" ? "121123" : ""} />
      </div>

      <AuthBtn type={method} />

      {signUpInfo?.errorMessage && (
        <p className="text-red-500 text-sm mt-2">{signUpInfo!.errorMessage}</p>
      )}


      {logInInfo && (
        <p className="text-red-500 text-sm mt-2">{logInInfo.message}</p>
      )}
    </form>

  );
}