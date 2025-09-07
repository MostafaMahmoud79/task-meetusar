import { getCurrentUser } from "@/lib/server/queries/get-current-user";
import BrandBox from "./_components/brand-box";
import FormBox from "./_components/form-box";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  console.log({ sessionFromLog: user });
  if (user) {
    redirect("/dashboard");
  }
  return (
    <main className="relative min-h-screen bg-[#E9ECF2] flex! justify-center lg:pl-10 px-2 gap-3.5 overflow-hidden">
      <FormBox />
      <BrandBox />
      <div className="absolute top-[-247px] left-[638px] size-[667px] bg-[#E477F6] blur-[400px]  rounded-full z-0" />
      <div className="absolute top-[667px] max-lg:left-[1083px] lg:-right-[300px]  size-[667px] bg-[#9E77F6] blur-[400px]  rounded-full z-0" />
      <div className="absolute bottom-[-646px] left-[-117px] size-[813px] bg-[#B0D2E5] blur-[800px] rounded-full opacity-60 z-0" />
      <div className="absolute top-[-272px] left-[38pxpx] size-[807px] bg-[#9E77F6] blur-[800px] rounded-full opacity-60 z-0" />
    </main>
  );
}
