import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import suggestionsBannerStyles from "../styles/styles";

const SuggestionsBanner = ({ message, onClose }) => {
  return (
    <View style={suggestionsBannerStyles.suggestionsBanner}>
      <View style={suggestionsBannerStyles.suggestionsLeft}>
        <Text style={suggestionsBannerStyles.suggestionsIcon}>💡</Text>
        <Text style={suggestionsBannerStyles.suggestionsText}>{message}</Text>
      </View>

      <TouchableOpacity
        style={suggestionsBannerStyles.suggestionsCloseButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Text style={suggestionsBannerStyles.suggestionsCloseText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuggestionsBanner;

