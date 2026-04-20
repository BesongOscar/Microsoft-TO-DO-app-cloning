import { StyleSheet } from "react-native";
import { fontReg } from "../../common";

export const authButtonStyles = StyleSheet.create({
 button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
    margin: 5,
    justifyContent: "center",
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,
    elevation: 1,
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 15,
    fontFamily: fontReg,
  },
});