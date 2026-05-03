import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
export default function PassDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // In production, fetch specific event data using this 'id'
  const eventDetails = {
    title: "Annual Meeting 2024",
    venue: "Corporate Building A, Hall 4",
    time: "10:00 AM - 04:00 PM",
    organizer: "Tech Corp Human Resources",
    accessLevel: "Full Access + Lunch",
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Custom Header */}
      <View className="px-6 py-4 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="p-2 bg-white rounded-full shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-slate-800">
          Pass Details
        </Text>
      </View>

      <ScrollView className="px-6 pt-4">
        {/* Pass Visual Component */}
        <View className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-slate-100">
          <View className="items-center mb-6">
            <Text className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">
              Pass ID: {id}
            </Text>
            <Text className="text-2xl font-bold text-slate-900 text-center">
              {eventDetails.title}
            </Text>
          </View>

          {/* QR Code Section (Specific Data) */}
          <View className="items-center py-6 my-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <View className="bg-white p-4 rounded-2xl shadow-sm">
              <Ionicons name="qr-code" size={150} color="#1e293b" />
            </View>
            <Text className="mt-4 text-slate-400 font-medium">
              Scan for Entry
            </Text>
          </View>

          {/* Event Specific Info */}
          <View className="space-y-4 mt-4">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={20} color="#3b82f6" />
              <Text className="ml-3 text-slate-600 font-medium">
                {eventDetails.venue}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={20} color="#3b82f6" />
              <Text className="ml-3 text-slate-600 font-medium">
                {eventDetails.time}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#3b82f6"
              />
              <Text className="ml-3 text-slate-600 font-medium">
                Access: {eventDetails.accessLevel}
              </Text>
            </View>
          </View>
        </View>

        {/* Organizer Section */}
        <View className="bg-blue-600/5 p-6 rounded-3xl mt-6 border border-blue-100">
          <Text className="text-blue-800 font-bold mb-1">Organized By</Text>
          <Text className="text-blue-600">{eventDetails.organizer}</Text>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
