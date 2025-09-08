"use server";

import {
  LoginFormInputs,
  loginFormSchema,
} from "@/lib/validation/login-schema";
import { cookies } from "next/headers";
type SuccessRes = {
  status: "success";
  message: string;
};
type FailedRes = {
  status: "validationError" | "error";
  error: {
    status: number;
    message: string;
  };
};

type ActionResponse = Promise<SuccessRes | FailedRes>;

function getTokenExpiry(token: string): number | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decoded = JSON.parse(atob(payloadBase64));
    return decoded.exp ? decoded.exp * 1000 : null; // convert to ms
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function loginAction(inputs: LoginFormInputs): ActionResponse {
  const result = loginFormSchema.safeParse(inputs);
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        message: "Please provide valid email and password.",
        status: 400,
      },
    };
  }
  const data = result.data;

  try {
    const response = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          isEmployee: true,
        }),
      }
    );
    if (!response.ok) {
      return {
        status: "error",
        error: {
          message: response.statusText,
          status: response.status,
        },
      };
    }
    const responseData = await response.json();
    const token = responseData.token;
    const expiryMs = getTokenExpiry(token) || Date.now() + 60 * 60 * 1000;

    (await cookies()).set({
      name: "jwt",
      value: token,
      expires: new Date(expiryMs),
      httpOnly: true,
      secure: true,
    });
    console.dir({ responseData }, { depth: null });
    return {
      status: "success",
      message: "Successfully Logged In.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: {
        message: "Internal Server Error!",
        status: 500,
      },
    };
  }
}
