'use client'
import { usePetContext } from "@/lib/hooks";
import Image from "next/image"
import PetButton from "./pet-button";


export default function PetDetails() {

  const { optimisticPets, selectedPetId, handlePetId, selectedPet, handleDeletePet} = usePetContext();


 
  if (!selectedPet) {
    return (
      <section className="flex justify-center items-center h-full text-2xl">
        No Selected Pet
      </section>
    )
  } 

  return (
    <section className='flex flex-col'>

      <div className="items-center bg-white py-5 px-10 flex flex-col md:flex-row justify-between border-b-[1px]">
        <div className="flex items-center gap-5">
           <Image className="rounded-full object-cover w-28 h-28" priority src={selectedPet.imageUrl} alt="Pet Image" width={150} height={150} /> 
          <h1 className="text-3xl font-bold">{selectedPet.name}</h1>
        </div>
        <div className="gap-5 flex flex-col md:flex-row mt-3 md:mt-0">
          <PetButton size="lg" actionType="edit">Edit</PetButton>
          <PetButton onClick={async () => await handleDeletePet(selectedPet.id)} size="lg" actionType="checkout">Checkout</PetButton>

        </div>
      </div>



      <div className="flex justify-evenly text-center text-lg mt-8 sm:mt-14 sm:mr-32 mr-0 flex-col sm:flex-row gap-3 sm:gap-0">
        <div className="min-w-56 justify-center flex flex-col">
          <h2 className="font-normal">OWNER NAME</h2>
          <h2>{selectedPet?.ownerName}</h2>
        </div>
        <div>
          <h2 className="font-normal">AGE</h2>
          <h2>{selectedPet?.age}</h2>
        </div>
      </div>

      <div className="sm:mt-12 mt-8 flex m-7 bg-white p-5 font-normal rounded-xl shadow-sm border-[1px] border-gray-100 lg:h-[300px] h-[390px]">
        <p className="[overflow-wrap:anywhere]">
          {selectedPet?.notes}
        </p>
      </div>
    </section>
  )

} 