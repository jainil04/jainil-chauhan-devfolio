/**
 * GPX Parser Utility
 * Parses GPX files and extracts trail metrics
 */

import gpxParser from "gpxparser";
import type { Trail } from "@/types/types";

export interface ParsedGPXData {
  distance: number; // in miles
  elevationGain: number; // in feet
  maxElevation: number; // in feet
  duration?: number; // in seconds
  coordinates: Array<{ lat: number; lng: number }>;
  elevationProfile: Array<{ distance: number; elevation: number }>;
}

/**
 * Parse a single GPX file
 * @param gpxString - Raw GPX file content as string
 * @param filename - Name of the GPX file (optional, for debugging)
 * @returns Parsed trail data
 */
export async function parseGPXFile(
  gpxString: string,
  filename?: string
): Promise<ParsedGPXData> {
  try {
    const gpx = new gpxParser();
    gpx.parse(gpxString);

    if (!gpx.tracks || gpx.tracks.length === 0) {
      throw new Error(`No tracks found in GPX file ${filename || ""}`);
    }

    const track = gpx.tracks[0];

    // Extract coordinates
    const coordinates: Array<{ lat: number; lng: number }> = [];
    const elevationProfile: Array<{ distance: number; elevation: number }> = [];

    if (track.points && track.points.length > 0) {
      track.points.forEach((point, index: number) => {
        coordinates.push({
          lat: point.lat,
          lng: point.lon,
        });

        // Build elevation profile (distance in miles, elevation in feet)
        if (point.ele !== undefined) {
          const cumulativeDistance = track.distance?.cumul;
          const distanceMeters = index > 0 && Array.isArray(cumulativeDistance)
            ? cumulativeDistance[index]
            : 0;
          const distanceMiles = distanceMeters * 0.000621371;
          const elevationFeet = point.ele * 3.28084;

          elevationProfile.push({
            distance: parseFloat(distanceMiles.toFixed(2)),
            elevation: parseFloat(elevationFeet.toFixed(0)),
          });
        }
      });
    }

    // Calculate metrics
    const distanceMiles = (track.distance.total || 0) * 0.000621371;
    const elevationGainFeet = (track.elevation.pos || 0) * 3.28084;
    const maxElevationFeet = (track.elevation.max || 0) * 3.28084;

    return {
      distance: parseFloat(distanceMiles.toFixed(2)),
      elevationGain: Math.round(elevationGainFeet),
      maxElevation: Math.round(maxElevationFeet),
      duration: (track as { duration?: number }).duration,
      coordinates,
      elevationProfile,
    };
  } catch (error) {
    console.error(`Error parsing GPX file ${filename || ""}:`, error);
    throw error;
  }
}

/**
 * Fetch and parse a GPX file from the public directory
 * @param filename - Name of the GPX file in public/trails/
 * @returns Parsed trail data
 */
export async function fetchAndParseGPX(
  filename: string
): Promise<ParsedGPXData> {
  try {
    const response = await fetch(`/trails/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch GPX file: ${filename}`);
    }
    const gpxString = await response.text();
    return parseGPXFile(gpxString, filename);
  } catch (error) {
    console.error(`Error fetching GPX file ${filename}:`, error);
    throw error;
  }
}

/**
 * Parse multiple GPX files
 * @param filenames - Array of GPX filenames in public/trails/
 * @returns Array of parsed trail data
 */
export async function parseMultipleGPXFiles(
  filenames: string[]
): Promise<ParsedGPXData[]> {
  const promises = filenames.map((filename) => fetchAndParseGPX(filename));
  return Promise.all(promises);
}

/**
 * Merge parsed GPX data with manual Trail data
 * @param trail - Manual trail data
 * @param gpxData - Parsed GPX data
 * @returns Enhanced trail object
 */
export function mergeTrailWithGPX(
  trail: Trail,
  gpxData: ParsedGPXData
): Trail {
  return {
    ...trail,
    length: gpxData.distance || trail.length,
    elevationGain: gpxData.elevationGain || trail.elevationGain,
    maxElevation: gpxData.maxElevation,
    duration: gpxData.duration,
    coordinates: gpxData.coordinates,
    elevationProfile: gpxData.elevationProfile,
  };
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @returns Distance in meters
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
