import { StyleSheet } from "react-native";
import { fontReg, androidPoppinsExtras } from "../common";
import type { Theme } from "../theme";

export const createAddTaskInputStyles = (theme: Theme) => StyleSheet.create({
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginHorizontal: 12,
    marginVertical: 10,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.surfaceSecondary,
    borderRadius: 10,
  },
  addTaskButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    backgroundColor: theme.primary,
    alignItems: "center",
    marginRight: 5,
  },
  addTaskIcon: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
  },
  addTaskInput: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    paddingVertical: 0,
    fontFamily: fontReg,
    ...androidPoppinsExtras,
  },
});
