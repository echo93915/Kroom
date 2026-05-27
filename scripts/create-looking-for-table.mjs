import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rwlzdoppepdfvmcravba.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bHpkb3BwZXBkZnZtY3JhdmJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgwMTE0NCwiZXhwIjoyMDk1Mzc3MTQ0fQ.UJPjOKNKyDemzPI51TRRMOlPNJwhitGVczsvmGOLleU'
);

// Test insert to verify the table exists
const { error } = await supabase.from('looking_for_posts').select('id').limit(1);

if (error && error.code === '42P01') {
  console.log('Table does not exist. Please run the following SQL in your Supabase dashboard SQL editor:');
  console.log('https://supabase.com/dashboard/project/rwlzdoppepdfvmcravba/sql/new');
  console.log('\n--- SQL to run ---\n');
  const fs = await import('fs');
  console.log(fs.readFileSync('supabase/migrations/20241202000001_create_looking_for_posts.sql', 'utf8'));
} else if (error) {
  console.error('Unexpected error:', error.message);
} else {
  console.log('Table already exists and is accessible.');
}
