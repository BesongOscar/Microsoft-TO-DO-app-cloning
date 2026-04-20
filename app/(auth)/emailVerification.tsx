import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emailVerfificationStyles as styles } from "styles/(auth)/emailVerification";
import OTPInput from "@/components/(auth)/OTP_input";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function EmailVerification() {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width * 0.5, 140);
  const router = useRouter();
  const { user } = useAuth();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 4) {
      Alert.alert("Error", "Please enter the complete OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      // For now, accept any 4-digit OTP for demo
      // In production, this would validate against a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert("Success", "Email verified successfully!", [
        { text: "OK", onPress: () => router.push("/login") }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert("Success", "OTP has been resent to your email");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" color={"#000"} size={25} />
      </TouchableOpacity>
      
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.iconCircle,
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            },
          ]}
        >
          <Ionicons name="mail-open" size={imageSize * 0.4} color="#fff" />
        </View>
      </View>
      
      <Text style={styles.title}>Enter OTP Code</Text>
      <Text style={styles.subtitle}>
        We sent a 4-digit code to your email
      </Text>

      <View style={styles.otpContainer}>
        <OTPInput value={otp} onChange={setOtp} length={4} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0078d4" style={styles.button} />
      ) : (
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      )}

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn't get OTP?</Text>
        <TouchableOpacity onPress={handleResend} disabled={isResending}>
          {isResending ? (
            <ActivityIndicator size="small" color="#0078d4" />
          ) : (
            <Text style={styles.resendLink}> Resend OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}