import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { detailOptionStyles as styles } from "../styles/components/DetailOption";

interface DetailOptionProps {
  icon: string;
  text: string;
  onPress?: () => void;
}

const DetailOption: React.FC<DetailOptionProps> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.detailOption} onPress={onPress}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DetailOption;
