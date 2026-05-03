import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* --- Background Decorative Circles --- */}
      {/* Top Right Circle */}
      <View
        style={{
          width: 300,
          height: 300,
          borderRadius: 150,
          top: -100,
          right: -100,
        }}
        className="absolute bg-blue-50 opacity-50"
      />
      {/* Bottom Left Circle */}
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          bottom: -50,
          left: -50,
        }}
        className="absolute bg-purple-50 opacity-40"
      />

      <View className="px-6 pt-10 z-10">
        <Text className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
          Digital Wallet
        </Text>
        <Text className="text-slate-500 mb-10 text-base">
          Manage your secure assets
        </Text>

        {/* --- Access ID Card Button --- */}
        <Pressable
          onPress={() => router.push("/Id-list")}
          className="active:scale-[0.98] transition-transform mb-6"
        >
          <LinearGradient
            colors={["#4facfe", "#00f2fe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-row items-center p-7 rounded-[40px] shadow shadow-blue-300"
          >
            {/* Circular Icon Wrapper */}
            <View className="bg-white/30 w-16 h-16 rounded-full items-center justify-center mr-5">
              <Ionicons name="id-card-outline" size={32} color="white" />
            </View>
            <View>
              <Text className="text-white text-xl font-bold">ID Card</Text>
              <Text className="text-white/80 text-sm">View Identity</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* --- Event Passes Button --- */}
        <Pressable
          onPress={() => router.push("/(tabs)/passes")}
          className="active:scale-[0.98] transition-transform"
        >
          <LinearGradient
            colors={["#6a11cb", "#2575fc"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-row items-center p-7 rounded-[40px] shadow shadow-purple-300"
          >
            {/* Circular Icon Wrapper */}
            <View className="bg-white/30 w-16 h-16 rounded-full items-center justify-center mr-5">
              <Ionicons name="ticket-outline" size={32} color="white" />
            </View>
            <View>
              <Text className="text-white text-xl font-bold">Event Passes</Text>
              <Text className="text-white/80 text-sm">Check Tickets</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
