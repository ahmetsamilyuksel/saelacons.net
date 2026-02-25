import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "submissions.json");

async function getSubmissions() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_KEY && key !== "saelacons2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getSubmissions();
  return NextResponse.json(submissions);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_KEY && key !== "saelacons2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const submissions = JSON.parse(raw);
    const sub = submissions.find((s: { id: string }) => s.id === id);
    if (sub) {
      sub.read = true;
      await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
