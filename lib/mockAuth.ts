"use client";

import { AppRole, isAppRole } from "@/lib/roles";

const MOCK_ROLE_STORAGE_KEY = "athflo:mock-role";
const ACTIVE_ATHLETE_ID_STORAGE_KEY = "athflo:active-athlete-id";

export function getStoredMockRole(): AppRole | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedRole = window.localStorage.getItem(MOCK_ROLE_STORAGE_KEY);
  return isAppRole(storedRole) ? storedRole : null;
}

export function setStoredMockRole(role: AppRole): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, role);
}

export function clearStoredMockRole(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(MOCK_ROLE_STORAGE_KEY);
}

export function getStoredActiveAthleteId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACTIVE_ATHLETE_ID_STORAGE_KEY);
}

export function setStoredActiveAthleteId(athleteId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACTIVE_ATHLETE_ID_STORAGE_KEY, athleteId);
}
