import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../styles/styles";
import { CustomList } from "../types";

const EMOJI_OPTIONS = [
  "📋", "🏠", "💼", "🎯", "📚", "🎮", "🎨", "🎵",
  "🏋️", "🛒", "💰", "✈️", "🍕", "💊", "📞", "🔧",
  "🌟", "❤️", "🔥", "💡", "📷", "🎬", "🏆", "🎁",
];

const COLOR_OPTIONS = [
  "#8764b8", "#00bcf2", "#0078d4", "#107c10",
  "#d83b01", "#5c2d91", "#e81123", "#ff8c00",
];

interface CustomListModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, icon: string, color: string) => void;
  onDelete?: () => void;
  initialData?: CustomList | null;
}

const CustomListModal: React.FC<CustomListModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(EMOJI_OPTIONS[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIcon(initialData.icon);
      setColor(initialData.color);
    } else {
      setName("");
      setIcon(EMOJI_OPTIONS[0]);
      setColor(COLOR_OPTIONS[0]);
    }
  }, [initialData, visible]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "List name is required");
      return;
    }
    onSave(name.trim(), icon, color);
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete List",
      "This will also delete all tasks in this list. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {initialData ? "Edit List" : "New List"}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.listPreview}>
              <Text style={styles.listPreviewIcon}>{icon}</Text>
              <Text style={styles.listPreviewName}>{name || "List Name"}</Text>
            </View>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.listNameInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter list name"
              placeholderTextColor="#8a8886"
              maxLength={50}
            />

            <Text style={styles.inputLabel}>Icon</Text>
            <View style={styles.emojiGrid}>
              {EMOJI_OPTIONS.map((emoji, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.emojiOption, icon === emoji && styles.emojiOptionSelected]}
                  onPress={() => setIcon(emoji)}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Color</Text>
            <View style={styles.colorRow}>
              {COLOR_OPTIONS.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c },
                    color === c && styles.colorCircleSelected,
                  ]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            {initialData && onDelete && (
              <TouchableOpacity style={styles.deleteListButton} onPress={handleDelete}>
                <Text style={styles.deleteListText}>Delete List</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomListModal;
