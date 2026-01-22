//Frist step in implementing JWT based authentication

import jwt from "jsonwebtoken"; // not good in NEXTJS
import { SignJWT, jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET!
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET!
);

/**
 * Short-lived token used for authorization
 */
// export async function signAccessToken(payload: {
//   userId: string;
//   role: string;
// }) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("15m")
//     .sign(ACCESS_SECRET);
// }

export async function signAccessToken(payload: {
  userId: string;
  role: string;
  permissions?: string[];
}) {
  return new SignJWT({
    role: payload.role,
    permissions: payload.permissions ?? [],
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId) // 👈 standard
    .setIssuedAt()
    .setExpirationTime("15m")
    .setIssuer("coffee-inventory")
    .setAudience("web")
    .sign(ACCESS_SECRET);
}

/**
 * Long-lived token used only to refresh access token
 */
// export async function signRefreshToken(payload: { userId: string }) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(REFRESH_SECRET);
// }

export async function signRefreshToken(payload: { userId: string }) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .setIssuer("coffee-inventory")
    .setAudience("web")
    .sign(REFRESH_SECRET);
}

/**
 * Verify access token
 */
// export async function verifyAccessToken(token: string) {
//   const { payload } = await jwtVerify(token, ACCESS_SECRET);
//   return payload as {
//     userId: string;
//     role: string;
//     iat: number;
//     exp: number;
//   };
// }
export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, ACCESS_SECRET, {
    issuer: "coffee-inventory",
    audience: "web",
  });

  return {
    userId: payload.sub!,
    role: payload.role as string,
    permissions: (payload.permissions as string[]) ?? [],
    iat: payload.iat!,
    exp: payload.exp!,
  };
}
/**
 * Verify refresh token
 */
// export async function verifyRefreshToken(token: string) {
//   const { payload } = await jwtVerify(token, REFRESH_SECRET);
//   return payload as {
//     userId: string;
//     iat: number;
//     exp: number;
//   };
// }
export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, REFRESH_SECRET, {
    issuer: "coffee-inventory",
    audience: "web",
  });

  return {
    userId: payload.sub!,
    iat: payload.iat!,
    exp: payload.exp!,
  };
}
