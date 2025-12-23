// Client-side only: use window.location.origin
// Export as a function to ensure it's evaluated at runtime, not module load time
export const getSelf = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR/build time (shouldn't happen in client-only app, but just in case)
  return 'https://www.kernel.community';
};

// Default export for backward compatibility
const self = typeof window !== 'undefined' ? window.location.origin : 'https://www.kernel.community';

export default self;
