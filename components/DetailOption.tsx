import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface DetailOptionProps {
  icon: string;
  text: string;
  subText?: string;
  isActive?: boolean;
  onPress: () => void;
}

const DetailOption: React.FC<DetailOptionProps> = ({
  icon,
  text,
  subText,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.detailOption, isActive && styles.detailOptionActive]}
      onPress={onPress}
    >
      <Text style={styles.detailIcon}>{icon}</Text>
      <View style={styles.detailContent}>
        <Text style={[styles.detailText, isActive && styles.detailTextActive]}>
          {text}
        </Text>
        {subText && (
          <Text style={styles.detailSubText}>{subText}</Text>
        )}
      </View>
      {isActive && subText && (
        <Text style={styles.detailActiveIndicator}>✓</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f2f1",
  },
  detailOptionActive: {
    backgroundColor: "#f0f7ff",
  },
  detailIcon: {
    fontSize: 18,
    marginRight: 16,
    width: 24,
    textAlign: "center",
  },
  detailContent: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: "#323130",
  },
  detailTextActive: {
    color: "#0078d4",
    fontWeight: "500",
  },
  detailSubText: {
    fontSize: 12,
    color: "#605e5c",
    marginTop: 2,
  },
  detailActiveIndicator: {
    fontSize: 16,
    color: "#0078d4",
    marginLeft: 8,
  },
});

export default DetailOption;
