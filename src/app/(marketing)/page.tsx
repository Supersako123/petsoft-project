import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-[#2C9676] min-h-screen flex justify-center items-center gap-10 flex-col-reverse lg:flex-row pt-10 lg:pt-0">

      <Image className="rounded-md shadow-md scale-[90%] lg:scale-[100%]" src={"/example.png"} quality={100} alt="Pet details showcase" width={600} height={600}></Image>
      <section className="max-w-[600px] flex flex-col text-center items-center lg:text-left lg:items-start gap-9 ">
        <Image src={"\animal.svg"} width={45} height={45} alt="Petsoft logo of a paw in a circle"></Image>
        <h1 className="text-5xl max-w-[500px]">Manage your <strong>pet daycare</strong> with ease</h1>
        <p>Use PetSoft to easily keep track of pets under your care.
        </p>

        <div className="space-x-4">
          <Button size={"lg"} asChild>
            <Link href={"/login"}>Get Started</Link>
          </Button>
          <Button variant={"secondary"} size={"lg"} asChild>
          <Link href={"/login"}>Log In</Link>     
          </Button>
        </div>
      </section>
    </main>
  );
}
