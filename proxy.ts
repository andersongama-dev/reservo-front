import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type MeResponse = {
  user: null | {
    id: number;
    name: string | null;
    email: string;
    role: "barber" | "customer";
    onboarding_completed: boolean;
  };
};

async function getUser(req: NextRequest): Promise<MeResponse | null> {
  try {
    const res = await fetch(`http://localhost:3333/me?ts=${Date.now()}`, {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    if (res.status === 401) return { user: null };
    return await res.json();
  } catch {
    return null;
  }
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp|css|js|map|ico|woff2)$/)
  ) {
    return NextResponse.next();
  }

  const data = await getUser(req);
  const user = data?.user ?? null;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isOnboardingPage = pathname.startsWith("/onboarding");

  const isApp =
    pathname.startsWith("/agenda") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/paneltoday") ||
    pathname.startsWith("/team") ||
    pathname.startsWith("/barber");

  if (!user) {
    if (isApp || isOnboardingPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    if (user.role === "customer" && isApp) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAuthPage) {
      return NextResponse.redirect(new URL("/agenda", req.url));
    }

    if (!user.onboarding_completed && !isOnboardingPage) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (user.onboarding_completed && isOnboardingPage) {
      return NextResponse.redirect(new URL("/agenda", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/:path*"],
};
