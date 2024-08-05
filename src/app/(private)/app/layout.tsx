import React from "react";
import AppHeader from "@/components/app-header";
import PetContextProvider from "@/contexts/pet-context-provider";
import PetSearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/script";
import { checkAuth } from "@/lib/server-utils";

export default async function Layout({children} : {children : React.ReactNode}) {

  const session = await checkAuth();

  const data = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    }
  })


  return (

    <div className="app-background h-full lg:h-screen">
  
    <div className="max-w-[1250px] md:px-10 px-2 mx-auto h-full flex flex-col lg:overflow-hidden">
      <AppHeader/>

      <PetSearchContextProvider>
      <PetContextProvider data ={data}>
      {children}
      </PetContextProvider>
      </PetSearchContextProvider>
    
    </div>
    </div>
  )


}