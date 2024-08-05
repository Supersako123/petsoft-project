import { PetContext } from "@/contexts/pet-context-provider";
import { PetSearchContext } from "@/contexts/search-context-provider";
import { useContext } from "react";


export function usePetContext() {

  const context = useContext(PetContext);
  
  if(!context) {
    throw new Error("usePetContext must be used within a PetContextProvider")
  }

  return context;
}

export function usePetSearchContext() {

  const context = useContext(PetSearchContext);
  
  if(!context) {
    throw new Error("usePetSearchContext must be used within a PetSearchContextProvider")
  }
  return context;
}