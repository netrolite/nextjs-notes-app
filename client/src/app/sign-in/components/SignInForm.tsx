"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
  });

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const response = await axios.post(
      "http://localhost:3001/auth/sign-in",
      formData
    );
    const { data } = response;

    checkResponseData(data);
    storeResponseData(data);
    router.push("/notes");
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-md flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="px-3 py-2 rounded blue-outline"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="px-3 py-2 rounded blue-outline"
            type={"password"}
          />
        </div>
        <div>
          <button className="py-2 w-full bg-blue hover:bg-blue-700 duration-200 text-white rounded">
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
    </>
  );
}

function checkResponseData(data: any) {
  if (!data.accessToken || !data.refreshToken || !data.username) {
    throw new Error("something is not present in the response");
  }
}

function storeResponseData(data: any) {
  const daysIn15Mins = 0.010416;
  const ninetyDays = 90;
  const refreshToken = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", data.accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshToken, { expires: ninetyDays });
  localStorage.setItem("username", data.username);
}