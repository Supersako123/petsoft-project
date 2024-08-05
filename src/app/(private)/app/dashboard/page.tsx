import ContentBlock from "@/components/ContentBlock";
import DashboardTitle from "@/components/pets-length";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/SearchForm";
import { error } from "console";
import PetsLength from "@/components/pets-length";
import { Button } from "@/components/ui/button";
import PetForm from "@/components/pet-form";
import PetButton from "@/components/pet-button";

export default async function DashboardPage() {

  return (
    <main>
      <div className="hidden sm:flex justify-between mt-8 text-[#E5E8EC]">
        <section>
          <h1 className="font-bold text-4xl">PetSoft</h1>
          <h2 className="font-normal opacity-90 text-lg">Manage your pet daycare with ease</h2>
        </section>
        <section className="text-center flex flex-col justify-center">
          <PetsLength />
          <p className="font-normal text-lg">current guests</p>
        </section>
      </div>

      <div className="grid lg:grid-cols-[450px_1fr] lg:grid-rows-[45px_1fr] lg:h-[650px] sm:grid-rows-[45px_300px_850px] md:grid-rows-[45px_300px_750px] sm:h-[1300px] md:h-[1200px] grid-rows-[45px_320px_890px] h-[1350px] gap-4 mt-10">

        <div className="lg:row-start-1 lg:row-span-1 lg:col-start-1 lg:col-span-1">
          <SearchForm />
        </div>

        <div className="lg:row-start-2 lg:row-span-full lg:col-start-1 lg:col-span-1 relative">
          <ContentBlock>
            <PetList />
            <PetButton actionType="add">+</PetButton>
          </ContentBlock>
        </div>

        <div className="lg:row-start-1 lg:row-span-full lg:col-start-2 lg:col-span-full overflow-hidden shadow-md">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>

      </div>
    </main>
  )
}