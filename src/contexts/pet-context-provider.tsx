'use client'
import { addPet, deletePet, editPet } from "@/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import next from "next";
import { createContext, Dispatch, SetStateAction, useOptimistic, useState } from "react"
import { toast } from "sonner";

type TPetContext = {
  optimisticPets: Pet[],
  selectedPetId: Pet['id'] | null,
  selectedPet: Pet | null,
  handlePetId: (id: Pet['id']) => void,
  handleAddPet: (NewPet: PetEssentials) => void,
  handleEditPet: (petId: Pet['id'], NewPet: PetEssentials) => void,
  handleDeletePet: (petId: Pet['id']) => void
};

export const PetContext = createContext<TPetContext | null>(null);


export default function PetContextProvider({ children, data }: { data: Pet[], children: React.ReactNode }) {
  const [selectedPetId, setSelectedPetId] = useState<Pet['id'] | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (prev, { action, payload }) => {

    if (action === 'add') {
      return [...prev, { ...payload, someId: Math.random().toString() }];
    }
    else if (action === 'edit') {
      return prev.map(pet => pet.id === payload.id ? { ...pet, ...payload.newPetData } : pet);
    }
    else {
      return prev.filter(pet =>(payload !== pet.id))
      
    }

  });


  const selectedPet = optimisticPets.find(pet => (pet.id === selectedPetId)) || null
  const nextId = (optimisticPets.length + 1).toString()

  const handlePetId = (id: Pet['id']) => {
    console.log(`current selected pet id is ${id}`)
    setSelectedPetId(id)
  }


  async function handleAddPet(newPet: PetEssentials) {
    setOptimisticPets({action: 'add', payload : newPet})
    const error = await addPet(newPet);
    if (error) {
      toast.warning("Could not add pet")
    }
  }


  async function handleEditPet(petId: Pet['id'], newPetData: PetEssentials) {
    setOptimisticPets({
      action: "edit",
      payload: {
        id: petId,
        newPetData,
      },
    });
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning("Could not edit pet");
      return;
    }
  }

  async function handleDeletePet(petId: Pet['id']) {
    setOptimisticPets({action: 'delete', payload : petId})
    const error =  await deletePet(petId);
    if (error) {
      toast.warning("Could not delete pet")
    }

  }


  return (
    <PetContext.Provider value={{
      optimisticPets,
      selectedPetId,
      handlePetId,
      handleAddPet,
      handleEditPet,
      handleDeletePet,
      selectedPet,
    }}
    >
      {children}
    </PetContext.Provider>
  )



}