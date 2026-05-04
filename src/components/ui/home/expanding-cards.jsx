import * as React from "react";

/**
 * ExpandingCards
 * Props:
 *   items            – array of { id, title, description, imgSrc, icon }
 *   defaultActiveIndex – which card starts expanded (default 0)
 */
export const ExpandingCards = React.forwardRef(function ExpandingCards(
  { items, defaultActiveIndex = 0, style, ...props },
  ref
) {
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
  const [isDesktop, setIsDesktop]     = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Build grid track sizes */
  const gridStyle = React.useMemo(() => {
    const tracks = items.map((_, i) => (i === activeIndex ? "5fr" : "1fr")).join(" ");
    return isDesktop
      ? { gridTemplateColumns: tracks, gridTemplateRows: "1fr" }
      : { gridTemplateRows: tracks,    gridTemplateColumns: "1fr" };
  }, [activeIndex, items.length, isDesktop]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        .ec-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 400ms ease-out, filter 400ms ease-out;
        }
        .ec-card-img.inactive {
          transform: scale(1.1);
          filter: grayscale(100%);
        }
        .ec-card-img.active {
          transform: scale(1);
          filter: none;
        }

        .ec-icon   { transition: opacity 300ms 75ms  ease-out; }
        .ec-title  { transition: opacity 300ms 150ms ease-out; }
        .ec-desc   { transition: opacity 300ms 225ms ease-out; }
      `}</style>

      <ul
        ref={ref}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          width: "100%",
          maxWidth: "1152px",
          display: "grid",
          gap: "8px",
          height: isDesktop ? "500px" : "600px",
          transition: "grid-template-columns 500ms ease-out, grid-template-rows 500ms ease-out",
          fontFamily: "'Poppins', sans-serif",
          ...gridStyle,
          ...style,
        }}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.id}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={()       => setActiveIndex(index)}
              onClick={()       => setActiveIndex(index)}
              style={{
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: isActive
                  ? "0 8px 32px rgba(192,57,90,0.3)"
                  : "0 2px 10px rgba(0,0,0,0.18)",
                minWidth: isDesktop ? "80px" : "0",
                minHeight: "0",
                outline: "none",
              }}
            >
              {/* Background image */}
              <img
                src={item.imgSrc}
                alt={item.title}
                className={`ec-card-img ${isActive ? "active" : "inactive"}`}
              />

              {/* Dark gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
              }} />

              {/* Sideways title on collapsed cards (desktop only) */}
              {isDesktop && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: "16px",
                  opacity: isActive ? 0 : 1,
                  transition: "opacity 300ms ease",
                  pointerEvents: "none",
                }}>
                  <span style={{
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                    fontSize: "0.7rem",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.8)",
                    whiteSpace: "nowrap",
                  }}>
                    {item.title}
                  </span>
                </div>
              )}

              {/* Active content */}
              <article style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "8px",
                padding: "20px",
              }}>
                {/* Icon */}
                <div
                  className="ec-icon"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className="ec-title"
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#fff",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="ec-desc"
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.82)",
                    opacity: isActive ? 1 : 0,
                    maxWidth: "300px",
                  }}
                >
                  {item.description}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
});
