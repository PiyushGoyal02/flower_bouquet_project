import React from "react";
import "../../CSS_CODE/GooeyMarqueeCSS.css";

/**
 * GooeyMarquee
 * Exact port of the original TSX component — light-mode only (site is always light).
 *
 * Props:
 *   text      string   — text to scroll
 *   speed     number   — seconds per loop (default 16)
 *   className string   — extra wrapper classes
 */
export function GooeyMarquee({ text, speed = 16, className = "" }) {
  const animation = `marquee ${speed}s infinite linear`;

  return (
    <div
      className={className}
      style={{
        position:       "relative",
        width:          "100%",
        height:         "100px",
        fontSize:       "2.8rem",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
      }}
    >
      {/* ── Blur layer with gooey contrast effect (light mode) ── */}
      <div
        style={{
          position:        "absolute",
          inset:            0,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          backgroundColor: "white",
          backgroundImage: `
            linear-gradient(to right, black, 1rem, transparent 50%),
            linear-gradient(to left,  black, 1rem, transparent 50%)
          `,
          filter: "contrast(15)",
        }}
      >
        <p
          style={{
            position:   "absolute",
            minWidth:   "100%",
            whiteSpace: "nowrap",
            filter:     "blur(0.07em)",
            animation,
          }}
        >
          {text}
        </p>
      </div>

      {/* ── Clear text layer on top ── */}
      <div
        style={{
          position:       "absolute",
          inset:           0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            position:   "absolute",
            minWidth:   "100%",
            whiteSpace: "nowrap",
            animation,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
