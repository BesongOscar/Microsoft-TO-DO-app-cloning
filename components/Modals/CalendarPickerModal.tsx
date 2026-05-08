/**
 * CalendarPickerModal - Date and time selection modal
 * 
 * Custom calendar with month navigation, day selection, and optional
 * time picker. Returns YYYY-MM-DD date and optional HH:MM time.
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import { CalendarPickerModalStyles as styles } from "../../styles/modals/calendarPickerModal";
import TimePicker from "../TimePicker";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

interface CalendarPickerModalProps {
  visible: boolean;
  currentDate: string | undefined;
  currentTime: string | undefined;
  onSelect: (date: string | undefined, time?: string | undefined) => void;
  onClose: () => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarPickerModal: React.FC<CalendarPickerModalProps> = ({
  visible,
  currentDate,
  currentTime,
  onSelect,
  onClose,
}) => {
  const today = new Date();
  const initialDate = currentDate ? new Date(currentDate) : today;
  const [viewDate, setViewDate] = useState<Date>(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    currentDate ? new Date(currentDate) : null,
  );
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [timeManuallySet, setTimeManuallySet] = useState<boolean>(!!currentTime);
  const [selectedHour, setSelectedHour] = useState<number>(
    currentTime ? parseInt(currentTime.split(":")[0], 10) : 12,
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    currentTime ? parseInt(currentTime.split(":")[1], 10) : 0,
  );

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    // Add previous month's trailing days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const isToday = dateObj.toDateString() === today.toDateString();
      const isSelected = selectedDate
        ? dateObj.toDateString() === selectedDate.toDateString()
        : false;
      days.push({
        date: dateObj,
        isCurrentMonth: true,
        isToday,
        isSelected,
      });
    }

    // Add next month's leading days to fill the grid (up to 42 total)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    return days;
  };

  const goToPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;
    setSelectedDate(day.date);
  };

  // Time picker handling
  const handleTimeChange = (hour: number, minute: number) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setTimeManuallySet(true);
    setShowTimePicker(false);
  };

  // Clear time component but keep date
  const handleSave = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const timeStr = timeManuallySet
        ? `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`
        : undefined;
      onSelect(dateStr, timeStr);
    } else {
      onSelect(undefined);
    }
    onClose();
  };

  // Clear date and time
  const handleClear = () => {
    setSelectedDate(null);
    setTimeManuallySet(false);
    onSelect(undefined);
    onClose();
  };

  // Remove time but keep date
  const handleRemoveTime = () => {
    setTimeManuallySet(false);
  };

  const days = getDaysInMonth(viewDate);
  const hasTime = timeManuallySet;

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
          <Text style={styles.title}>Select Date</Text>

          {/* Calendar */}
          <View style={styles.calendarContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={goToPrevMonth}
                style={styles.navButton}
              >
                <Text style={styles.navText}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthYear}>
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </Text>
              <TouchableOpacity
                onPress={goToNextMonth}
                style={styles.navButton}
              >
                <Text style={styles.navText}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.daysHeader}>
              {DAYS.map((day) => (
                <View key={day} style={styles.dayHeader}>
                  <Text style={styles.dayHeaderText}>{day}</Text>
                </View>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    !day.isCurrentMonth && styles.dayCellOtherMonth,
                    day.isToday && styles.dayCellToday,
                    day.isSelected && styles.dayCellSelected,
                  ]}
                  onPress={() => handleSelectDate(day)}
                  disabled={!day.isCurrentMonth}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !day.isCurrentMonth && styles.dayTextOtherMonth,
                      day.isToday && styles.dayTextToday,
                      day.isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {day.date.getDate()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Time Picker Section */}
          {selectedDate && (
            <View style={styles.timeSection}>
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Time</Text>
                {hasTime ? (
                  <TouchableOpacity
                    style={styles.timeDisplay}
                    onPress={() => setShowTimePicker(!showTimePicker)}
                  >
                    <Text style={styles.timeText}>
                      {`${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`}
                    </Text>
                    <TouchableOpacity onPress={handleRemoveTime}>
                      <Text style={styles.removeTimeText}>Remove</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.setTimeButton}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.setTimeText}>Set time</Text>
                  </TouchableOpacity>
                )}
              </View>

              {showTimePicker && (
                <View style={styles.timePickerContainer}>
                  <TimePicker
                    value={new Date(0, 0, 0, selectedHour, selectedMinute)}
                    onChange={handleTimeChange}
                  />
                </View>
              )}
            </View>
          )}

          {/* Preview */}
          {selectedDate && (
            <View style={styles.preview}>
              <Text style={styles.previewLabel}>Selected:</Text>
              <Text style={styles.previewDate}>
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {hasTime &&
                  ` at ${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`}
              </Text>
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};


export default CalendarPickerModal;
