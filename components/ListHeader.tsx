import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

interface ListHeaderProps {
  title: string;
  date: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ title, date }) => {
  return (
    <View style={styles.listHeader}>
      <View style={styles.listTitleSection}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listDate}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.moreOptionsButton}>
        <Text style={styles.moreOptionsIcon}>⋯</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeader;
