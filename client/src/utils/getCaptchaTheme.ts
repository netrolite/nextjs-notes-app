import { TCaptchaTheme } from "./types";

/**
 *
 * @param resolvedTheme comes from useTheme() from next-themes
 * @returns either light or dark because useTheme() is too weak to do that!!!
 */
export default function getCaptchaTheme(
  resolvedTheme: string | undefined,
): TCaptchaTheme {
  const defaultTheme = "light";

  if (resolvedTheme !== "light" && resolvedTheme !== "dark") {
    return defaultTheme;
  }

  return resolvedTheme;
}
