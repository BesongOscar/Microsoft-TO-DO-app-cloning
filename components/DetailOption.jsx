import {Text, TouchableOpacity} from 'react-native'
import React from 'react';
import styles from "../styles/styles";

const DetailOption = ({ icon, text }) => {
  return (
    <TouchableOpacity style={styles.detailOption}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DetailOption;
