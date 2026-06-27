import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API = "https://api-supplier.virtualtoactual.cloud";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${EXTERNAL_API}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      username: body.username,
      password: body.password,
      role_code: body.role_code ?? 1001,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: data.message ?? "Login failed" },
      { status: res.status }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
