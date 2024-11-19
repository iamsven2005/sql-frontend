import { db } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();
  console.log(query);
  
  const thething = await db.start.findFirst({
    where: {
      name: query,
    },
  });
  
  console.log(thething);
  return NextResponse.json(thething, { status: 200 });
}
