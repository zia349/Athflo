import { getStoredActiveAthleteId } from "@/lib/mockAuth";

export type AthleteStatus = "Good" | "Watch" | "Concern";

export type AthleteRecord = {
  id: string;
  name: string;
  mood: number;
  energy: number;
  stress: number;
  readiness: "High" | "Moderate" | "Low";
  status: AthleteStatus;
  checkedInToday: boolean;
};

export type AthleteHistoryEntry = {
  day: string;
  mood: number;
  energy: number;
  stress: number;
  readiness: string;
};

export type DemoTeamData = {
  athletes: AthleteRecord[];
  historyByAthleteId: Record<string, AthleteHistoryEntry[]>;
};

const DEMO_TEAM_DATA_KEY = "athflo:demo-team-data";

const FIRST_NAMES = [
  "Jordan",
  "Tara",
  "Maya",
  "Avery",
  "Riley",
  "Syd",
  "Parker",
  "Taylor",
  "Quinn",
  "Morgan",
  "Casey",
  "Sage",
];

const LAST_NAMES = [
  "Mitchell",
  "Nguyen",
  "Thompson",
  "Rivera",
  "Brooks",
  "Patterson",
  "Coleman",
  "Diaz",
  "Hughes",
  "Bennett",
  "Ramirez",
  "Foster",
];

const DEFAULT_TEAM_DATA: DemoTeamData = {
  athletes: [
    { id: "a-101", name: "Jordan Mitchell", mood: 8, energy: 7, stress: 3, readiness: "High", status: "Good", checkedInToday: true },
    { id: "a-204", name: "Tara Nguyen", mood: 6, energy: 5, stress: 4, readiness: "Moderate", status: "Watch", checkedInToday: true },
    { id: "a-317", name: "Maya Thompson", mood: 4, energy: 4, stress: 6, readiness: "Low", status: "Concern", checkedInToday: false },
  ],
  historyByAthleteId: {
    "a-101": [
      { day: "Fri", mood: 8, energy: 7, stress: 3, readiness: "High" },
      { day: "Thu", mood: 7, energy: 6, stress: 4, readiness: "Moderate" },
      { day: "Wed", mood: 5, energy: 5, stress: 6, readiness: "Watch" },
      { day: "Tue", mood: 6, energy: 5, stress: 5, readiness: "Moderate" },
    ],
    "a-204": [
      { day: "Fri", mood: 6, energy: 5, stress: 5, readiness: "Moderate" },
      { day: "Thu", mood: 6, energy: 6, stress: 4, readiness: "Moderate" },
      { day: "Wed", mood: 5, energy: 5, stress: 6, readiness: "Watch" },
      { day: "Tue", mood: 7, energy: 6, stress: 4, readiness: "Moderate" },
    ],
    "a-317": [
      { day: "Fri", mood: 4, energy: 4, stress: 7, readiness: "Low" },
      { day: "Thu", mood: 5, energy: 5, stress: 6, readiness: "Watch" },
      { day: "Wed", mood: 5, energy: 5, stress: 6, readiness: "Watch" },
      { day: "Tue", mood: 6, energy: 5, stress: 5, readiness: "Moderate" },
    ],
  },
};

function cloneDefaultTeamData(): DemoTeamData {
  return {
    athletes: DEFAULT_TEAM_DATA.athletes.map((athlete) => ({ ...athlete })),
    historyByAthleteId: Object.fromEntries(
      Object.entries(DEFAULT_TEAM_DATA.historyByAthleteId).map(([id, entries]) => [
        id,
        entries.map((entry) => ({ ...entry })),
      ]),
    ),
  };
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generateRandomName(existingNames: Set<string>): string {
  for (let i = 0; i < 20; i += 1) {
    const candidate = `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`;
    if (!existingNames.has(candidate)) {
      return candidate;
    }
  }

  return `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`;
}

function getReadinessLabel(mood: number): "High" | "Moderate" | "Low" {
  if (mood >= 8) return "High";
  if (mood >= 6) return "Moderate";
  return "Low";
}

function getStatusLabel(mood: number, stress: number): AthleteStatus {
  if (mood <= 5 || stress >= 7) return "Concern";
  if (mood <= 7 || stress >= 5) return "Watch";
  return "Good";
}

function normalizeDemoData(data: Partial<DemoTeamData>): DemoTeamData {
  const defaults = cloneDefaultTeamData();

  const normalizedAthletes =
    Array.isArray(data.athletes) && data.athletes.length > 0
      ? data.athletes.map((athlete) => ({
          ...athlete,
          checkedInToday: typeof athlete.checkedInToday === "boolean" ? athlete.checkedInToday : false,
        }))
      : defaults.athletes;

  return {
    athletes: normalizedAthletes,
    historyByAthleteId: data.historyByAthleteId ?? defaults.historyByAthleteId,
  };
}

export function getStoredDemoTeamData(): DemoTeamData {
  if (typeof window === "undefined") {
    return cloneDefaultTeamData();
  }

  const raw = window.localStorage.getItem(DEMO_TEAM_DATA_KEY);
  if (!raw) {
    return cloneDefaultTeamData();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DemoTeamData>;
    return normalizeDemoData(parsed);
  } catch {
    window.localStorage.removeItem(DEMO_TEAM_DATA_KEY);
    return cloneDefaultTeamData();
  }
}

export function setStoredDemoTeamData(data: DemoTeamData): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DEMO_TEAM_DATA_KEY, JSON.stringify(data));
}

export function ensureDemoTeamData(): DemoTeamData {
  const current = getStoredDemoTeamData();
  setStoredDemoTeamData(current);
  return current;
}

export function randomizeActiveAthleteNameForSession(): DemoTeamData {
  if (typeof window === "undefined") {
    return cloneDefaultTeamData();
  }

  const team = ensureDemoTeamData();
  const activeAthleteId = getStoredActiveAthleteId() ?? "a-101";
  const existingNames = new Set(team.athletes.map((athlete) => athlete.name));

  const next = {
    ...team,
    athletes: team.athletes.map((athlete) => {
      if (athlete.id !== activeAthleteId) {
        return athlete;
      }

      const nextName = generateRandomName(existingNames);
      return {
        ...athlete,
        name: nextName,
      };
    }),
  };

  setStoredDemoTeamData(next);
  return next;
}

export function setActiveAthleteName(name: string): DemoTeamData {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return ensureDemoTeamData();
  }

  const team = ensureDemoTeamData();
  const activeAthleteId = getStoredActiveAthleteId() ?? "a-101";

  const next: DemoTeamData = {
    ...team,
    athletes: team.athletes.map((athlete) =>
      athlete.id === activeAthleteId
        ? {
            ...athlete,
            name: trimmedName,
          }
        : athlete,
    ),
  };

  setStoredDemoTeamData(next);
  return next;
}

export function saveAthleteCheckInToDemoData({
  athleteId,
  mood,
}: {
  athleteId: string;
  mood: number;
}): DemoTeamData {
  const team = ensureDemoTeamData();
  const normalizedMood = Math.max(1, Math.min(10, mood));
  const derivedEnergy = Math.max(1, Math.min(10, normalizedMood + (normalizedMood >= 7 ? 0 : -1)));
  const derivedStress = Math.max(1, Math.min(10, 11 - normalizedMood));

  const readiness = getReadinessLabel(normalizedMood);
  const status = getStatusLabel(normalizedMood, derivedStress);

  const updatedAthletes = team.athletes.map((athlete) => {
    if (athlete.id !== athleteId) {
      return athlete;
    }

    return {
      ...athlete,
      mood: normalizedMood,
      energy: derivedEnergy,
      stress: derivedStress,
      readiness,
      status,
      checkedInToday: true,
    };
  });

  const currentHistory = team.historyByAthleteId[athleteId] ?? [];
  const nextEntry: AthleteHistoryEntry = {
    day: "Today",
    mood: normalizedMood,
    energy: derivedEnergy,
    stress: derivedStress,
    readiness,
  };

  const updatedHistory = [nextEntry, ...currentHistory].slice(0, 6);

  const nextData: DemoTeamData = {
    athletes: updatedAthletes,
    historyByAthleteId: {
      ...team.historyByAthleteId,
      [athleteId]: updatedHistory,
    },
  };

  setStoredDemoTeamData(nextData);
  return nextData;
}
