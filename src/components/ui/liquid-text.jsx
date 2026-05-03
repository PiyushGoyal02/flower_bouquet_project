import { useCallback, useEffect, useRef } from "react";

const MORPH_TIME    = 1.5;
const COOLDOWN_TIME = 0.5;

function useMorphingText(texts) {
  const textIndexRef  = useRef(0);
  const morphRef      = useRef(0);
  const cooldownRef   = useRef(0);
  const timeRef       = useRef(new Date());
  const text1Ref      = useRef(null);
  const text2Ref      = useRef(null);

  const setStyles = useCallback(
    (fraction) => {
      const c1 = text1Ref.current;
      const c2 = text2Ref.current;
      if (!c1 || !c2 || !texts?.length) return;

      c2.style.filter  = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      c2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inv = 1 - fraction;
      c1.style.filter  = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      c1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;

      c1.textContent = texts[textIndexRef.current % texts.length];
      c2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / MORPH_TIME;
    if (fraction > 1) {
      cooldownRef.current = COOLDOWN_TIME;
      fraction = 1;
    }
    setStyles(fraction);
    if (fraction === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const c1 = text1Ref.current;
    const c2 = text2Ref.current;
    if (c1 && c2) {
      c2.style.filter  = "none";
      c2.style.opacity = "100%";
      c1.style.filter  = "none";
      c1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const now = new Date();
      const dt  = (now.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = now;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
}

function Texts({ texts }) {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  const spanStyle = {
    position:    "absolute",
    left:         0,
    right:        0,
    top:          0,
    margin:      "auto",
    display:     "inline-block",
    width:       "100%",
  };
  return (
    <>
      <span style={spanStyle} ref={text1Ref} />
      <span style={spanStyle} ref={text2Ref} />
    </>
  );
}

function SvgFilters() {
  return (
    <svg
      id="liquid-text-filters"
      style={{ display: "none" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function MorphingText({ texts, color = "#c0395a", fontSize, height, style }) {
  return (
    <div
      style={{
        position:   "relative",
        margin:     "0 auto",
        height:     height ?? "clamp(3.5rem, 8vw, 6.5rem)",
        width:      "100%",
        maxWidth:   "900px",
        textAlign:  "center",
        fontFamily: "'Poppins', sans-serif",
        fontSize:   fontSize ?? "clamp(2.4rem, 6vw, 5.5rem)",
        fontWeight: 800,
        lineHeight: 1,
        color,
        filter:     "url(#threshold) blur(0.6px)",
        ...style,
      }}
    >
      <Texts texts={texts} />
      <SvgFilters />
    </div>
  );
}
