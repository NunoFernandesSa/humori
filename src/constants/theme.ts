import { COLORS_PALETTE } from "./colors";

export const FONT_FAMILIES = {
  display: "Fredoka_700Bold",
  heading: "PlusJakartaSans_700Bold",
  headingExtraBold: "PlusJakartaSans_800ExtraBold",
  body: "PlusJakartaSans_500Medium",
  bodySemiBold: "PlusJakartaSans_600SemiBold",
} as const;

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
    fontFamily: FONT_FAMILIES.headingExtraBold,
    letterSpacing: 1.1,
    textTransform: "uppercase" as const,
  },
  titleLg: {
    fontFamily: FONT_FAMILIES.display,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.8,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  titleMd: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 22,
    lineHeight: 28,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  body: {
    fontFamily: FONT_FAMILIES.body,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  bodyStrong: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 14,
    lineHeight: 20,
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
