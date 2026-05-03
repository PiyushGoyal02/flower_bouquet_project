import { motion } from "framer-motion";
import DotPattern from "./dot-pattern";

const CORNER_SIZE = 12;

function Corner({ top, bottom, left, right }) {
  return (
    <div
      style={{
        position: "absolute",
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        background: "var(--rose)",
        top: top !== undefined ? -CORNER_SIZE / 2 : undefined,
        bottom: bottom !== undefined ? -CORNER_SIZE / 2 : undefined,
        left: left !== undefined ? -CORNER_SIZE / 2 : undefined,
        right: right !== undefined ? -CORNER_SIZE / 2 : undefined,
        zIndex: 2,
      }}
    />
  );
}

export default function BrandQuote() {
  return (
    <section
      style={{
        background: "var(--sec-workshop)",
        padding: "56px 24px 64px",
        fontFamily: "var(--font-body)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ maxWidth: "680px", margin: "0 auto" }}
      >
        {/* bordered quote box */}
        <div
          style={{
            position: "relative",
            border: "1px solid var(--rose)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          {/* dot background */}
          <DotPattern width={6} height={6} cx={1} cy={1} cr={0.8} />

          {/* corner squares */}
          <Corner top left />
          <Corner top right />
          <Corner bottom left />
          <Corner bottom right />

          {/* content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "clamp(20px, 3vw, 36px) clamp(20px, 3vw, 40px)",
            }}
          >
            {/* label */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rose)",
                marginBottom: "12px",
              }}
            >
              Our Promise
            </p>

            {/* big quote — mixed weight lines */}
            <div
              style={{
                fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-heading)",
                color: "var(--text-heading)",
              }}
            >
              {/* line 1 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", alignItems: "baseline", marginBottom: "0.08em" }}>
                <span style={{ fontWeight: 700 }}>"Every bouquet</span>
                <span style={{ fontWeight: 300 }}>we send</span>
              </div>

              {/* line 2 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", alignItems: "baseline", marginBottom: "0.08em" }}>
                <span style={{ fontWeight: 300 }}>is as</span>
                <span style={{ fontWeight: 700 }}>fresh</span>
                <span style={{ fontWeight: 300 }}>as the</span>
              </div>

              {/* line 3 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", alignItems: "baseline", marginBottom: "0.08em" }}>
                <span style={{ fontWeight: 700 }}>morning</span>
                <span style={{ fontWeight: 300 }}>it was picked —</span>
              </div>

              {/* line 4 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", alignItems: "baseline" }}>
                <span style={{ fontWeight: 300 }}>that's our</span>
                <span style={{ fontWeight: 700 }}>word."</span>
              </div>
            </div>

            {/* attribution */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "2px",
                  background: "var(--rose)",
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.5,
                }}
              >
                Piyush Goyal — Co-Founder & CEO, Bouquet D'Amour
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
