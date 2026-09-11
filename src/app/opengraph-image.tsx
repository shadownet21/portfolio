import { SITE } from "@/data/site";
import { ImageResponse } from "next/og";

export const alt =
  "Marc Maurice Freeman — Support TI, IT Support et développement web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        color: "white",
        background: "linear-gradient(135deg, #071a36, #075df5)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        Support TI · IT Support · Web
      </div>
      <div style={{ fontSize: 78, fontWeight: 800, marginTop: 24 }}>
        Marc Maurice Freeman
      </div>
      <div style={{ fontSize: 34, marginTop: 28 }}>
        {SITE.signature.fr}
      </div>
    </div>,
    size,
  );
}
