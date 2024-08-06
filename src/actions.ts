'use server'
import prisma from "./lib/script";
import { revalidatePath } from "next/cache";
import { IdSchema, petFormSchema } from "./lib/validations";
import { auth, signIn, signOut } from "./lib/auth";
import bcrypt from 'bcryptjs'
import { checkAuth } from "./lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { toast } from "sonner";


// --- user actions ---

export async function signUp(prevState: unknown, formData: FormData) {
  
  const authData = Object.fromEntries(formData.entries());
  const hashedPassword = await bcrypt.hash(authData.password as string, 10);

  const validatedFormData = petFormSchema.safeParse(authData);


  try
  {await prisma.user.create({
    data:{
      email: authData.email.toString(),
      hashedPassword,
    }
  })}
  catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          errorMessage: "Email already exists",
          success: false,
        };
      }
    }
    return {
      errorMessage: "Could not create user",
      success: false,
    };
  }

  return {
    success : true,
  }

}

export async function logOut() {
  'use server'

  await signOut({redirectTo: "/"});
}



export async function logIn(prevState: unknown, formData: FormData) {

  const authData = Object.fromEntries(formData.entries());


  try {
    await signIn("credentials", {...authData, redirectTo: '/app/dashboard'}) 
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Could not sign in.",
          };
        }
      }
    }
    throw error; // nextjs redirects throw error, so we need to rethrow it
  }

}



// --- pet actions
export async function addPet(newPet : unknown) {

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(newPet);
  if(!validatedPet.success) {
    return {
      message: "invalid pet data",
    };
  } 


  try {
    await prisma.pet.create({
      data: {
      ...validatedPet.data,
      user: {
        connect: {
          id: session.user.id
        }
      }
      }
    });
  } catch (error) {
    console.log(error)
    return {
      message: "Could not add pet"
    }
  }
  revalidatePath('/app', 'layout');
}

export async function deletePet(petId : unknown) {
  
  const session = await checkAuth();

  const validatedPetId = IdSchema.safeParse(petId);

  if(!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  } 

  // authorization check (user owns pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id:  validatedPetId.data
    },
    select: {
      userId: true,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found."
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }


  // database mutation
 try { 
  await prisma.pet.delete({
    where: {
      id: validatedPetId.data,
    },
  })}
  catch(error) {
    return "Could not delete pet"
  }
  revalidatePath('/app', 'layout');
}

export async function editPet(selectedPetId : unknown, newPet: unknown) {
 
  const validatedPetId = IdSchema.safeParse(selectedPetId);
  const validatedPet = petFormSchema.safeParse(newPet);

  if(!validatedPetId.success || !validatedPet.success ) {
    return {
      message: "Invalid pet data",
    };
  } 

  const session = await checkAuth();

  // authorization check (user owns pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id:  validatedPetId.data
    },
    select: {
      userId: true,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found."
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }

  try
  {await prisma.pet.update({
    where: {
      id: validatedPetId.data,
    },
    data: validatedPet.data
  })}
  catch(error) {
    console.log(error)
    return "Could not add pet";
  }


  revalidatePath('/app', 'layout');
}