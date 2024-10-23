import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();

  // Delete any existing refreshToken to avoid using the old one from the first Wix account
  if (cookies.get("refreshToken")) {
    res.cookies.delete("refreshToken");
  }

  // Create a new Wix client with the correct clientId
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });

  // Generate a new set of visitor tokens, including refreshToken
  const tokens = await wixClient.auth.generateVisitorTokens();

  // Set the new refreshToken in the cookies with a 30-day expiration
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
};
