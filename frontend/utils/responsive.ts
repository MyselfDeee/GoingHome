import { useWindowDimensions } from 'react-native';

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 0,        // Extra small phones (< 340px)
  sm: 340,      // Small phones (340px - 480px)
  md: 480,      // Medium phones (480px - 768px)
  lg: 768,      // Tablets / Large phones (768px - 1024px)
  xl: 1024,     // Large tablets (1024px - 1280px)
  '2xl': 1280,  // Extra large / Desktop (>= 1280px)
};

export interface ResponsiveDimensions {
  width: number;
  height: number;
  isXsOnly: boolean;
  isSmOnly: boolean;
  isMdOnly: boolean;
  isLgOnly: boolean;
  isXlOnly: boolean;
  is2xlOnly: boolean;
  isSmallPhone: boolean;        // < 480px
  isMediumPhone: boolean;       // 480px - 768px
  isLargePhone: boolean;        // > 768px
  isTabletOrLarger: boolean;    // >= 768px
  isPortrait: boolean;
  isLandscape: boolean;
}

/**
 * Custom hook to get responsive dimensions and breakpoint info
 */
export const useResponsive = (): ResponsiveDimensions => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const isLandscape = width > height;

  return {
    width,
    height,
    isXsOnly: width < BREAKPOINTS.sm,
    isSmOnly: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md,
    isMdOnly: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isLgOnly: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
    isXlOnly: width >= BREAKPOINTS.xl && width < BREAKPOINTS['2xl'],
    is2xlOnly: width >= BREAKPOINTS['2xl'],
    isSmallPhone: width < BREAKPOINTS.md,
    isMediumPhone: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isLargePhone: width > BREAKPOINTS.lg,
    isTabletOrLarger: width >= BREAKPOINTS.lg,
    isPortrait,
    isLandscape,
  };
};

/**
 * Responsive font size scaling
 * Scales text based on device width for better readability
 */
export const getResponsiveFontSize = (baseSize: number, width: number): number => {
  if (width < BREAKPOINTS.sm) return baseSize * 0.85;      // Extra small: 85%
  if (width < BREAKPOINTS.md) return baseSize * 0.9;       // Small: 90%
  if (width < BREAKPOINTS.lg) return baseSize;             // Medium: 100%
  if (width < BREAKPOINTS.xl) return baseSize * 1.05;      // Large: 105%
  return baseSize * 1.1;                                    // Extra large: 110%
};

/**
 * Responsive padding/margin based on device size
 */
export const getResponsiveSpacing = (baseValue: number, width: number): number => {
  if (width < BREAKPOINTS.sm) return Math.floor(baseValue * 0.6);
  if (width < BREAKPOINTS.md) return Math.floor(baseValue * 0.8);
  if (width < BREAKPOINTS.lg) return baseValue;
  return Math.floor(baseValue * 1.2);
};

/**
 * Get responsive gap between items
 */
export const getResponsiveGap = (baseGap: number, width: number): number => {
  if (width < BREAKPOINTS.sm) return Math.floor(baseGap * 0.5);
  if (width < BREAKPOINTS.md) return Math.floor(baseGap * 0.75);
  if (width < BREAKPOINTS.lg) return baseGap;
  return Math.floor(baseGap * 1.15);
};

/**
 * Determine number of columns for grid layouts
 */
export const getGridColumns = (width: number): number => {
  if (width < BREAKPOINTS.sm) return 1;
  if (width < BREAKPOINTS.md) return 1;
  if (width < BREAKPOINTS.lg) return 2;
  if (width < BREAKPOINTS.xl) return 3;
  return 4;
};

/**
 * Get button padding based on screen size
 */
export const getResponsiveButtonPadding = (width: number) => {
  if (width < BREAKPOINTS.sm) return { paddingVertical: 10, paddingHorizontal: 12 };
  if (width < BREAKPOINTS.md) return { paddingVertical: 10, paddingHorizontal: 14 };
  if (width < BREAKPOINTS.lg) return { paddingVertical: 12, paddingHorizontal: 16 };
  return { paddingVertical: 14, paddingHorizontal: 20 };
};

/**
 * Get minimum touch target size (Apple recommends 44x44, Google 48x48)
 */
export const MIN_TOUCH_TARGET = 48;

/**
 * Get icon size based on context
 */
export const getIconSize = (context: 'small' | 'medium' | 'large', width: number): number => {
  const isSmallPhone = width < BREAKPOINTS.md;
  
  switch (context) {
    case 'small':
      return isSmallPhone ? 18 : 20;
    case 'medium':
      return isSmallPhone ? 24 : 28;
    case 'large':
      return isSmallPhone ? 32 : 40;
    default:
      return 24;
  }
};
