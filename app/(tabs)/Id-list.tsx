import { styled } from "nativewind";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const SafeAreaView = styled(RNSafeAreaView);
export default function IdList() {
  const router = useRouter();
  const { user } = useUser();

  // Backend se fetch hone wala dummy data
  const myIDs = [
    {
      id: "ID-501",
      org: "Tech Corp",
      role: "Senior Developer",
      issuedBy: "HR Department",
    },
    {
      id: "ID-902",
      org: "Power Gym",
      role: "Gold Member",
      issuedBy: "Gym Management",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-4">
        <Text className="text-3xl font-bold text-slate-900 mb-2">
          Digital IDs
        </Text>
        <Text className="text-slate-500 mb-8">
          Select an identity to view details
        </Text>

        {myIDs.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(`/id/[id]`)}
            className="mb-4 bg-slate-50 border border-slate-100 p-5 rounded-[30px] flex-row items-center shadow-sm"
          >
            <View className="bg-blue-100 w-14 h-14 rounded-2xl items-center justify-center mr-4">
              <Ionicons name="card-outline" size={28} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-900 text-lg font-bold">
                {item.org}
              </Text>
              <Text className="text-slate-400 text-sm">{item.role}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
