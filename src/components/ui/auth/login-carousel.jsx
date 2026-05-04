import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    title: "Crafted With Love",
    subtitle: "Every bouquet tells a story",
    description: "Fresh flowers, handpicked and arranged daily by our expert florists for your most special moments.",
    accent: "#c0395a",
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=900&h=1400&fit=crop&q=80",
  },
  {
    title: "Fresh Every Morning",
    subtitle: "Nature's finest, delivered to you",
    description: "Same-day delivery available. Order by noon and receive beautifully wrapped blooms by evening.",
    accent: "#7BA87E",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88df5691cc3b?w=900&h=1400&fit=crop&q=80",
  },
];

const SLIDE_DURATION      = 5000;
const TRANSITION_DURATION = 700;

export default function LoginCarousel() {
  const [currentIndex,    setCurrentIndex]    = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress,        setProgress]        = useState(0);
  const [isPaused,        setIsPaused]        = useState(false);

  const indexRef         = useRef(0);
  const transitioningRef = useRef(false);
  indexRef.current         = currentIndex;
  transitioningRef.current = isTransitioning;

  const advance = (nextIndex) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      indexRef.current = nextIndex;
      setTimeout(() => {
        setIsTransitioning(false);
        transitioningRef.current = false;
      }, 50);
    }, TRANSITION_DURATION / 2);
  };

  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const tick       = SLIDE_DURATION / 100;
    const progressId = setInterval(() => setProgress(p => Math.min(p + 1, 100)), tick);
    const slideId    = setTimeout(() => advance((indexRef.current + 1) % slides.length), SLIDE_DURATION);
    return () => { clearInterval(progressId); clearTimeout(slideId); };
  }, [currentIndex, isPaused]);

  const slide = slides[currentIndex];
  const cls   = isTransitioning ? 'lc-transitioning' : 'lc-visible';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        .lc-wrapper {
          position: relative; width: 100%; height: 100%;
          min-height: 100%; overflow: hidden; background: #0f0a08;
        }
        .lc-image-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 350ms ease, transform 350ms ease;
        }
        .lc-image-bg.lc-visible      { opacity: 1; transform: scale(1); }
        .lc-image-bg.lc-transitioning{ opacity: 0; transform: scale(1.04); }

        .lc-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to top,
            rgba(0,0,0,0.88) 0%,
            rgba(0,0,0,0.22) 55%,
            rgba(0,0,0,0.08) 100%);
        }
        .lc-content {
          position: absolute; bottom: 90px; left: 0; right: 0;
          padding: 0 44px; z-index: 2;
          transition: opacity 350ms ease 60ms, transform 350ms ease 60ms;
        }
        .lc-content.lc-visible      { opacity: 1; transform: translateY(0); }
        .lc-content.lc-transitioning{ opacity: 0; transform: translateY(14px); }

        .lc-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          margin: 0 0 10px;
        }
        .lc-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.55rem, 2.4vw, 2.3rem);
          font-weight: 700; color: #fff;
          margin: 0 0 12px; line-height: 1.15;
        }
        .lc-description {
          font-family: 'Poppins', sans-serif;
          font-size: 0.86rem; color: rgba(255,255,255,0.68);
          line-height: 1.75; margin: 0; max-width: 380px;
        }
        .lc-progress-bar {
          position: absolute; bottom: 32px;
          left: 44px; right: 44px;
          z-index: 3; display: flex; gap: 8px;
        }
        .lc-progress-item {
          flex: 1; background: none; border: none; cursor: pointer; padding: 6px 0;
        }
        .lc-progress-track {
          height: 2px; background: rgba(255,255,255,0.18);
          border-radius: 2px; overflow: hidden;
        }
        .lc-progress-fill {
          height: 100%; background: rgba(255,255,255,0.75);
          border-radius: 2px; transition: width 50ms linear;
        }
      `}</style>

      <div
        className="lc-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`lc-image-bg ${cls}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        />
        <div className="lc-overlay" />

        <div className={`lc-content ${cls}`}>
          <p className="lc-subtitle" style={{ color: slide.accent }}>{slide.subtitle}</p>
          <h2 className="lc-title">{slide.title}</h2>
          <p className="lc-description">{slide.description}</p>
        </div>

        <div className="lc-progress-bar">
          {slides.map((_, i) => (
            <button key={i} className="lc-progress-item" onClick={() => advance(i)} aria-label={`Slide ${i + 1}`}>
              <div className="lc-progress-track">
                <div className="lc-progress-fill" style={{
                  width:           i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%',
                  backgroundColor: i === currentIndex ? slide.accent : undefined,
                }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
