import ContentBlock from "@/components/ContentBlock";
import SignOutButton from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";


export default async function Home() {
  
  const session = await checkAuth();


  return (
    <main className="flex flex-col">
       <h1 className="font-bold text-4xl text-[#E5E8EC] mt-8">Your Account</h1>
      <div className="h-[624px] mt-16 flex">
      <ContentBlock className="flex justify-center items-center text-xl flex-col gap-3">
        Logged in as {session.user?.email}
        <SignOutButton/>
        </ContentBlock>


      </div>

    </main>
  );
}
