import { useState } from "react";
import { Warp } from "@paper-design/shaders-react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  return (
    <section style={{ position: "relative", minHeight: "70vh", overflow: "hidden" }}>
      {/* Background shader */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(340, 100%, 20%)", "hsl(320, 100%, 75%)", "hsl(350, 90%, 30%)", "hsl(330, 100%, 80%)"]}
        />
      </div>

      <div style={{
        position: "relative",
        zIndex: 10,
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 32px",
      }}>
        <div style={{
          maxWidth: "672px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}>
          <h1 style={{
            color: "#fff",
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            fontStyle: "italic",
            margin: 0,
            lineHeight: 1.1,
          }}>
            Stay in Bloom
          </h1>

          {/* Email input */}
          <div style={{ position: "relative" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 80px 16px 24px",
                fontSize: "1rem",
                fontFamily: "'Poppins', sans-serif",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "9999px",
                color: "#fff",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.7)";
                e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.35)";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              onClick={() => { if (email) { alert("Subscribed! 🌸"); setEmail(""); } }}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                background: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.25s, box-shadow 0.25s",
                boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <svg
                style={{ width: "20px", height: "20px", color: "#1f2937" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.05rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            lineHeight: 1.75,
            margin: 0,
          }}>
            Don't miss out on the latest news and special content!
            <br />
            Sign up for our newsletter and stay in the loop with every update.
          </p>
        </div>
      </div>
    </section>
  );
}
