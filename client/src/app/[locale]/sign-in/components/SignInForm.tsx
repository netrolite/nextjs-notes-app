"use client";

import axios from "@/config/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BigBtn from "@/app/components/buttons/Big";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import { useTranslations } from "next-intl";
import useFetch from "@/app/hooks/useFetch";
import getCaptchaToken from "@/utils/getCaptchaToken";
import Err from "@/app/components/Err";
import isObject from "@/utils/isObject";
import Loading from "@/app/components/Loading";
import storeAuthRespData from "@/utils/storeAuthRespData";

export default function SignInForm() {
  const t = useTranslations("SignIn");
  const errsT = useTranslations("Errors");
  const formT = useTranslations("Form");

  const { resolvedTheme } = useTheme();
  const captchaTheme = getCaptchaTheme(resolvedTheme);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const errsInitState = {
    invalidCredentials: false,
    unknownErr: false,
  };
  const [errs, setErrs] = useState<typeof errsInitState>(errsInitState);
  const {
    data: signInRespData,
    err: signInRespErr,
    fetch: signInFetch,
    loading: signInLoading,
    setLoading: signInSetLoading,
  } = useFetch("/auth/sign-in", {
    method: "post",
    body: formData,
  });

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasSubmitted(true);

    const captchaToken = await getCaptchaToken(captchaRef);
    signInFetch({ ...formData, captchaToken });
  }

  useEffect(() => {
    if (!hasSubmitted) return;
    checkResponseData(signInRespData);
    storeAuthRespData(signInRespData);
    router.push("/notes");
  }, [signInRespData]);

  useEffect(() => {
    if (!signInRespErr) return;
    if (!signInRespErr?.response) return unknownErr();
    switch (signInRespErr.response.status) {
      case 401:
        setErrs((prev) => ({ ...prev, invalidCredentials: true }));
        break;
      default:
        unknownErr();
    }
  }, [signInRespErr]);

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  function unknownErr() {
    setErrs((prev) => ({ ...prev, unknownErr: true }));
  }

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        size="invisible"
        ref={captchaRef}
        theme={captchaTheme}
      />

      <form onSubmit={onSubmit} className="max-w-md flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="px-3 py-2 rounded blue-outline"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="px-3 py-2 rounded blue-outline"
            type={"password"}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p>
            {t("dontHaveAccount")}{" "}
            <Link className="text-l-accent dark:text-d-accent" href="/sign-up">
              {t("dontHaveAccountSignUpLink")}
            </Link>
          </p>

          <div>
            <BigBtn className={`w-full ${signInLoading ? "cursor-wait" : ""}`}>
              {signInLoading ? (
                <div className="w-full flex items-center justify-center">
                  <div className="relative w-[1.5rem] h-[1.5rem]">
                    <Loading
                      childStyle={{
                        borderColor: "white",
                        borderTopColor: "transparent",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>{t("signInBtn")}</div>
              )}
            </BigBtn>
          </div>

          <div>
            {errs.invalidCredentials && <Err msg={t("invalidCredentials")} />}
            {errs.unknownErr && <Err msg={errsT("generic")} />}
          </div>
        </div>
      </form>
    </>
  );
}

function checkResponseData(data: any) {
  if (
    !isObject(data) ||
    !data.accessToken ||
    !data.refreshToken ||
    !data.username
  ) {
    return false;
  }
  return true;
}
