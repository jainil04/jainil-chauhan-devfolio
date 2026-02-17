# Mountain Intelligence System

A comprehensive, data-driven hiking dashboard integrated into your portfolio website.

## 🏔️ Features Implemented

### 1. **GPX Parsing Layer** (`src/utils/gpxParser.ts`)
- Client-side GPX file parsing
- Extracts: distance, elevation gain, max elevation, duration, coordinates, elevation profiles
- Functions:
  - `parseGPXFile()` - Parse raw GPX string
  - `fetchAndParseGPX()` - Fetch from public/trails/
  - `parseMultipleGPXFiles()` - Batch processing
  - `mergeTrailWithGPX()` - Combine manual + GPX data

### 2. **Metrics Engine** (`src/utils/metricsEngine.ts`)
- Computes aggregated statistics:
  - Total miles hiked
  - Total elevation gain
  - Highest elevation reached
  - Longest single hike
  - Hardest hike (elevation gain per mile)
  - Average hike distance
  - Parks explored count
- Functions:
  - `calculateAggregatedStats()` - Main stats computation
  - `generateAchievements()` - Auto-generate achievement badges
  - `filterTrails()` - Filter by parks, distance, elevation
  - `getTrailDifficulty()` - Classify trail difficulty

### 3. **Interactive Terrain Map** (`src/components/TerrainMap.tsx`)
- Leaflet-based interactive map
- Polyline rendering with difficulty-based colors:
  - 🟢 Green: Easy
  - 🟡 Yellow: Moderate
  - 🟠 Orange: Hard
  - 🔴 Red: Extreme (15+ miles or 4k+ ft gain)
- Filter toggles for parks, long distance, high elevation
- Click to view trail details with elevation profile
- Dynamic legend

### 4. **Elevation Graph** (`src/components/ElevationProfile.tsx`)
- Recharts-based area chart
- Animated draw-in effect (1.5s)
- Interactive tooltip showing distance & elevation
- Minimal, elegant design

### 5. **Snowboarding Performance** (`src/components/SnowboardingSection.tsx`)
- Stat cards: days on mountain, resorts visited, vertical feet
- Lake Tahoe resort coverage with visited status
- Season progression timeline
- Data source: `src/data/snowboarding.ts`

### 6. **Achievements System** (`src/components/Achievements.tsx`)
- Auto-generated achievements:
  - 🏔️ 20+ Mile Club
  - ⛰️ 5,000 ft Gain Club
  - 🥾 Century Hiker (100+ total miles)
  - 🌲 Trail Explorer (10+ trails/year)
  - 🏔️ Half Dome Summit
  - 📈 Vertical Veteran (50k+ elevation)
  - 🌄 Park Explorer (5+ parks)
  - 💪 Ultra Endurance (15+ mi, 4k+ ft in one hike)
- Earned vs. locked display
- Minimalist badge design

### 7. **UX Modes** (Story / Data)
- **Story Mode**: Poetic copy, minimal stats, 3-stat preview
- **Data Mode**: Full dashboard with:
  - Comprehensive stats panel
  - Interactive map with filters
  - Achievements system
  - Snowboarding section
- Smooth animated transitions with Framer Motion
- Mode toggle in header

### 8. **Stats Panel** (`src/components/StatsPanel.tsx`)
- 6 primary metrics in grid layout
- Featured hikes: longest & hardest
- Mono spaced numbers with serif headings
- Architectural, calm aesthetic

## 📁 File Structure

```
src/
├── app/outdoor-activities/
│   └── page.tsx                    # Main page with mode toggle
├── components/
│   ├── Achievements.tsx            # Achievement badges
│   ├── ElevationProfile.tsx        # Elevation chart
│   ├── SnowboardingSection.tsx     # Snowboarding stats
│   ├── StatsPanel.tsx              # Aggregate metrics
│   └── TerrainMap.tsx              # Interactive Leaflet map
├── data/
│   ├── trails.ts                   # Manual trail data
│   └── snowboarding.ts             # Snowboarding data
├── types/
│   └── types.ts                    # TypeScript interfaces
└── utils/
    ├── gpxParser.ts                # GPX parsing utilities
    └── metricsEngine.ts            # Stats computation
```

## 🚀 How to Use with GPX Files

### Step 1: Download GPX Files
1. Go to AllTrails and find your completed trails
2. Download GPX files for each trail
3. Place them in `public/trails/` directory

### Step 2: Update Trail Data
Edit `src/data/trails.ts` to add GPX filename:

```typescript
{
  park: "Yosemite National Park",
  trail: "Half Dome",
  length: 17.2,
  elevationGain: 5305,
  estimatedTime: "8:00",
  when: "Aug 15, 2025",
  gpxFile: "half_dome.gpx",  // Add this
  personalNote: "Epic sunrise summit!"  // Optional
}
```

### Step 3: Parse GPX Files (Optional Enhancement)
You can enhance the page to automatically parse GPX files on load:

```typescript
// In page.tsx, add useEffect:
useEffect(() => {
  async function loadGPXData() {
    const trailsWithGPX = TRAILS.filter(t => t.gpxFile);
    for (const trail of trailsWithGPX) {
      const gpxData = await fetchAndParseGPX(trail.gpxFile);
      // Merge and update state
    }
  }
  loadGPXData();
}, []);
```

## 🎨 Design Aesthetic

- **Typography**: Serif headings, mono numeric stats
- **Colors**: Neutral tones, no flashy colors (uses CSS variables)
- **Animations**: Subtle hover effects, smooth transitions
- **Feel**: Field research journal, not fitness app
- **Layout**: Clean spacing, minimal borders, card-based

## 📊 Current Stats (Based on Your Data)

- **Total Miles**: ~138 miles
- **Total Trails**: 29 trails
- **Parks Explored**: Yosemite, Lassen, Zion, and more
- **Highest Elevation**: From your trails data
- **Achievements Earned**: Calculated automatically

## 🔧 Dependencies Installed

```json
{
  "gpxparser": "^3.0.8",
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0",
  "recharts": "^3.7.0",
  "@types/leaflet": "^1.9.21"
}
```

## 🌐 View Your Dashboard

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/outdoor-activities`
3. Toggle between **Story** and **Data** modes using the header button

## 🎯 Future Enhancements

### Server-Side Ingestion Model (Bonus)

To migrate to a server-side model:

1. **Create API Route** (`app/api/trails/route.ts`):
   ```typescript
   export async function POST(request: Request) {
     const gpxFile = await request.formData();
     // Parse GPX server-side
     // Store as JSON in database or file
     // Return precomputed metrics
   }
   ```

2. **Store Trail Data**:
   - Use database (PostgreSQL, MongoDB)
   - Or JSON files in `/data/processed/`

3. **Benefits**:
   - Faster page loads (precomputed metrics)
   - Historical tracking over time
   - Can analyze trends (pace improvement, favorite parks)
   - Better for many GPX files (100+)

4. **Implementation**:
   ```typescript
   // Store processed trail data
   interface ProcessedTrail {
     id: string;
     metadata: Trail;
     gpxData: ParsedGPXData;
     processedAt: Date;
   }
   ```

## 💡 Tips

1. **Performance**: Large GPX files are memoized with `useMemo()`
2. **Filters**: Park filters are dynamically generated from data
3. **Map**: Only renders when in Data mode (lazy loaded)
4. **Achievements**: Automatically update as you add trails
5. **Customization**: All colors use CSS variables for theme support

## 🎨 Brand Architecture

This isn't just a hobby section—it's personal brand architecture. When visitors toggle to Data mode, they see:
- Engineering mindset applied to outdoor activities
- Systematic tracking and analysis
- Performance metrics and goal achievement
- Clear data visualization

Perfect for demonstrating:
- Analytical thinking
- Attention to detail
- System design skills
- Personal discipline

---

**Built with**: Next.js 15, TypeScript, Framer Motion, Leaflet, Recharts
**Design philosophy**: Calm, architectural, data-driven elegance
