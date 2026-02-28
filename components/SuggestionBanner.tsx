import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";

interface SuggestionsBannerProps {
  message: string;
  onClose: () => void;
}

const SuggestionsBanner: React.FC<SuggestionsBannerProps> = ({ message, onClose }) => {
  return (
    <View style={styles.suggestionsBanner}>
      <View style={styles.suggestionsLeft}>
        <Text style={styles.suggestionsIcon}>💡</Text>
        <Text style={styles.suggestionsText}>{message}</Text>
      </View>

      <TouchableOpacity
        style={styles.suggestionsCloseButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Text style={styles.suggestionsCloseText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuggestionsBanner;
