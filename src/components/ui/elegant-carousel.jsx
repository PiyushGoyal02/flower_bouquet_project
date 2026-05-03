import React, { useState, useEffect, useRef } from 'react';
import '../../CSS_CODE/ElegantCarouselCSS.css';

const slides = [
  {
    title: "Bouquet D'Amour",
    subtitle: 'Signature Rose Collection',
    description:
      'Handpicked red roses arranged with love — the timeless gift that speaks a thousand words. Perfect for anniversaries, birthdays, and every heartfelt occasion.',
    accent:     'var(--rose)',
    accentRgb:  '194,56,90',
    imageUrl:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Spring Bloom',
    subtitle: 'Seasonal Fresh Collection',
    description:
      "A vibrant celebration of nature's finest blooms — tulips, lilies, and sunflowers gathered into one breathtaking arrangement. Freshly crafted and delivered daily.",
    accent:     'var(--text-on-dark-green)',
    accentRgb:  '111,207,151',
    imageUrl:
      'https://images.unsplash.com/photo-1490750967868-88df5691cc3b?w=900&h=1200&fit=crop&q=80',
  },
];

const SLIDE_DURATION      = 5000;
const TRANSITION_DURATION = 700;

export default function ElegantCarousel() {
  const [currentIndex,    setCurrentIndex]    = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress,        setProgress]        = useState(0);
  const [isPaused,        setIsPaused]        = useState(false);

  /* Refs so timers always see the latest values — no stale closures */
  const indexRef         = useRef(0);
  const transitioningRef = useRef(false);
  const touchStartX      = useRef(0);
  const touchEndX        = useRef(0);

  /* Keep refs in sync */
  indexRef.current         = currentIndex;
  transitioningRef.current = isTransitioning;

  /* Central transition function — uses refs, safe to call from any timer */
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

  /* Auto-advance + progress bar */
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);

    /* Smooth progress fill */
    const tick = SLIDE_DURATION / 100;          // ms per 1%
    const progressId = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 1));
    }, tick);

    /* Slide change after full duration */
    const slideId = setTimeout(() => {
      const next = (indexRef.current + 1) % slides.length;
      advance(next);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressId);
      clearTimeout(slideId);
    };
  }, [currentIndex, isPaused]); // re-arm every time the slide changes

  /* Touch swipe */
  const onTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const onTouchMove  = (e) => { touchEndX.current   = e.targetTouches[0].clientX; };
  const onTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      diff > 0
        ? advance((indexRef.current + 1) % slides.length)
        : advance((indexRef.current - 1 + slides.length) % slides.length);
    }
  };

  const slide = slides[currentIndex];
  const cls   = isTransitioning ? 'transitioning' : 'visible';

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Accent glow */}
      <div
        className="carousel-bg-wash"
        style={{ background: `radial-gradient(ellipse at 70% 50%, rgba(${slide.accentRgb},0.12) 0%, transparent 70%)` }}
      />

      <div className="carousel-inner">
        {/* Left: text */}
        <div className="carousel-content">
          <div className="carousel-content-inner">

            <div className={`carousel-collection-num ${cls}`}>
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <h2 className={`carousel-title ${cls}`}>{slide.title}</h2>

            <p className={`carousel-subtitle ${cls}`} style={{ color: slide.accent }}>
              {slide.subtitle}
            </p>

            <p className={`carousel-description ${cls}`}>{slide.description}</p>
          </div>
        </div>

        {/* Right: image */}
        <div className="carousel-image-container">
          <div className={`carousel-image-frame ${cls}`}>
            <img src={slide.imageUrl} alt={slide.title} className="carousel-image" />
            <div
              className="carousel-image-overlay"
              style={{ background: `linear-gradient(135deg, rgba(${slide.accentRgb},0.13) 0%, transparent 55%)` }}
            />
          </div>
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: slide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: slide.accent }} />
        </div>
      </div>

      {/* Progress indicators */}
      <div className="carousel-progress-bar">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => advance(i)}
            className={`carousel-progress-item ${i === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width:           i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%',
                  backgroundColor: i === currentIndex ? slide.accent : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
