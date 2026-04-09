import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "متجرك — تصميم وإطلاق متاجر إلكترونية احترافية";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse 80% 55% at 50% 100%, #006039 -20%, #050f09 60%)",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* توهج سفلي */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 40% at 50% 105%, rgba(0,96,57,0.45) 0%, transparent 70%)",
          }}
        />

        {/* شبكة نقاط */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(0,166,81,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* لوقو */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#00a651",
            display: "flex",
          }}
        >
          متجرك ✦
        </div>

        {/* المحتوى الرئيسي */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 1,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* العنوان */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.2,
              display: "flex",
            }}
          >
            متجرك الإلكتروني الناجح يبدأ معنا
          </div>

          {/* الفاصل */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#00a651",
              borderRadius: "2px",
              display: "flex",
              boxShadow: "0 0 12px rgba(0,166,81,0.8)",
            }}
          />

          {/* الـ subtitle */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.80)",
              display: "flex",
            }}
          >
            نبني لك متجر احترافي جاهز ويبيع خلال 7 أيام
          </div>
        </div>

        {/* شارة سلة */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 20px",
            borderRadius: "999px",
            background: "rgba(0,166,81,0.12)",
            border: "1px solid rgba(0,166,81,0.35)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00a651",
              display: "flex",
              boxShadow: "0 0 8px rgba(0,166,81,0.9)",
            }}
          />
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.80)", display: "flex" }}>
            matjarak.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
