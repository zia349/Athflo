export type AppRole = "athlete" | "coach";

export function isAppRole(value: string | null | undefined): value is AppRole {
  return value === "athlete" || value === "coach";
}

export function resolveRoleFromPathname(pathname: string): AppRole {
  if (pathname.startsWith("/coach")) {
    return "coach";
  }

  return "athlete";
}
