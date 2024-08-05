'use client'
import React from "react";
import Image from "next/image";
import { usePetContext, usePetSearchContext } from "@/lib/hooks";



export default function PetList() {

  const {optimisticPets, selectedPetId, handlePetId} = usePetContext();
  const {petSearchQuery} = usePetSearchContext()

  const filteredPets = optimisticPets.filter(pet => {
    const searchQuery = petSearchQuery.toLowerCase();
    const petWords = pet.name.toLowerCase().split(' ');
  
    return petWords.some(word => word.startsWith(searchQuery));
  });


    const listOfPets = filteredPets.map(pet => (
    <li>
      <button onClick={() => handlePetId(pet.id)} className={`flex items-center w-full py-4 px-5 gap-4 hover:bg-gray-200 ${pet.id === selectedPetId ? 'bg-gray-200' : 'bg-white'}`}>
      <Image  className="rounded-full object-cover w-16 h-16"  quality={80} src={pet.imageUrl}  alt="Pet Image" width={65} height={65} />
      <p>{pet.name}</p>
      </button>
    </li>
  )) 


  return (
    <ul className="text-xl font-bold">
       {listOfPets} 
    </ul>
  ) 


}
