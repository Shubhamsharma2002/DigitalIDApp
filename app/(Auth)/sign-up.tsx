import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-8 pt-12 pb-10">
            <View className="items-center mt-6 mb-12">
              <Image
                source={icons.Applogo}
                className="w-24 h-24 mb-4"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-slate-900 tracking-tight">
                Create Account
              </Text>
              <Text className="text-slate-500 mt-2 text-center">
                Manage your documents safely
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
                  Email Address
                </Text>
                <TextInput
                  className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base focus:border-blue-500 focus:bg-white"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <View className="mt-4">
                <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
                  Password
                </Text>
                <TextInput
                  className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base focus:border-blue-500 focus:bg-white"
                  placeholder="Minimum 8 characters"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Pressable className="bg-blue-600 h-16 rounded-2xl justify-center items-center mt-8 shadow-lg shadow-blue-300">
                <Text className="text-white font-bold text-lg uppercase">
                  Get Started
                </Text>
              </Pressable>

              {/* Action Link Right After Button */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-slate-500 text-base">
                  Already have an account?{" "}
                </Text>
                <Link href="/(auth)/sign-in" asChild>
                  <Pressable>
                    <Text className="text-blue-600 font-bold text-base">
                      Sign In
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
