import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function IdCardDetails() {
  const router = useRouter();
  const { user } = useUser();

  // In real app, fetch this specific data from your backend using the ID from localSearchParams
  const idData = {
    name: user?.fullName || "Name Name",
    role: "Senior Developer",
    empId: "ID 15000",
    displayId: "18 D12008",
    status: "Verified",
    issuedBy: "Tech Corp Global HR",
    validUntil: "Dec 2026",
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Custom Header with Back Button */}
      <View className="px-6 py-4 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="p-2 bg-white rounded-full shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-slate-800">
          Identity View
        </Text>
      </View>

      <ScrollView className="px-6 pb-10">
        {/* --- MAIN ID CARD (As per your image reference) --- */}
        <View className="bg-white rounded-[40px] p-6 shadow-xl shadow-slate-200 mt-4 border border-slate-50">
          <View className="flex-row items-center mb-6">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-20 h-20 rounded-2xl bg-slate-100"
            />
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-slate-900 leading-7">
                {idData.name}
              </Text>
              <Text className="text-slate-400 font-medium">{idData.role}</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-8">
            <Text className="text-blue-600 font-bold mr-2 tracking-tighter">
              CERTIFIED
            </Text>
            <Text className="text-slate-600 font-semibold">{idData.empId}</Text>
          </View>

          <View className="flex-row justify-between items-end">
            <View>
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                Employee ID
              </Text>
              <Text className="text-slate-900 text-xl font-bold">
                {idData.displayId}
              </Text>
            </View>

            {/* QR Code Section */}
            <View className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
              {/* Fixed TypeScript Icon Name */}
              <Ionicons name="qr-code-outline" size={64} color="#1e293b" />
            </View>
          </View>
        </View>

        {/* --- USAGE SECTION --- */}
        <View className="bg-white rounded-[30px] p-6 mt-6 border border-slate-100">
          <View className="flex-row items-center mb-4">
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#3b82f6"
            />
            <Text className="ml-2 text-slate-800 font-bold">
              How to use this ID?
            </Text>
          </View>
          <Text className="text-slate-500 text-sm leading-5">
            This ID is valid for office building entry and cafeteria payments.
            Scan the QR code at the reception desk for instant verification.
          </Text>

          <View className="mt-4 pt-4 border-t border-slate-50">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-1">
              Validity
            </Text>
            <Text className="text-green-600 font-bold">
              Expires: {idData.validUntil}
            </Text>
          </View>
        </View>

        {/* --- ACTION BUTTON --- */}
        <Pressable
          className="bg-blue-600 h-16 rounded-3xl justify-center items-center mt-6 mb-10 shadow-lg shadow-blue-200 active:opacity-90"
          onPress={() => console.log("Navigate to History")}
        >
          <Text className="text-white font-bold text-lg">Check-in History</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
