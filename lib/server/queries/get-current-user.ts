import "server-only";
import { UserInfo } from "@/lib/types/user";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/current-user`,
      {
        headers: {
          Cookie: `jwt=${(await cookies()).get("jwt")?.value}`, // i make this because we cant send cookies from server to server so i send it.
        },
      }
    );
    console.log({ response });
    if (!response.ok) {
      throw new Error("failed to get current user");
    }
    const responseData: UserInfo = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
