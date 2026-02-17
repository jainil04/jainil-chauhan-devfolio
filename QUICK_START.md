# Quick Start Guide - Mountain Intelligence System

## ✅ What's Been Implemented

All features are now live and fully integrated!

### Features Ready:
- ✅ GPX parsing utilities
- ✅ Metrics engine with aggregated stats
- ✅ Interactive Leaflet map with trail polylines
- ✅ Elevation profile charts (Recharts)
- ✅ Achievements system (auto-generated badges)
- ✅ Snowboarding performance section
- ✅ Story/Data mode toggle
- ✅ Trail filters (parks, distance, elevation)
- ✅ Full TypeScript support
- ✅ Production build verified

## 🚀 Launch Your Dashboard

### 1. Start Development Server
```bash
npm run dev
```

### 2. Visit Your Dashboard
Navigate to: **http://localhost:3000/outdoor-activities**

### 3. Toggle Between Modes
- **Story Mode**: Poetic narrative with minimal stats
- **Data Mode**: Full-featured dashboard with maps, charts, and achievements

## 📊 Current Data Status

Your dashboard is already working with the existing trail data from `src/data/trails.ts`:
- **29 trails** currently loaded
- **Multiple parks**: Yosemite, Lassen, Zion, etc.
- **Stats calculated automatically** from your existing data

## 🗺️ Adding GPX Files (Optional Enhancement)

Want to add GPS coordinates and elevation profiles? Follow these steps:

### Step 1: Download GPX Files from AllTrails
1. Go to AllTrails.com
2. Find your completed trails
3. Click "Export GPX" or download GPX file
4. Save to `public/trails/` directory

### Step 2: Link GPX to Trail Data
Edit `src/data/trails.ts` and add the `gpxFile` property:

```typescript
{
  park: "Yosemite National Park",
  trail: "Upper Yosemite Falls Trail",
  length: 7.9,
  elevationGain: 3254,
  estimatedTime: "5:27",
  when: "July 2nd 2025",
  gpxFile: "Upper_Yosemite_Falls_Trail.gpx",  // Add this
  personalNote: "Incredible views at the top!" // Optional
}
```

### Step 3: Parse GPX on Page Load (Optional)
If you want to auto-parse GPX files, uncomment this code in `page.tsx`:

```typescript
// Add this import at the top
import { fetchAndParseGPX, mergeTrailWithGPX } from "@/utils/gpxParser";

// Add this useEffect in the component
useEffect(() => {
  async function loadGPXData() {
    const trailsWithGPX = TRAILS.filter(t => t.gpxFile);
    const enrichedTrails = [];

    for (const trail of trailsWithGPX) {
      try {
        const gpxData = await fetchAndParseGPX(trail.gpxFile!);
        enrichedTrails.push(mergeTrailWithGPX(trail, gpxData));
      } catch (error) {
        console.error(`Failed to parse ${trail.gpxFile}:`, error);
        enrichedTrails.push(trail);
      }
    }

    setEnrichedTrails(enrichedTrails);
  }

  loadGPXData();
}, []);
```

## 🎨 Customization

### Update Snowboarding Data
Edit `src/data/snowboarding.ts`:

```typescript
export const SNOWBOARDING_DATA: SnowboardingData = {
  daysOnMountain: 15,
  resortsVisited: ["Heavenly", "Northstar", "Kirkwood"],
  estimatedVerticalFeet: 75000,
  seasonProgression: [
    { date: "Dec 15, 2025", resort: "Heavenly", runs: 12 },
    // Add more sessions
  ],
};
```

### Add Personal Notes to Trails
Update any trail in `trails.ts`:

```typescript
{
  trail: "Half Dome",
  // ... other properties
  personalNote: "The cables were intense but worth every step. Summit at sunrise was magical."
}
```

## 🎯 What Each Mode Shows

### Story Mode
- Narrative-focused content
- Minimal stats (3-card preview)
- Poetic descriptions
- Focus on philosophy and thinking

### Data Mode
- **Stats Panel**: 6 key metrics + featured hikes
- **Interactive Map**:
  - Color-coded by difficulty
  - Filter by parks
  - Filter by distance (15+ miles)
  - Filter by elevation (4k+ ft gain)
  - Click trails to see details & elevation profile
- **Achievements**: Auto-generated badges based on your accomplishments
- **Snowboarding Section**: Resort stats and season timeline

## 📈 Stats Auto-Calculated

The system automatically computes:
- Total miles hiked
- Total elevation gain
- Highest elevation reached
- Longest single hike
- Hardest hike (elevation gain per mile)
- Average hike distance
- Number of parks explored

## 🏆 Achievements

Eight achievements auto-unlock based on your trails:
1. 🏔️ **20+ Mile Club** - Complete a 20+ mile hike
2. ⛰️ **5,000 ft Gain Club** - Conquer 5,000+ ft elevation gain
3. 🥾 **Century Hiker** - Hike 100+ total miles
4. 🌲 **Trail Explorer** - Complete 10+ trails in a year
5. 🏔️ **Half Dome Summit** - Conquer Half Dome
6. 📈 **Vertical Veteran** - Climb 50,000+ total feet
7. 🌄 **Park Explorer** - Visit 5+ different parks
8. 💪 **Ultra Endurance** - Complete 15+ mi with 4,000+ ft gain

## 🎨 Design Philosophy

- **Serif headings**: Architectural feel
- **Mono numbers**: Engineering precision
- **Neutral tones**: Professional, calm
- **Subtle animations**: Smooth, purposeful
- **Field journal aesthetic**: Research, not fitness app

## 🔧 Technical Stack

- **Framework**: Next.js 15 (App Router)
- **TypeScript**: Full type safety
- **Animation**: Framer Motion
- **Maps**: Leaflet + React Leaflet
- **Charts**: Recharts
- **GPX Parsing**: gpxparser library

## 📦 Files Created

```
src/
├── app/outdoor-activities/page.tsx          # Main page with mode toggle
├── components/
│   ├── Achievements.tsx                     # Achievement badges
│   ├── ElevationProfile.tsx                 # Elevation charts
│   ├── SnowboardingSection.tsx              # Snowboarding stats
│   ├── StatsPanel.tsx                       # Aggregate metrics
│   └── TerrainMap.tsx                       # Interactive map
├── data/
│   ├── trails.ts                            # Trail data (existing)
│   └── snowboarding.ts                      # Snowboarding data (new)
├── utils/
│   ├── gpxParser.ts                         # GPX parsing
│   └── metricsEngine.ts                     # Stats computation
└── types/types.ts                           # TypeScript types (updated)
```

## 🌐 Testing

1. **Story Mode**: Check narrative flow and minimal stats
2. **Data Mode**:
   - Verify stats calculate correctly
   - Test map interactions
   - Try different filters
   - Click trails on map
   - Check achievements unlock status
3. **Mobile**: Ensure responsive design works

## 🎉 You're Done!

Your Mountain Intelligence System is ready! Visit:
**http://localhost:3000/outdoor-activities**

Toggle between Story and Data modes using the button in the header.

## 💡 Pro Tips

1. Add GPX files gradually - test with 1-2 trails first
2. Personal notes make trail details more engaging
3. Update snowboarding data regularly for accurate progression
4. The map auto-centers on your trails
5. Filters are cumulative (combine multiple for precise views)

---

**Questions?** Check `MOUNTAIN_INTELLIGENCE_SYSTEM.md` for full documentation.
