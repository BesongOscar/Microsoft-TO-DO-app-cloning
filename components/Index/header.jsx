import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/styles';

const Header = ({ onMenuPress, onSearchPress, onProfilePress }) => {
  return (
    <View style={styles.topHeader}>
      {/* Left side: Menu + App Title */}
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>To Do</Text>
      </View>

      {/* Right side: Search + Profile */}
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onProfilePress}>
          <Ionicons name="person-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
