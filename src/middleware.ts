import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
  if(await isAuthorized(req) === false) {
    return new NextResponse("Unauthorized", { status: 401, headers: {"WWW-Authenticate": "Basic"} });
  }
}

async function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");

  if(!authHeader) {
    return false;
  }

  const [username, password] = atob(authHeader.split(" ")[1]).split(":");
  
  return username === process.env.ADMIN_USERNAME && isValidPassword(password, process.env.ADMIN_PASSWORD as string);
}

export const config = {
  matcher: "/admin/:path*",
}