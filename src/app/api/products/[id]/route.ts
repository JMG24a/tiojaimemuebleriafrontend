import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const body = await req.json();
  const { id } = context.params;

  const res = await fetch(
    `https://tjm-web-back.onrender.com/products/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
