'use client'

import { usePetContext } from "@/lib/hooks"

export default function PetsLength() {

  const {optimisticPets} = usePetContext();


  return (
    <p className="font-bold text-3xl">{optimisticPets.length}</p>
  )


}