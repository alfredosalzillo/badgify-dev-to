import { fetchUserByUsername } from "@/plugins/dev-to/users";
import { UserBadge } from "@/plugins/svg/UserBadge";
import { type NextRequest, NextResponse } from "next/server";

const toDataURL = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const contentType = response.headers.get("content-type") || "image/png";
  return `data:${contentType};base64,${base64}`;
};

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
    const image = await toDataURL(user.profile_image);
    const { renderToStaticMarkup } = await import("react-dom/server");
    const svg = renderToStaticMarkup(
      <UserBadge
        theme={theme}
        user={user}
        profileImage={image}
      />,
    );

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
