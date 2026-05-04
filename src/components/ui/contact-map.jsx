import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, Phone, Clock } from "lucide-react";

// Dev Samaj College for Women, Sector 45-B, Chandigarh
const STUDIO_LNG = 76.7614;
const STUDIO_LAT = 30.7072;
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function ContactMap() {
  const containerRef = useRef(null);
  const mapRef      = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style:     MAP_STYLE,
      center:    [STUDIO_LNG, STUDIO_LAT],
      zoom:      15.2,
      attributionControl: { compact: true },
      scrollZoom: false,
    });

    /* ── Custom rose marker element ── */
    const el = document.createElement("div");
    el.className = "cmap-pin-wrapper";
    el.innerHTML = `
      <div class="cmap-pin-dot"></div>
      <div class="cmap-pin-pulse"></div>
    `;

    /* ── Popup ── */
    const popup = new maplibregl.Popup({
      offset: 32,
      closeButton: false,
      closeOnClick: false,
      maxWidth: "260px",
    }).setHTML(`
      <div class="cmap-popup-inner">
        <p class="cmap-popup-brand">Bouquet D'Amour</p>
        <p class="cmap-popup-name">Dev Samaj College, Sector 45-B</p>
        <p class="cmap-popup-address">Chandigarh — 160047, India</p>
        <div class="cmap-popup-divider"></div>
        <div class="cmap-popup-row">
          <span class="cmap-popup-label">Hours</span>
          <span class="cmap-popup-value">10 AM – 8 PM, Mon–Sat</span>
        </div>
        <div class="cmap-popup-row">
          <span class="cmap-popup-label">Phone</span>
          <span class="cmap-popup-value">+91 98765 43210</span>
        </div>
      </div>
    `);

    new maplibregl.Marker({ element: el })
      .setLngLat([STUDIO_LNG, STUDIO_LAT])
      .setPopup(popup)
      .addTo(map);

    map.on("load", () => {
      /* open popup by default */
      popup.setLngLat([STUDIO_LNG, STUDIO_LAT]).addTo(map);
      setReady(true);
    });

    /* zoom controls */
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="cmap-section">

      {/* Header */}
      <div className="cmap-header">
        <span className="cmap-eyebrow">Find Us</span>
        <h2 className="cmap-heading">Visit Our Flower Studio</h2>
        <p className="cmap-sub">
          Walk in anytime — we're at Dev Samaj College, Sector 45-B, Chandigarh.
        </p>
      </div>

      {/* Map + Info row */}
      <div className="cmap-body">

        {/* Info sidebar */}
        <div className="cmap-info">
          <div className="cmap-info-item">
            <span className="cmap-info-icon">
              <MapPin size={17} strokeWidth={2} />
            </span>
            <div>
              <p className="cmap-info-label">Address</p>
              <p className="cmap-info-value">Dev Samaj College, Sector 45-B<br />Chandigarh — 160047</p>
            </div>
          </div>

          <div className="cmap-info-item">
            <span className="cmap-info-icon">
              <Phone size={17} strokeWidth={2} />
            </span>
            <div>
              <p className="cmap-info-label">Phone</p>
              <a href="tel:+919876543210" className="cmap-info-link">+91 98765 43210</a>
            </div>
          </div>

          <div className="cmap-info-item">
            <span className="cmap-info-icon">
              <Clock size={17} strokeWidth={2} />
            </span>
            <div>
              <p className="cmap-info-label">Studio Hours</p>
              <p className="cmap-info-value">Mon – Sat: 10:00 AM – 8:00 PM</p>
              <p className="cmap-info-value">Sunday: 11:00 AM – 5:00 PM</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Dev+Samaj+College+Sector+45B+Chandigarh"
            target="_blank"
            rel="noopener noreferrer"
            className="cmap-directions-btn"
          >
            <MapPin size={15} strokeWidth={2} />
            Get Directions
          </a>
        </div>

        {/* Map canvas */}
        <div className="cmap-canvas-wrapper">
          {!ready && (
            <div className="cmap-loader">
              <span className="cmap-loader-dot" style={{ animationDelay: "0ms" }} />
              <span className="cmap-loader-dot" style={{ animationDelay: "150ms" }} />
              <span className="cmap-loader-dot" style={{ animationDelay: "300ms" }} />
            </div>
          )}
          <div ref={containerRef} className="cmap-canvas" />
        </div>

      </div>
    </div>
  );
}
