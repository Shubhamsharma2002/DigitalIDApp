import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
export default function PassesList() {
  const router = useRouter();
  const { user } = useUser();
  // Real app mein yahan useState([]) aur useEffect se fetch hoga

  const dummyPasses = [
    {
      id: "EV-101",
      title: "Annual Meeting",
      org: "Tech Corp",
      date: "12 May",
      color: ["#6a11cb", "#2575fc"],
    },
    {
      id: "EV-102",
      title: "Product Launch",
      org: "Innovate Ltd",
      date: "20 June",
      color: ["#ff0844", "#ffb199"],
    },
    {
      id: "EV-103",
      title: "Dev Conference",
      org: "Code Hub",
      date: "05 July",
      color: ["#00cdac", "#02aab0"],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-4">
        <Text className="text-3xl font-bold text-slate-900 mb-2">
          My Passes
        </Text>
        <Text className="text-slate-500 mb-8">Events you have joined</Text>

        {dummyPasses.map((pass) => (
          <Pressable
            key={pass.id}
            onPress={() => router.push(`/passes/[id]`)}
            className="mb-5 active:scale-[0.98]"
          >
            <LinearGradient
              colors={["#6a11cb", "#2575fc"] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="p-6 rounded-[35px] shadow-lg flex-row justify-between items-center"
            >
              <View className="flex-1">
                <Text className="text-white/70 font-bold uppercase text-[10px] tracking-widest">
                  Joined Event
                </Text>
                <Text className="text-white text-2xl font-bold mt-1">
                  {pass.title}
                </Text>
                <Text className="text-white/90 text-sm mt-1">
                  {pass.org} • {pass.date}
                </Text>
              </View>
              <View className="bg-white/20 p-4 rounded-2xl">
                <Ionicons name="ticket" size={28} color="white" />
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
