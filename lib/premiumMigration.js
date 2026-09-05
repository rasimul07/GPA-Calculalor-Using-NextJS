import User from '@/lib/models/User';

let migrationRan = false;

export async function runGrandfatherMigration() {
  if (migrationRan) return;
  migrationRan = true;

  try {
    await User.updateMany(
      { 'credits.0': { $exists: true }, isPremium: { $ne: true } },
      { $set: { isPremium: true, premiumActivatedAt: new Date() } }
    );
  } catch (error) {
    console.error('Grandfather premium migration error:', error);
  }
}
