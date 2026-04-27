import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export const AuthLoadingScreen: React.FC = () => (
  <>
    <StatusBar style="dark" backgroundColor="#ffffff" />
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0078d4" />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
