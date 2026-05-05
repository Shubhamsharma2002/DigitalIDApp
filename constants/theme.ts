export const colors = {
  background: "#fff9e3", // Tumhare CSS wala light cream background
  foreground: "#205ce8", // Primary blue for text
  card: "#fff8e7", // Slightly different for cards
  muted: "#f6eecf",
  mutedForeground: "rgba(0, 0, 0, 0.6)",
  primary: "#205ce8", // Digital ID ka signature blue
  accent: "#ea7a53", // Orange-ish accent
  border: "rgba(0, 0, 0, 0.1)",
  success: "#16a34a",
  destructive: "#dc2626",
  subscription: "#8fd1bd", // Greenish tint for plans
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
  40: 160,
  50: 200, // Balance card ke height ke liye (min-h-50)
} as const;

export const components = {
  tabBar: {
    height: 60, // height: spacing[18]
    horizontalInset: 25, // spacing[5] - Side se gap ke liye
    radius: 45, // spacing[8] - Rounded corners
    iconFrame: 40, // spacing[12] - Icon ka wrapper size
    itemPaddingVertical: 10, // spacing[2]
  },
} as const;

export const theme = {
  colors,
  spacing,
  components,
} as const;
