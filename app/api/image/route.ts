import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  if (!cookie.has("session_token")) {
    console.log("User does not have session token!", cookie);
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("User has session token!", cookie);

  const filename = "nextjs.png";

  // Adjust the directory as needed
  const imagePath = path.join(process.cwd(), "public", filename);

  try {
    const imageBuffer = await fs.readFile(imagePath);
    // Infer content type from extension (basic)
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";

    const uint8Array = new Uint8Array(imageBuffer);
    const blob = new Blob([uint8Array], { type: contentType });
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Image not found", { status: 404 });
  }
}
