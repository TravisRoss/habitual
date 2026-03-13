import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  deleteCompletion,
  deleteHabit,
  getCompletionsByUserIdAndDate,
  getCompletionsByUserIdForDateRange,
  getGoalsByUserId,
  getHabitsByUserId,
  getHabitsByUserIdAndDate,
  insertCompletion,
  insertGoal,
  insertHabit,
} from "./data-service";

function adminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

// Unique IDs for this test run — avoids collisions with real data
const USER_ID = crypto.randomUUID();
const USER_EMAIL = `integration-test-${USER_ID}@test.invalid`;
let HABIT_ID: string;

beforeAll(async () => {
  const db = adminClient();

  // Insert a minimal test profile (password_hash is nullable for OAuth users)
  const { error: profileError } = await db
    .from("profiles")
    .insert({ id: USER_ID, email: USER_EMAIL, full_name: "Integration Test" });
  if (profileError)
    throw new Error(`Test setup failed (profile): ${profileError.message}`);

  // Insert a test habit via the data-service so it goes through the same code path
  const { id, error: habitError } = await insertHabit({
    user_id: USER_ID,
    name: "Integration Test Habit",
    frequency: "daily",
    target_days: [0, 1, 2, 3, 4, 5, 6],
  });
  if (habitError) throw new Error(`Test setup failed (habit): ${habitError}`);
  HABIT_ID = id!;
});

afterAll(async () => {
  // Delete in foreign key order: completions → habits → profiles
  const db = adminClient();
  await db.from("completions").delete().eq("user_id", USER_ID);
  await db.from("habits").delete().eq("id", HABIT_ID);
  await db.from("profiles").delete().eq("id", USER_ID);
});

afterEach(async () => {
  // Wipe completions between tests to prevent state leakage
  await adminClient().from("completions").delete().eq("user_id", USER_ID);
});

describe("getCompletionsByUserIdForDateRange", () => {
  it("returns all completions within the date range", async () => {
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-10");
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-11");
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-12");

    const result = await getCompletionsByUserIdForDateRange(
      USER_ID,
      "2024-03-10",
      "2024-03-12",
    );

    expect(result).toHaveLength(3);
    expect(result!.map((c) => c.completed_on)).toEqual(
      expect.arrayContaining(["2024-03-10", "2024-03-11", "2024-03-12"]),
    );
  });

  it("excludes completions outside the date range", async () => {
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-09"); // before range
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-11"); // in range
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-13"); // after range

    const result = await getCompletionsByUserIdForDateRange(
      USER_ID,
      "2024-03-10",
      "2024-03-12",
    );

    expect(result).toHaveLength(1);
    expect(result![0].completed_on).toBe("2024-03-11");
  });

  it("includes completions on the boundary dates (inclusive)", async () => {
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-10");
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-12");

    const result = await getCompletionsByUserIdForDateRange(
      USER_ID,
      "2024-03-10",
      "2024-03-12",
    );

    expect(result).toHaveLength(2);
  });

  it("returns empty array when no completions exist in range", async () => {
    const result = await getCompletionsByUserIdForDateRange(
      USER_ID,
      "2024-03-10",
      "2024-03-12",
    );

    expect(result).toEqual([]);
  });
});

describe("insertCompletion / deleteCompletion", () => {
  it("inserts a completion that can be retrieved", async () => {
    const { error } = await insertCompletion(HABIT_ID, USER_ID, "2024-03-10");
    expect(error).toBeNull();

    const result = await getCompletionsByUserIdAndDate(USER_ID, "2024-03-10");
    expect(result).toHaveLength(1);
    expect(result![0]).toMatchObject({
      habit_id: HABIT_ID,
      user_id: USER_ID,
      completed_on: "2024-03-10",
    });
  });

  it("deletes a completion", async () => {
    await insertCompletion(HABIT_ID, USER_ID, "2024-03-10");

    const { error } = await deleteCompletion(HABIT_ID, USER_ID, "2024-03-10");
    expect(error).toBeNull();

    const result = await getCompletionsByUserIdAndDate(USER_ID, "2024-03-10");
    expect(result).toEqual([]);
  });
});

describe("insertHabit / getHabitsByUserId", () => {
  it("returns habits for the user", async () => {
    const result = await getHabitsByUserId(USER_ID);

    expect(result).toHaveLength(1);
    expect(result![0]).toMatchObject({
      id: HABIT_ID,
      user_id: USER_ID,
      name: "Integration Test Habit",
      frequency: "daily",
    });
  });
});

describe("deleteHabit", () => {
  // Track IDs so afterEach can clean up any habits that weren't deleted by the test itself
  let testHabitIds: string[] = [];

  afterEach(async () => {
    if (testHabitIds.length > 0) {
      const db = adminClient();
      await db.from("goals").delete().in("habit_id", testHabitIds);
      await db.from("completions").delete().in("habit_id", testHabitIds);
      await db.from("habits").delete().in("id", testHabitIds);
      testHabitIds = [];
    }
  });

  async function createTestHabit(name = "Habit to Delete") {
    const { id, error } = await insertHabit({
      user_id: USER_ID,
      name,
      frequency: "daily",
      target_days: [0, 1, 2, 3, 4, 5, 6],
    });
    if (!id || error) throw new Error(error ?? "Setup failed");
    testHabitIds.push(id);
    return id;
  }

  it("removes the habit — the habit is gone immediately after the call", async () => {
    const id = await createTestHabit();

    const { error } = await deleteHabit(id);
    expect(error).toBeNull();

    const habits = await getHabitsByUserId(USER_ID);
    expect(habits?.find((h) => h.id === id)).toBeUndefined();
  });

  it("cascades to delete associated goals — the goal is gone in the same operation", async () => {
    const id = await createTestHabit();
    await insertGoal({
      user_id: USER_ID,
      habit_id: id,
      name: "Run for 30 days",
      target: 30,
      period: "30",
      start_date: "2024-03-01",
    });

    await deleteHabit(id);

    const goals = await getGoalsByUserId(USER_ID);
    expect(goals?.find((g) => g.habit_id === id)).toBeUndefined();
  });

  it("cascades to delete associated completions", async () => {
    const id = await createTestHabit();
    await insertCompletion(id, USER_ID, "2024-03-10");
    await insertCompletion(id, USER_ID, "2024-03-11");

    await deleteHabit(id);

    const completions = await getCompletionsByUserIdAndDate(USER_ID, "2024-03-10");
    expect(completions?.filter((c) => c.habit_id === id)).toHaveLength(0);
  });

  it("deletes a habit that has both goals and completions in one call", async () => {
    const id = await createTestHabit();
    await insertCompletion(id, USER_ID, "2024-03-10");
    await insertGoal({
      user_id: USER_ID,
      habit_id: id,
      name: "Run for 90 days",
      target: 90,
      period: "90",
      start_date: "2024-03-01",
    });

    const { error } = await deleteHabit(id);
    expect(error).toBeNull();

    const [habits, goals, completions] = await Promise.all([
      getHabitsByUserId(USER_ID),
      getGoalsByUserId(USER_ID),
      getCompletionsByUserIdAndDate(USER_ID, "2024-03-10"),
    ]);
    expect(habits?.find((h) => h.id === id)).toBeUndefined();
    expect(goals?.find((g) => g.habit_id === id)).toBeUndefined();
    expect(completions?.filter((c) => c.habit_id === id)).toHaveLength(0);
  });
});

describe("getHabitsByUserIdAndDate", () => {
  it("returns a habit created today when queried for today", async () => {
    const today = new Date().toISOString().slice(0, 10);
    const result = await getHabitsByUserIdAndDate(USER_ID, today);

    expect(result).toHaveLength(1);
    expect(result![0].id).toEqual(HABIT_ID);
  });

  it("does not return a habit when queried for a date before it was created", async () => {
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .slice(0, 10);
    const result = await getHabitsByUserIdAndDate(USER_ID, yesterday);

    expect(result).toHaveLength(0);
  });
});
