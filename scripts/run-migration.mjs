import { readFileSync } from 'fs';

const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bHpkb3BwZXBkZnZtY3JhdmJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgwMTE0NCwiZXhwIjoyMDk1Mzc3MTQ0fQ.UJPjOKNKyDemzPI51TRRMOlPNJwhitGVczsvmGOLleU';
const PROJECT_REF = 'rwlzdoppepdfvmcravba';

const sql = readFileSync('supabase/migrations/20241202000001_create_looking_for_posts.sql', 'utf8');

// Try Supabase pg-meta API (available on self-hosted, sometimes on cloud)
const res = await fetch(`https://${PROJECT_REF}.supabase.co/pg/query`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'apikey': SERVICE_KEY,
  },
  body: JSON.stringify({ query: sql }),
});

const text = await res.text();
console.log('Status:', res.status);
console.log('Response:', text);

if (!res.ok) {
  // Try the management API format
  const res2 = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  console.log('\nManagement API status:', res2.status);
  console.log('Management API response:', await res2.text());
}
