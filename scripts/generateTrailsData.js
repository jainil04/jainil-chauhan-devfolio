/**
 * Script to generate trails.ts from GPX files
 * Run with: node scripts/generateTrailsData.js
 */

const fs = require('fs');
const path = require('path');
const gpxParser = require('gpxparser');

const TRAILS_DIR = path.join(__dirname, '../public/trails');
const OUTPUT_FILE = path.join(__dirname, '../src/data/trails.ts');

// Mapping of trail names to park names
const TRAIL_TO_PARK = {
  'Four_Mile_Trail': 'Yosemite National Park',
  'Upper_Yosemite_Falls_Trail': 'Yosemite National Park',
  'Clouds_Rest_Trail': 'Yosemite National Park',
  'Half_Dome_via_the_John_Muir_Trail_JMT': 'Yosemite National Park',
  'Vernal_Falls': 'Yosemite National Park',
  'Lassen_Peak_Trail': 'Lassen Volcanic National Park',
  'Bumpass_Hell_Trail': 'Lassen Volcanic National Park',
  'Cinder_Cone_Trail': 'Lassen Volcanic National Park',
  'Manzanita_Lake_Loop': 'Lassen Volcanic National Park',
  'Angels_Landing_Trail': 'Zion National Park',
  'The_Watchman_Trail': 'Zion National Park',
  'Zion_Grotto_Trail': 'Zion National Park',
  'Emerald_Pools_Trail': 'Zion National Park',
  'The_Zion_Narrows_Riverside_Walk': 'Zion National Park',
  'Zion_Canyon_Overlook_Trail': 'Zion National Park',
  'Mission_Peak_from_Ohlone_College': 'Mission Peak Regional Preserve',
  'Muir_Woods_to_Mount_Tamalpais': 'Mount Tamalpais State Park',
  'Point_Lobos_Loop': 'Point Lobos State Natural Reserve',
  'Lake_Chabot_Loop_via_West_Bass_Columbine_Honker_East_Shore_Trails': 'Lake Chabot Regional Park',
  'Cataract_Falls_Trail': 'Cataract Falls Park',
  'North_Peak_via_Montara_Mountain_Trail': 'San Pedro Valley County Park',
  'Alamere_Falls_via_Coast_Trail_from_Palomarin_Trailhead': 'Phillip Burton Wilderness Area',
  'Maple_Falls_via_Bridge_Creek_Trail_and_Aptos_Creek_Road': 'The Forest of Nisene Marks State Park',
};

function formatTrailName(filename) {
  return filename
    .replace(/_/g, ' ')
    .replace('.gpx', '');
}

function cleanTrailName(name) {
  // Remove CDATA tags and clean up the trail name
  return name
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .trim();
}

function formatTime(seconds) {
  if (!seconds) return '';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

async function parseGPXFiles() {
  const files = fs.readdirSync(TRAILS_DIR).filter(f => f.endsWith('.gpx'));
  const trails = [];

  for (const file of files) {
    try {
      const gpxContent = fs.readFileSync(path.join(TRAILS_DIR, file), 'utf-8');
      const gpx = new gpxParser();
      gpx.parse(gpxContent);

      if (!gpx.tracks || gpx.tracks.length === 0) {
        console.warn(`No tracks found in ${file}`);
        continue;
      }

      const track = gpx.tracks[0];
      const filenameWithoutExt = file.replace('.gpx', '');

      // Extract coordinates from track points
      const coordinates = [];
      if (track.points && track.points.length > 0) {
        // Sample points to reduce file size (every 10th point)
        const samplingRate = Math.max(1, Math.floor(track.points.length / 200));
        for (let i = 0; i < track.points.length; i += samplingRate) {
          const point = track.points[i];
          coordinates.push({
            lat: parseFloat(point.lat.toFixed(6)),
            lng: parseFloat(point.lon.toFixed(6))
          });
        }
        // Always include the last point
        const lastPoint = track.points[track.points.length - 1];
        if (coordinates[coordinates.length - 1].lat !== lastPoint.lat) {
          coordinates.push({
            lat: parseFloat(lastPoint.lat.toFixed(6)),
            lng: parseFloat(lastPoint.lon.toFixed(6))
          });
        }
      }

      // Calculate metrics
      const distanceMiles = (track.distance.total || 0) * 0.000621371;
      const elevationGainFeet = (track.elevation.pos || 0) * 3.28084;
      const maxElevationFeet = (track.elevation.max || 0) * 3.28084;
      const duration = track.distance.moving_time;
      const estimatedTime = formatTime(duration);

      const trail = {
        park: TRAIL_TO_PARK[filenameWithoutExt] || 'Unknown Park',
        trail: cleanTrailName(track.name || formatTrailName(file)),
        length: parseFloat(distanceMiles.toFixed(1)),
        elevationGain: Math.round(elevationGainFeet),
        maxElevation: Math.round(maxElevationFeet),
        estimatedTime: estimatedTime,
        gpxFile: file,
        coordinates: coordinates,
      };

      trails.push(trail);
      console.log(`✓ Parsed ${file}`);
    } catch (error) {
      console.error(`✗ Error parsing ${file}:`, error.message);
    }
  }

  return trails;
}

async function generateTrailsFile() {
  console.log('Parsing GPX files...\n');
  const trails = await parseGPXFiles();

  // Sort trails by park then by trail name
  trails.sort((a, b) => {
    if (a.park !== b.park) {
      return a.park.localeCompare(b.park);
    }
    return a.trail.localeCompare(b.trail);
  });

  const fileContent = `import type { Trail } from "@/types/types";

/**
 * Trail data generated from GPX files
 * Generated on: ${new Date().toISOString()}
 * Total trails: ${trails.length}
 */
export const TRAILS: Trail[] = ${JSON.stringify(trails, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`\n✓ Generated ${OUTPUT_FILE}`);
  console.log(`✓ Total trails: ${trails.length}`);
}

generateTrailsFile().catch(console.error);
