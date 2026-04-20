import { StyleSheet } from "react-native";
import { fontReg, fontSemi, fontBold } from "../common";

export const emailVerfificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  iconCircle: {
    backgroundColor: "#0078d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    fontFamily: fontBold,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 30,
    fontFamily: fontReg,
  },
  resendRow: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 10,
  },
  resendText: {
    color: "#999",
    fontFamily: fontReg,
  },
  resendLink: {
    fontFamily: fontReg,
    color: "#0078d4",
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    padding: 10,
  },
  otpContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#0078d4",
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontSemi,
  },
  button: {
    marginTop: 15,
  },
});
