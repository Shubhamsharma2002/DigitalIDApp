import { icons } from "@/constants/icons";
import { useSignIn } from "@clerk/expo";
import { Link, useRouter, type Href } from "expo-router";
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

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // Validation
  const emailValid =
    emailAddress.length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  const formValid =
    emailAddress.length > 0 && password.length > 0 && emailValid;

  const handleSubmit = async () => {
    if (!formValid) return;
    const { error } = await signIn.password({ emailAddress, password });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/(tabs)");
          router.replace(url.startsWith("http") ? "/(tabs)" : (url as Href));
        },
      });
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/(tabs)");
          router.replace("/(tabs)" as Href);
        },
      });
    }
  };

  // UI for OTP/Verification
  if (
    signIn.status === "needs_second_factor" ||
    signIn.status === "needs_client_trust"
  ) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-8 justify-center">
          <Text className="text-3xl font-bold text-slate-900 mb-2">
            Verify Identity
          </Text>
          <Text className="text-slate-500 mb-8">
            Enter the code sent to your email
          </Text>

          <TextInput
            className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-center text-2xl tracking-widest focus:border-blue-500"
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Pressable
            onPress={handleVerify}
            className={`h-16 rounded-2xl justify-center items-center mt-6 ${code.length === 6 ? "bg-blue-600" : "bg-slate-300"}`}
          >
            <Text className="text-white font-bold text-lg uppercase">
              Verify
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
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
              <Text className="text-4xl font-bold text-slate-900 tracking-tight">
                Digital ID
              </Text>
              <Text className="text-slate-500 mt-2 text-center">
                Sign in to your secure digital wallet
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
                  Email Address
                </Text>
                <TextInput
                  className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your email"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View className="mt-4">
                <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
                  Password
                </Text>
                <TextInput
                  className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Pressable
                onPress={handleSubmit}
                disabled={!formValid || fetchStatus === "fetching"}
                className={`h-16 rounded-2xl justify-center items-center mt-8 shadow-lg ${formValid ? "bg-blue-600 shadow-blue-300" : "bg-slate-400"}`}
              >
                <Text className="text-white font-bold text-lg uppercase">
                  {fetchStatus === "fetching" ? "Signing In..." : "Sign In"}
                </Text>
              </Pressable>

              <View className="flex-row justify-center mt-6">
                <Text className="text-slate-500 text-base">New user? </Text>
                <Link href="/sign-up" asChild>
                  <Pressable>
                    <Text className="text-blue-600 font-bold text-base">
                      Create Account
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
