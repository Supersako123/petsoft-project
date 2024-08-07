import { z } from "zod"


export const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(19),
  ownerName: z.string().trim().min(1, { message: "Owner name is required" }).max(30),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image url must be a valid url" })
  ]),
  age: z.coerce.number({message: "Age must be a number"}).int().positive({message:"Age must be a positive number"}),
  notes: z.union([
    z.literal(""),
    z.string().trim().max(250, { message: "notes must be below 250 characters" })
  ])
})

export const IdSchema = z.string().cuid();

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

