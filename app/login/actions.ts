"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AUTH_COOKIE = "xr-auth";

const CREDENTIALS: Record<string, string> = {
  xenreality: "xr-xenreality-2025",
  harshitha:  "xr-harshitha-2025",
};

const PASSWORDS: Record<string, string> = {
  xenreality: "xen@2026",
  harshitha:  "xen@2025",
};

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error: string }> {
  const username = (formData.get("username") as string | null)?.trim().toLowerCase() ?? "";
  const password = (formData.get("password") as string | null) ?? "";
  const from     = (formData.get("from") as string | null) ?? "/";

  const expectedPassword = PASSWORDS[username];
  const token            = CREDENTIALS[username];

  if (!expectedPassword || password !== expectedPassword) {
    return { error: "Invalid username or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   60 * 60 * 24 * 7, // 7 days
  });

  redirect(from.startsWith("/") ? from : "/");
}
