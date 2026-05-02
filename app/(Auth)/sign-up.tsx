// import { icons } from "@/constants/icons";
// import { Link } from "expo-router";
// import { styled } from "nativewind";
// import { useState } from "react";
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

// const SafeAreaView = styled(RNSafeAreaView);

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View className="flex-1 px-8 pt-12 pb-10">
//             <View className="items-center mt-6 mb-12">
//               <Image
//                 source={icons.Applogo}
//                 className="w-24 h-24 mb-4"
//                 resizeMode="contain"
//               />
//               <Text className="text-3xl font-bold text-slate-900 tracking-tight">
//                 Create Account
//               </Text>
//               <Text className="text-slate-500 mt-2 text-center">
//                 Manage your documents safely
//               </Text>
//             </View>

//             <View className="space-y-4">
//               <View>
//                 <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
//                   Email Address
//                 </Text>
//                 <TextInput
//                   className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base focus:border-blue-500 focus:bg-white"
//                   placeholder="name@example.com"
//                   value={email}
//                   onChangeText={setEmail}
//                   autoCapitalize="none"
//                 />
//               </View>

//               <View className="mt-4">
//                 <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
//                   Password
//                 </Text>
//                 <TextInput
//                   className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base focus:border-blue-500 focus:bg-white"
//                   placeholder="Minimum 8 characters"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={setPassword}
//                 />
//               </View>

//               <Pressable className="bg-blue-600 h-16 rounded-2xl justify-center items-center mt-8 shadow-lg shadow-blue-300">
//                 <Text className="text-white font-bold text-lg uppercase">
//                   Get Started
//                 </Text>
//               </Pressable>

//               {/* Action Link Right After Button */}
//               <View className="flex-row justify-center mt-6">
//                 <Text className="text-slate-500 text-base">
//                   Already have an account?{" "}
//                 </Text>
//                 <Link href="/(auth)/sign-in" asChild>
//                   <Pressable>
//                     <Text className="text-blue-600 font-bold text-base">
//                       Sign In
//                     </Text>
//                   </Pressable>
//                 </Link>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

import { icons } from "@/constants/icons";
import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import {
  ActivityIndicator,
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
// import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function SignUp() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      setCustomError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setCustomError("");

      const { error } = await signUp.password({
        emailAddress: email,
        password,
      });

      if (error) {
        setCustomError(
          error.longMessage || error.message || "Failed to create account",
        );
        return;
      }

      await signUp.verifications.sendEmailCode();
    } catch (err) {
      setCustomError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);

      await signUp.verifications.verifyEmailCode({
        code,
      });

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) return;

            const url = decorateUrl("/(tabs)");

            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.replace("/(tabs)");
            }
          },
        });
      }
    } catch (err: any) {
      setCustomError(
        err?.errors?.[0]?.longMessage || "Invalid verification code",
      );
    } finally {
      setLoading(false);
    }
  };

  // Verification Screen
  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address")
  ) {
    return (
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 px-8 justify-center">
            <View className="items-center mb-10">
              <Image
                source={icons.Applogo}
                className="w-24 h-24 mb-4"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-slate-900">
                Verify Email
              </Text>
              <Text className="text-slate-500 mt-2 text-center">
                Enter the verification code sent to your email
              </Text>
            </View>

            <TextInput
              className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base"
              placeholder="Enter verification code"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />

            {customError ? (
              <Text className="text-red-500 text-sm mt-3 text-center">
                {customError}
              </Text>
            ) : null}

            <Pressable
              onPress={handleVerify}
              disabled={loading}
              className={`h-16 rounded-2xl justify-center items-center mt-8 ${
                loading ? "bg-blue-400" : "bg-blue-600"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg uppercase">
                  Verify Account
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => signUp.verifications.sendEmailCode()}
              className="mt-4"
            >
              <Text className="text-blue-600 text-center font-semibold">
                Resend Code
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Main Signup Screen
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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
                  className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base"
                  placeholder="name@example.com"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View className="mt-4">
                <Text className="text-slate-700 text-sm font-semibold mb-2 ml-1">
                  Password
                </Text>
                <TextInput
                  className="bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl text-base"
                  placeholder="Minimum 8 characters"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {customError ? (
                <Text className="text-red-500 text-sm mt-3 text-center">
                  {customError}
                </Text>
              ) : null}

              <Pressable
                onPress={handleSignUp}
                disabled={loading || fetchStatus === "fetching"}
                className={`h-16 rounded-2xl justify-center items-center mt-8 ${
                  loading || fetchStatus === "fetching"
                    ? "bg-blue-400"
                    : "bg-blue-600"
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg uppercase">
                    Get Started
                  </Text>
                )}
              </Pressable>

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

              <View nativeID="clerk-captcha" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
