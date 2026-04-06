import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";

interface NoteModalProps {
  visible: boolean;
  currentNote: string | undefined;
  onSave: (note: string) => void;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  visible,
  currentNote,
  onSave,
  onClose,
}) => {
  const [noteText, setNoteText] = useState<string>(currentNote || "");

  const handleSave = () => {
    onSave(noteText.trim());
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.sheet}
          activeOpacity={1}
          onPress={() => {}}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>Add Note</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Add a note..."
              placeholderTextColor="#8a8886"
              value={noteText}
              onChangeText={setNoteText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus
            />
          </View>

          {noteText.length > 0 && (
            <Text style={styles.charCount}>{noteText.length} characters</Text>
          )}

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                !noteText.trim() && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={!noteText.trim()}
            >
              <Text
                style={[
                  styles.saveText,
                  !noteText.trim() && styles.saveTextDisabled,
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 34,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#d1d0cd",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#323130",
    textAlign: "center",
    marginBottom: 16,
  },
  inputContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e1dfdd",
    borderRadius: 8,
    backgroundColor: "#faf9f8",
  },
  textInput: {
    fontSize: 16,
    color: "#323130",
    padding: 16,
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: "#8a8886",
    textAlign: "right",
    marginTop: 8,
    marginRight: 20,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#f3f2f1",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#605e5c",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#0078d4",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#e1e5e9",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  saveTextDisabled: {
    color: "#8a8886",
  },
});

export default NoteModal;
