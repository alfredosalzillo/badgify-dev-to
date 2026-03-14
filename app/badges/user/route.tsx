import { fetchUserByUsername } from "@/plugins/dev-to/users";
import { UserBadge } from "@/plugins/svg/UserBadge";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";

  if (!username) {
    return new NextResponse("Username is required", { status: 404 });
  }

  const user = await fetchUserByUsername(username);
  if (!user?.username) {
    return new NextResponse("User not found", { status: 404 });
  }

  try {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const svg = renderToStaticMarkup(<UserBadge theme={theme} user={user} />);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
