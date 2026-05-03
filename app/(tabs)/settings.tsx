import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useAuth();

  // States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState(user?.fullName || "");

  // Update Name Logic
  const handleUpdateName = async () => {
    if (!newName.trim()) return Alert.alert("Wait", "Name cannot be empty!");

    try {
      const firstName = newName.split(" ")[0];
      const lastName = newName.split(" ").slice(1).join(" ");

      await user?.update({
        firstName: firstName,
        lastName: lastName || "",
      });

      setIsModalVisible(false);
      Alert.alert("Success ✅", "Name updated successfully!");
    } catch (err) {
      Alert.alert("Error ❌", "Failed to update name.");
    }
  };

  // Password Reset Logic
  const handlePasswordReset = () => {
    Alert.alert(
      "Reset Password",
      "We will send a reset link to your email. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Link",
          onPress: () => Alert.alert("Sent!", "Check your email inbox."),
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-10">
        <View className="items-center">
          {/* Profile Pic Section */}
          <View className="relative mb-6">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-32 h-32 rounded-full border-2 border-slate-100"
            />
            <View className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white">
              <Ionicons name="camera" size={18} color="white" />
            </View>
          </View>

          {/* User Info */}
          <Text className="text-2xl font-bold text-slate-900">
            {user?.fullName}
          </Text>
          <Text className="text-slate-500 mb-10">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>

          {/* --- Options --- */}
          <View className="w-full">
            {/* Update Name Button */}
            <Pressable
              onPress={() => setIsModalVisible(true)}
              className="bg-slate-50 p-5 rounded-[30px] flex-row justify-between items-center mb-5 border border-slate-100"
            >
              <Text className="font-semibold text-slate-700">Update Name</Text>
              <Ionicons name="create-outline" size={20} color="#64748b" />
            </Pressable>

            {/* Password Button */}
            <Pressable
              onPress={handlePasswordReset}
              className="bg-slate-50 p-5 rounded-[30px] flex-row justify-between items-center mb-10 border border-slate-100"
            >
              <Text className="font-semibold text-slate-700">
                Change Password
              </Text>
              <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
            </Pressable>

            {/* Logout */}
            <Pressable
              onPress={() => signOut()}
              className="bg-red-50 p-5 rounded-[30px] flex-row justify-between items-center"
            >
              <Text className="font-bold text-red-600">Sign Out</Text>
              <Ionicons name="log-out-outline" size={20} color="#dc2626" />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* --- Name Update Modal (Missing Part) --- */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-8 rounded-t-[40px] shadow-xl">
            <Text className="text-xl font-bold mb-4 text-slate-900">
              Update Your Name
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Full Name"
              className="bg-slate-100 p-5 rounded-2xl mb-6 text-lg border border-slate-200"
            />
            <View className="flex-row space-x-4">
              <Pressable
                onPress={() => setIsModalVisible(false)}
                className="flex-1 bg-slate-100 p-4 rounded-2xl items-center"
              >
                <Text className="font-bold text-slate-500">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleUpdateName}
                className="flex-1 bg-blue-600 p-4 rounded-2xl items-center shadow-md shadow-blue-300"
              >
                <Text className="text-white font-bold">Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
