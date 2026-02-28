import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

interface DetailOptionProps {
  icon: string;
  text: string;
}

const DetailOption: React.FC<DetailOptionProps> = ({ icon, text }) => {
  return (
    <TouchableOpacity style={styles.detailOption}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DetailOption;
