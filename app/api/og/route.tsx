import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "Germán Sandoval";
  const description = searchParams.get("description") ?? "Full-Stack Software Engineer";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0d0d1a 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "20%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Site name badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(99,102,241,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
              }}
            >
              G
            </div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              gasandov.dev
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: "22px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.5,
                maxWidth: "820px",
              }}
            >
              {description.length > 100 ? description.slice(0, 100) + "…" : description}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
