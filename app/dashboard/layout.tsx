import { getCurrentUser } from "@/lib/server/queries/get-current-user";

import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import LogoutBtn from "./_components/logout-btn";

export default async function DashboardLayout(
  props: LayoutProps<"/dashboard">
) {
  const user = await getCurrentUser();
  console.log({ fromdashlay: user });
  if (!user) {
    redirect("/", RedirectType.replace);
  }
  return (
    <div className="h-screen bg-gray-500">
      <div className="flex h-full">
        <div className="flex gap-2 flex-col bg-amber-200 p-3">
          <div className="flex-1 flex flex-col gap-3  w-[300px] ">
            {Array.from({ length: 6 }).map((v, i) => (
              <Link
                href={"/"}
                key={i}
                className="bg-amber-800 rounded-sm p-2 text-white capitalize"
              >
                page {i + 1}
              </Link>
            ))}
          </div>
          <div>
            <div className="mb-2 capitalize">
              user name: <span>{user.name}</span>
            </div>
            <LogoutBtn />
          </div>
        </div>
        <div className="flex-1 bg-primary text-white p-4">{props.children}</div>
      </div>
    </div>
  );
}
