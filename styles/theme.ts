/**
 * Theme - Light and dark color palettes
 * 
 * Defines the app's color tokens used by ThemeContext and useThemeStyles.
 * All style files should import { Theme } from here and reference theme
 * colors rather than hardcoded values.
 */

export const lightTheme = {
  background: '#f8f9fa',
  surface: '#ffffff',
  surfaceSecondary: '#f3f2f1',
  text: '#323130',
  textSecondary: '#605e5c',
  textMuted: '#8a8886',
  placeholderTextColor: '#8a8886',
  border: '#e1e5e9',
  primary: '#0078d4',
  error: '#d13438',
  success: '#107c10',
  headerBackground: '#0078d4',
  tabBarBackground: '#ffffff',
  inputBackground: '#f3f2f1',
  overlay: 'rgba(0,0,0,0.4)',
};

export const darkTheme = {
  background: '#1b1a19',
  surface: '#252423',
  surfaceSecondary: '#323130',
  text: '#f3f2f1',
  textSecondary: '#c8c6c4',
  textMuted: '#a19f9d',
  placeholderTextColor: '#a19f9d',
  border: '#484644',
  primary: '#2899f5',
  error: '#f1707b',
  success: '#6bb700',
  headerBackground: '#005a9e',
  tabBarBackground: '#252423',
  inputBackground: '#323130',
  overlay: 'rgba(0,0,0,0.6)',
};

export type Theme = typeof lightTheme;