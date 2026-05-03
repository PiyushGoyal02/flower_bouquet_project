import React from "react";
import { cn } from "../../lib/utils";

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  style,
  ...props
}) {
  const [isPaused, setIsPaused] = React.useState(false);
  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";

  let animationName;
  if (isVertical) {
    animationName = direction === "up" ? "mq-scroll-y" : "mq-scroll-y-reverse";
  } else {
    animationName = direction === "left" ? "mq-scroll" : "mq-scroll-reverse";
  }

  const maskImage = fade
    ? isVertical
      ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
      : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
    : undefined;

  return (
    <>
      <style>{`
        @keyframes mq-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mq-scroll-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes mq-scroll-y {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes mq-scroll-y-reverse {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        .mq-track {
          display: flex;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }
        .mq-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={cn("mq-wrapper", className)}
        style={{
          display: "flex",
          width: "100%",
          overflow: "hidden",
          flexDirection: isVertical ? "column" : "row",
          maskImage,
          WebkitMaskImage: maskImage,
          ...style,
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn("mq-track", isPaused && "paused")}
          style={{
            flexShrink: 0,
            flexDirection: isVertical ? "column" : "row",
            animationName,
            animationDuration: `${duration}s`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={`a-${index}`}
              style={{ display: "flex", flexShrink: 0, width: isVertical ? "100%" : undefined }}
            >
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div
              key={`b-${index}`}
              style={{ display: "flex", flexShrink: 0, width: isVertical ? "100%" : undefined }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
