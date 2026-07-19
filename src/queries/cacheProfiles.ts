// Cache profiles by data volatility. Pick the profile that matches how often
// the data actually changes, not how important it feels.
export const cacheProfiles = {
  /** Reference data that effectively never changes while the app is open. */
  static: {
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  },
  /** Stable data that may change a few times a day. */
  long: {
    staleTime: 60 * 60 * 1000, // 1h
    gcTime: 24 * 60 * 60 * 1000, // 24h
  },
  /** Semi-volatile lists. */
  medium: {
    staleTime: 5 * 60 * 1000, // 5min
    gcTime: 60 * 60 * 1000, // 1h
  },
  /** Frequently changing data. */
  short: {
    staleTime: 30 * 1000, // 30s
    gcTime: 5 * 60 * 1000, // 5min
  },
} as const;
