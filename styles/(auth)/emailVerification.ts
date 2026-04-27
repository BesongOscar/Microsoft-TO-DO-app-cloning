import { StyleSheet } from "react-native";
import {
  fontReg,
  fontSemi,
  fontBold,
  androidPoppinsExtras,
} from "../common";

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
    ...androidPoppinsExtras,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 30,
    fontFamily: fontReg,
    ...androidPoppinsExtras,
  },
  emailHighlight: {
    fontFamily: fontSemi,
    color: "#333",
    ...androidPoppinsExtras,
  },
  resendRow: {
    marginTop: 28,
    alignItems: "center",
    alignSelf: "center",
  },
  resendText: {
    color: "#999",
    fontFamily: fontReg,
    ...androidPoppinsExtras,
  },
  resendLink: {
    fontFamily: fontReg,
    color: "#0078d4",
    fontWeight: "600",
    ...androidPoppinsExtras,
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
    ...androidPoppinsExtras,
  },
  secondaryButton: {
    width: "100%",
    marginTop: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#0078d4",
    backgroundColor: "#fff",
  },
  secondaryButtonText: {
    color: "#0078d4",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fontSemi,
    ...androidPoppinsExtras,
  },
  signOutLink: {
    color: "#999",
    fontSize: 14,
    fontFamily: fontReg,
    textDecorationLine: "underline",
    ...androidPoppinsExtras,
  },
  button: {
    marginTop: 15,
  },
});
