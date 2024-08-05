'use client'
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";


type TpetButton = {
  actionType: "add" | "edit" | "checkout",
  children: React.ReactNode,
  size?: "sm" | "lg" | "icon",
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PetButton({ actionType, children, size, ...props }: TpetButton) {

  const [isFormopen, setIsFormOpen] = useState(false)

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormopen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size={"icon"} className="absolute bottom-4 right-4">
              <PlusIcon size={"35"} />
            </Button>
          ) : (
            <Button variant={"secondary"} size={size} {...props}>
              {children}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent  onOpenAutoFocus={actionType === 'edit' ? (e) => e.preventDefault() : undefined}>
          <DialogHeader>
            <DialogTitle className="text-[1.35rem] font-bold">
              {actionType === "add" ? "Add a new pet" : "Edit pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm actionType = {actionType} onFormSubmission={() => {
            flushSync(() =>{
            setIsFormOpen(false)})}}  />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Button variant={"secondary"} size={size} {...props}>
      {children}
    </Button>
  )


}
