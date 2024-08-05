'use client'

type TSearchContext = {
  petSearchQuery: string;
  handlePetSearchQuery: (newValue: string) => void;
};

import { createContext, useState } from "react"


export const PetSearchContext = createContext<TSearchContext | null>(null);

export default function PetSearchContextProvider({children} : {children : React.ReactNode}) {
 
  const [petSearchQuery, setPetSearchQuery] = useState("")


  const handlePetSearchQuery = (newValue : string) => {
    setPetSearchQuery(newValue)
  }

  return (
    <PetSearchContext.Provider value={{
     petSearchQuery,
     handlePetSearchQuery,
    }}
    >
      {children}
    </PetSearchContext.Provider>
  )



}