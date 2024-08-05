'use client'
import { usePetSearchContext } from "@/lib/hooks"
import { useContext } from "react"



export default function SearchForm() {

  const {handlePetSearchQuery} = usePetSearchContext()

  return (
    <form>
      <input type="search" onChange={(e) => handlePetSearchQuery(e.target.value)} className="px-5 py-2 text-lg rounded-md bg-white/30 w-full"/>
    </form>
  )



}