import { TouchableOpacity, Text } from "react-native";
import { authButtonStyles as styles } from "../../styles/components/(auth)/authButton";

type AuthButtonProps = {
  text: string;
  color: string;
  textColor: string;
  borderColor: string;
  onPress: () => void;
};
export const AuthButton = ({
  text,
  color,
  textColor,
  borderColor,
  onPress,
}: AuthButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, borderColor: borderColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};
