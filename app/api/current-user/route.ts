import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserInfo } from "@/lib/types/user";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    console.dir({ token }, { depth: null });
    if (!token) {
      return NextResponse.json(null, { status: 401 });
    }

    const response = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      cookieStore.delete("jwt");
      return NextResponse.json(null, { status: 401 });
    }

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    const responseData: UserInfo = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
