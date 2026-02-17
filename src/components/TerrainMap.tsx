/**
 * Terrain Map Component
 * Renders an interactive map with trail polylines
 * Client-side only component (uses Leaflet)
 */

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Trail } from "@/types/types";
import ElevationProfile from "./ElevationProfile";

interface TerrainMapProps {
  trails: Trail[];
  onTrailClick?: (trail: Trail) => void;
  filters?: {
    parks?: string[];
    longDistance?: boolean;
    highElevation?: boolean;
  };
  height?: number;
}

export default function TerrainMap({
  trails,
  onTrailClick,
  filters,
  height = 500,
}: TerrainMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet for client-side only
    const initMap = async () => {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;
      // Leaflet CSS is imported via CDN or global styles

      // Fix Leaflet icon paths
      // @ts-expect-error - Leaflet internal property
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Create map centered on California
      const mapInstance = L.map("terrain-map", {
        center: [37.8651, -119.5383], // Yosemite
        zoom: 6,
        zoomControl: true,
      });

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 15,
      }).addTo(mapInstance);

      setMap(mapInstance);
      setMapLoaded(true);
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map || !mapLoaded) return;

    const loadLeaflet = async () => {
      const L = (await import("leaflet")).default;

      // Clear existing layers
      map.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Filter trails
    let displayTrails = [...trails];
    if (filters) {
      if (filters.parks && filters.parks.length > 0) {
        displayTrails = displayTrails.filter((trail) =>
          filters.parks!.includes(trail.park)
        );
      }
      if (filters.longDistance) {
        displayTrails = displayTrails.filter((trail) => trail.length >= 15);
      }
      if (filters.highElevation) {
        displayTrails = displayTrails.filter(
          (trail) => trail.elevationGain >= 4000
        );
      }
    }

    // Add trail polylines
    displayTrails.forEach((trail) => {
      if (!trail.coordinates || trail.coordinates.length === 0) return;

      // Color based on difficulty
      let color = "#6b7280"; // default gray
      const gainPerMile = trail.elevationGain / trail.length;

      if (trail.length >= 15 || trail.elevationGain >= 4000) {
        color = "#dc2626"; // red - extreme
      } else if (gainPerMile >= 500) {
        color = "#ea580c"; // orange - hard
      } else if (gainPerMile >= 300) {
        color = "#ca8a04"; // yellow - moderate
      } else {
        color = "#16a34a"; // green - easy
      }

      const polyline = L.polyline(
        trail.coordinates.map((c: { lat: number; lng: number }) => [c.lat, c.lng]),
        {
          color,
          weight: 3,
          opacity: 0.7,
        }
      ).addTo(map);

      // Add click event
      polyline.on("click", () => {
        setSelectedTrail(trail);
        if (onTrailClick) {
          onTrailClick(trail);
        }
      });

      // Add tooltip
      polyline.bindTooltip(
        `<strong>${trail.trail}</strong><br/>${trail.park}<br/>${trail.length.toFixed(1)} mi, ${trail.elevationGain.toLocaleString()} ft`,
        { sticky: true }
      );
    });

    // Fit bounds to show all trails
    if (displayTrails.length > 0) {
      const allCoords = displayTrails
        .filter((trail) => trail.coordinates && trail.coordinates.length > 0)
        .flatMap((trail) => trail.coordinates!.map((c) => [c.lat, c.lng]));

      if (allCoords.length > 0) {
        map.fitBounds(allCoords as L.LatLngBoundsExpression, { padding: [50, 50] });
      }
    }
    };

    loadLeaflet();
  }, [map, mapLoaded, trails, filters, onTrailClick]);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          id="terrain-map"
          style={{
            height: `${height}px`,
            width: "100%",
            borderRadius: "0.5rem",
            border: "1px solid var(--border)",
          }}
        />

        {/* Legend */}
        <div
          className="absolute top-4 right-4 p-4 rounded-lg"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            zIndex: 1000,
          }}
        >
          <div className="text-xs uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
            Difficulty
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  background: "#16a34a",
                }}
              />
              <span style={{ color: "var(--foreground)" }}>Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  background: "#ca8a04",
                }}
              />
              <span style={{ color: "var(--foreground)" }}>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  background: "#ea580c",
                }}
              />
              <span style={{ color: "var(--foreground)" }}>Hard</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  background: "#dc2626",
                }}
              />
              <span style={{ color: "var(--foreground)" }}>Extreme</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selected Trail Details */}
      {selectedTrail && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-6 rounded-lg"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                {selectedTrail.trail}
              </h3>
              <p style={{ color: "var(--muted-foreground)" }}>
                {selectedTrail.park}
              </p>
            </div>
            <button
              onClick={() => setSelectedTrail(null)}
              className="text-sm px-3 py-1 rounded"
              style={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div
                className="text-2xl font-light"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--foreground)",
                }}
              >
                {selectedTrail.length.toFixed(1)}
                <span className="text-sm ml-1" style={{ color: "var(--muted-foreground)" }}>
                  mi
                </span>
              </div>
              <p className="text-xs uppercase" style={{ color: "var(--muted-foreground)" }}>
                Distance
              </p>
            </div>
            <div>
              <div
                className="text-2xl font-light"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--foreground)",
                }}
              >
                {selectedTrail.elevationGain.toLocaleString()}
                <span className="text-sm ml-1" style={{ color: "var(--muted-foreground)" }}>
                  ft
                </span>
              </div>
              <p className="text-xs uppercase" style={{ color: "var(--muted-foreground)" }}>
                Elevation Gain
              </p>
            </div>
            {selectedTrail.maxElevation && (
              <div>
                <div
                  className="text-2xl font-light"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--foreground)",
                  }}
                >
                  {selectedTrail.maxElevation.toLocaleString()}
                  <span className="text-sm ml-1" style={{ color: "var(--muted-foreground)" }}>
                    ft
                  </span>
                </div>
                <p className="text-xs uppercase" style={{ color: "var(--muted-foreground)" }}>
                  Max Elevation
                </p>
              </div>
            )}
          </div>

          {selectedTrail.elevationProfile && selectedTrail.elevationProfile.length > 0 && (
            <div className="mt-6">
              <h4
                className="text-sm uppercase mb-4"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                Elevation Profile
              </h4>
              <ElevationProfile
                data={selectedTrail.elevationProfile}
                height={150}
              />
            </div>
          )}

          {selectedTrail.personalNote && (
            <div className="mt-6">
              <h4
                className="text-sm uppercase mb-2"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                Personal Note
              </h4>
              <p style={{ color: "var(--foreground)", lineHeight: "1.6" }}>
                {selectedTrail.personalNote}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
