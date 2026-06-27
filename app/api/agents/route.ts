import { NextRequest, NextResponse } from "next/server";

const AGENT_API = "http://localhost:8080";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${AGENT_API}/api/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: data.message ?? "Registration failed" },
      { status: res.status }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
