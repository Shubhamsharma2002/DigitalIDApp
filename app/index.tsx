import image from "@/constants/image";
import { useAuth } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { styled } from "nativewind";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "../global.css";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const handleGetStarted = () => {
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-3 items-center justify-center rounded">
        <Image source={image.Logo} className="w-90 h-96" resizeMode="cover" />
      </View>

      <View className="flex-1 items-center justify-center px-8 mb-5">
        <TouchableOpacity
          onPress={handleGetStarted}
          activeOpacity={0.8}
          className="w-full bg-blue-500 py-4 rounded-full items-center"
        >
          <Text className="text-white font-bold text-xl">Get Started</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-center gap-10 pb-10">
        {[image.MadeInIndia, image.SkillIndia].map((img, index) => (
          <View
            key={index}
            className="w-20 h-20 rounded-full border border-gray-200 bg-white items-center justify-center overflow-hidden"
          >
            <Image source={img} className="w-14 h-14" resizeMode="contain" />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
