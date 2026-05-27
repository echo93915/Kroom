export interface UniversityPin {
  name: string;
  lat: number;
  lng: number;
  /** Additional terms matched against a post's university field (case-insensitive substring). */
  matchTerms?: string[];
}

export const ICONIC_UNIVERSITIES: UniversityPin[] = [
  // California
  { name: "UCLA",              lat: 34.0689,  lng: -118.4452, matchTerms: ["university of california, los angeles", "uc los angeles", "ucla"] },
  { name: "USC",               lat: 34.0224,  lng: -118.2851, matchTerms: ["university of southern california", "usc"] },
  { name: "UC Berkeley",       lat: 37.8724,  lng: -122.2595, matchTerms: ["university of california, berkeley", "uc berkeley", "cal berkeley"] },
  { name: "Stanford University",lat: 37.4275, lng: -122.1697, matchTerms: ["stanford"] },
  { name: "UC San Diego",      lat: 32.8801,  lng: -117.2340, matchTerms: ["university of california, san diego", "ucsd"] },
  { name: "UC Santa Barbara",  lat: 34.4140,  lng: -119.8489, matchTerms: ["university of california, santa barbara", "ucsb"] },
  { name: "UC Irvine",         lat: 33.6405,  lng: -117.8443, matchTerms: ["university of california, irvine", "uci"] },
  { name: "UC Davis",          lat: 38.5382,  lng: -121.7617, matchTerms: ["university of california, davis"] },
  { name: "Pepperdine University",         lat: 34.0358,  lng: -118.7129 },
  { name: "Loyola Marymount University",   lat: 33.9694,  lng: -118.4164, matchTerms: ["lmu"] },
  { name: "San Jose State University",     lat: 37.3352,  lng: -121.8811, matchTerms: ["sjsu"] },
  // New York
  { name: "NYU",               lat: 40.7295,  lng: -73.9965,  matchTerms: ["new york university", "nyu"] },
  { name: "Columbia University",           lat: 40.8075,  lng: -73.9626 },
  { name: "Fordham University",            lat: 40.8617,  lng: -73.8855 },
  { name: "The New School",               lat: 40.7357,  lng: -74.0002 },
  // Massachusetts
  { name: "Harvard University",            lat: 42.3744,  lng: -71.1182, matchTerms: ["harvard"] },
  { name: "MIT",               lat: 42.3601,  lng: -71.0942,  matchTerms: ["massachusetts institute of technology", "mit"] },
  { name: "Boston University",             lat: 42.3505,  lng: -71.1054, matchTerms: ["bu"] },
  { name: "Northeastern University",       lat: 42.3398,  lng: -71.0892 },
  { name: "Tufts University",              lat: 42.4075,  lng: -71.1190 },
  { name: "Brandeis University",           lat: 42.3668,  lng: -71.2600 },
  // Connecticut / Rhode Island
  { name: "Yale University",               lat: 41.3163,  lng: -72.9223, matchTerms: ["yale"] },
  { name: "Brown University",              lat: 41.8268,  lng: -71.4025, matchTerms: ["brown"] },
  // New Jersey / Pennsylvania
  { name: "Princeton University",          lat: 40.3431,  lng: -74.6515, matchTerms: ["princeton"] },
  { name: "Rutgers University",            lat: 40.5018,  lng: -74.4479, matchTerms: ["rutgers"] },
  { name: "University of Pennsylvania",    lat: 39.9522,  lng: -75.1932, matchTerms: ["upenn", "penn"] },
  { name: "Drexel University",             lat: 39.9564,  lng: -75.1899 },
  { name: "Temple University",             lat: 39.9812,  lng: -75.1554 },
  { name: "Carnegie Mellon University",    lat: 40.4433,  lng: -79.9436, matchTerms: ["cmu", "carnegie mellon"] },
  { name: "University of Pittsburgh",      lat: 40.4444,  lng: -79.9533, matchTerms: ["pitt"] },
  // Washington D.C. area
  { name: "Georgetown University",         lat: 38.9076,  lng: -77.0723 },
  { name: "George Washington University",  lat: 38.8997,  lng: -77.0480, matchTerms: ["gwu", "gw"] },
  { name: "American University",           lat: 38.9366,  lng: -77.0877 },
  { name: "University of Maryland",        lat: 38.9869,  lng: -76.9426, matchTerms: ["umd", "umcp"] },
  { name: "Johns Hopkins University",      lat: 39.3299,  lng: -76.6205, matchTerms: ["jhu", "johns hopkins"] },
  // North Carolina / Virginia
  { name: "Duke University",               lat: 36.0014,  lng: -78.9382, matchTerms: ["duke"] },
  { name: "UNC Chapel Hill",               lat: 35.9049,  lng: -79.0469, matchTerms: ["university of north carolina", "unc"] },
  { name: "University of Virginia",        lat: 38.0336,  lng: -78.5080, matchTerms: ["uva"] },
  // Southeast
  { name: "Emory University",              lat: 33.7930,  lng: -84.3248, matchTerms: ["emory"] },
  { name: "Georgia Tech",                  lat: 33.7756,  lng: -84.3963, matchTerms: ["georgia institute of technology", "georgia tech", "gatech"] },
  { name: "Georgia State University",      lat: 33.7490,  lng: -84.3880, matchTerms: ["gsu"] },
  { name: "University of Miami",           lat: 25.7215,  lng: -80.2784, matchTerms: ["um", "miami"] },
  { name: "University of Florida",         lat: 29.6516,  lng: -82.3490, matchTerms: ["uf", "uflorida"] },
  { name: "Florida State University",      lat: 30.4418,  lng: -84.2985, matchTerms: ["fsu"] },
  { name: "Tulane University",             lat: 29.9401,  lng: -90.1183, matchTerms: ["tulane"] },
  { name: "Vanderbilt University",         lat: 36.1447,  lng: -86.8027, matchTerms: ["vandy", "vanderbilt"] },
  // Midwest
  { name: "University of Chicago",         lat: 41.7886,  lng: -87.5987, matchTerms: ["uchicago"] },
  { name: "Northwestern University",       lat: 42.0565,  lng: -87.6753, matchTerms: ["northwestern", "nu"] },
  { name: "DePaul University",             lat: 41.9245,  lng: -87.6547 },
  { name: "Loyola University Chicago",     lat: 42.0011,  lng: -87.6583 },
  { name: "University of Illinois Urbana-Champaign", lat: 40.1020, lng: -88.2272, matchTerms: ["uiuc", "illinois urbana", "u of i"] },
  { name: "Purdue University",             lat: 40.4237,  lng: -86.9212, matchTerms: ["purdue"] },
  { name: "Indiana University",            lat: 39.1682,  lng: -86.5230, matchTerms: ["iu", "iub"] },
  { name: "University of Notre Dame",      lat: 41.7056,  lng: -86.2353, matchTerms: ["notre dame"] },
  { name: "Ohio State University",         lat: 40.0076,  lng: -83.0309, matchTerms: ["osu", "ohio state"] },
  { name: "Case Western Reserve University", lat: 41.5038, lng: -81.6077, matchTerms: ["cwru", "case western"] },
  { name: "University of Michigan",        lat: 42.2780,  lng: -83.7382, matchTerms: ["umich", "u of m"] },
  { name: "Michigan State University",     lat: 42.7018,  lng: -84.4822, matchTerms: ["msu"] },
  { name: "University of Wisconsin-Madison", lat: 43.0766, lng: -89.4125, matchTerms: ["uw madison", "uwm", "wisc"] },
  { name: "University of Minnesota",       lat: 44.9742,  lng: -93.2360, matchTerms: ["umn", "u of minnesota"] },
  { name: "Washington University in St. Louis", lat: 38.6488, lng: -90.3108, matchTerms: ["washu", "wustl"] },
  { name: "Saint Louis University",        lat: 38.6371,  lng: -90.2340, matchTerms: ["slu"] },
  // Texas
  { name: "Rice University",               lat: 29.7174,  lng: -95.4018, matchTerms: ["rice"] },
  { name: "UT Austin",                     lat: 30.2849,  lng: -97.7341, matchTerms: ["university of texas at austin", "university of texas", "ut austin", "uta"] },
  { name: "Southern Methodist University", lat: 32.8414,  lng: -96.7842, matchTerms: ["smu"] },
  { name: "Texas A&M University",          lat: 30.6280,  lng: -96.3344, matchTerms: ["tamu", "texas a&m", "texas am"] },
  // Mountain / Southwest
  { name: "University of Colorado Boulder", lat: 40.0076, lng: -105.2659, matchTerms: ["cu boulder", "colorado boulder"] },
  { name: "University of Denver",          lat: 39.6769,  lng: -104.9619, matchTerms: ["du"] },
  { name: "Arizona State University",      lat: 33.4255,  lng: -111.9400, matchTerms: ["asu"] },
  { name: "University of Arizona",         lat: 32.2319,  lng: -110.9501, matchTerms: ["uarizona", "u of arizona"] },
  { name: "University of Utah",            lat: 40.7649,  lng: -111.8421, matchTerms: ["uutah", "u of utah"] },
  // Pacific Northwest
  { name: "University of Washington",      lat: 47.6553,  lng: -122.3035, matchTerms: ["uw", "uwashington"] },
  { name: "Seattle University",            lat: 47.6062,  lng: -122.3178 },
  { name: "University of Oregon",          lat: 44.0449,  lng: -123.0723, matchTerms: ["uoregon"] },
  { name: "Oregon State University",       lat: 44.5638,  lng: -123.2795, matchTerms: ["osu", "oregonstate"] },
  // Northeast
  { name: "Dartmouth College",             lat: 43.7044,  lng: -72.2887, matchTerms: ["dartmouth"] },
  { name: "Cornell University",            lat: 42.4534,  lng: -76.4735, matchTerms: ["cornell"] },
];

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Returns true if the property coords are within radiusKm of any selected university. */
export function propertyNearSelectedUnis(
  lat: number | null | undefined,
  lng: number | null | undefined,
  selectedNames: Set<string>,
  pins: UniversityPin[],
  radiusKm = 8
): boolean {
  if (pins.length === 0 || selectedNames.size === 0) return true;
  if (lat == null || lng == null) return true;
  return pins
    .filter((u) => selectedNames.has(u.name))
    .some((u) => haversineKm(lat, lng, u.lat, u.lng) <= radiusKm);
}

export function nearestUniversity(
  lat: number,
  lng: number,
  maxRadiusKm = 80
): UniversityPin | null {
  return nearbyUniversities(lat, lng, maxRadiusKm, 1)[0] ?? null;
}

export function nearbyUniversities(
  lat: number,
  lng: number,
  maxRadiusKm = 50,
  maxCount = 8
): UniversityPin[] {
  return ICONIC_UNIVERSITIES
    .map((u) => ({ ...u, dist: haversineKm(lat, lng, u.lat, u.lng) }))
    .filter((u) => u.dist <= maxRadiusKm)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, maxCount);
}
