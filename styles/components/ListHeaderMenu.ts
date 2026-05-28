import { StyleSheet } from "react-native";
import { fontReg, fontSemi, androidPoppinsExtras } from "../common";
import type { Theme } from "../theme";

export const createListHeaderMenuStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.35)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      paddingBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 16,
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.border,
      alignSelf: "center",
      marginTop: 8,
      marginBottom: 4,
    },
    sectionTitle: {
      fontSize: 13,
      color: theme.textMuted,
      fontFamily: fontSemi,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginLeft: 20,
      marginTop: 16,
      marginBottom: 4,
      ...androidPoppinsExtras,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    menuIcon: {
      marginRight: 14,
      width: 22,
      textAlign: "center",
    },
    menuItemText: {
      fontSize: 15,
      color: theme.text,
      fontFamily: fontReg,
      flex: 1,
      ...androidPoppinsExtras,
    },
    menuItemDestructive: {
      color: theme.error,
    },
    checkmark: {
      fontSize: 16,
      color: theme.primary,
      marginLeft: "auto",
      fontWeight: "bold",
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginHorizontal: 20,
      marginVertical: 4,
    },
    cancelButton: {
      paddingVertical: 16,
      marginHorizontal: 20,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      alignItems: "center",
    },
    cancelText: {
      fontSize: 15,
      color: theme.textSecondary,
      fontFamily: fontSemi,
      ...androidPoppinsExtras,
    },
  });
