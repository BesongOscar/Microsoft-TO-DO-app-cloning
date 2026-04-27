import { Platform, TextStyle } from "react-native";

export const fontReg = "Poppins-Regular";
export const fontSemi = "Poppins-SemiBold";
export const fontBold = "Poppins-Bold";

/**
 * Android often ignores bundled fonts when `fontWeight` tries to pick a synthetic
 * weight instead of the loaded Poppins file. Spread this last on any style that sets
 * `fontFamily` to one of the Poppins names above.
 */
export const androidPoppinsExtras: TextStyle =
  Platform.OS === "android" ? { fontWeight: "normal" } : {};

export const colors = {
  primary: "#0078d4",
  white: "#ffffff",
  background: "#f8f9fa",
  text: "#323130",
  textSecondary: "#605e5c",
  textMuted: "#8a8886",
  border: "#e1e5e9",
  success: "#107c10",
  error: "#d13438",
  warning: "#ffb900",
};
