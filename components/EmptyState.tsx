/**
 * EmptyState - Placeholder shown when a list has no tasks
 * 
 * Displays an image, title, and message to guide the user.
 * Used across different views (My Day, custom lists, search).
 */

import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
// Fix: replace inline styles import with:
import { emptyStateStyles as styles } from "../styles/components/EmptyState";
// then remove the local StyleSheet.create block

interface EmptyStateProps {
  title: string;
  message: string;
}
const Placeholder = require("assets/empty.png")

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Image source={Placeholder} style={styles.image}/>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};



export default EmptyState;
