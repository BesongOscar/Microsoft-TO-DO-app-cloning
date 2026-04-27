import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { arrowBackStyles as styles } from "styles/components/arrowBack";

export default function ArrowBack() {
  const router = useRouter();
  return (
    <View style={styles.ButtonContainer}>
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" color={"#fff"} size={25} />
      </TouchableOpacity>
    </View>
  );
}
