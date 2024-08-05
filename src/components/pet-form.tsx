'use client'
import { usePetContext } from "@/lib/hooks"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { petFormSchema } from "@/lib/validations"



type TPetForm = z.infer<typeof petFormSchema>


export default function PetForm({ actionType, onFormSubmission }: { actionType: "edit" | "add", onFormSubmission: () => void }) {

  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();


  const {
    register,
    trigger,
    getValues,
    formState: {
      errors
    },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: 
    actionType === 'edit' ? 
    { 
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      imageUrl: selectedPet?.imageUrl,
      age: selectedPet?.age,
      notes: selectedPet?.notes,
    } :
    {}
  });


  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();
        
        const newPet = getValues();

        newPet.imageUrl = newPet.imageUrl || "https://static.vecteezy.com/system/resources/previews/025/376/182/non_2x/labrador-retriever-dog-illustration-free-vector.jpg"

        if (actionType === 'add') {
          handleAddPet(newPet)
        }
        else if (actionType === 'edit') {
          handleEditPet(selectedPet!.id, newPet)
        }

      }}
      className="flex flex-col">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label className="font-semibold text-[16px]" htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label className="font-semibold text-[16px]" htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register('ownerName')}
          />
          {errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
        </div>

        <div className="space-y-1">
          <Label className="font-semibold text-[16px]" htmlFor="imageUrl">Image URL</Label>
          <Input
            placeholder="Leave blank for default image"
            id="imageUrl"
            {...register('imageUrl')}
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
        </div>

        <div className="space-y-1">
          <Label className="font-semibold text-[16px]" htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register('age')}
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label className="font-semibold text-[16px]" htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
          />
          {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
        </div>

      </div>

      <Button type="submit" className="mt-4 self-end"> {actionType === "add" ? "Add a new pet" : "Edit pet"}</Button>

    </form>

  )

}