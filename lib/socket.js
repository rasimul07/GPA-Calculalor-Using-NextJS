export function getIO() {
  return globalThis.io || null;
}

export function emitPremiumUnlocked(userId) {
  const io = getIO();
  if (!io) return;
  io.to(`user:${userId}`).emit('premium:unlocked', { at: Date.now() });
}
