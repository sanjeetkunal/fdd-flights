import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API = "https://api-supplier.virtualtoactual.cloud";

export async function GET(request: NextRequest) {
  const token = request.headers.get("x-access-token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token missing" },
      { status: 401 }
    );
  }

  const res = await fetch(`${EXTERNAL_API}/api/users/verify-token`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-access-token": token,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: data.message ?? "Token invalid" },
      { status: res.status }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
