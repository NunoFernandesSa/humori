import { COLORS_PALETTE } from "./colors";

export const SPACING = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  screen: 20,
} as const;

export const RADII = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const TYPOGRAPHY = {
  eyebrow: {
    fontSize: 12,
    fontWeight: "800" as const,
    letterSpacing: 1.1,
    textTransform: "uppercase" as const,
  },
  titleLg: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800" as const,
    letterSpacing: -0.8,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  titleMd: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800" as const,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  bodyStrong: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700" as const,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
} as const;

export const SHADOWS = {
  card: {
    shadowColor: COLORS_PALETTE.ACCENT_2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  floating: {
    shadowColor: COLORS_PALETTE.ACCENT_2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;
