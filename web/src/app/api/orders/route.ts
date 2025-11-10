import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const order = await createOrder(payload);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 400 }
    );
  }
}
