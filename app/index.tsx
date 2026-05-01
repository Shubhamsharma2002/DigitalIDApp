import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>

      <Link
        href="/(auth)/sign-in"
        className="mt-6 rounded-xl bg-primary text-white px-8 py-4 "
      >
        Go to Login
      </Link>
      <Link
        href="/(auth)/sign-up"
        className="mt-6 rounded-xl bg-primary text-white px-8 py-4 "
      >
        Go to signup
      </Link>

      <Link
        href="/(tabs)"
        className="mt-6 rounded-xl bg-primary text-white px-8 py-4 "
      >
        dash
      </Link>
    </View>
  );
}
