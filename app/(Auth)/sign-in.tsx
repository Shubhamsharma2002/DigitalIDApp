import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>

      <Link
        href="/(Auth)/sign-up"
        className="mt-6 rounded-xl bg-primary text-white px-8 py-4 "
      >
        Go to Signup
      </Link>
    </View>
  );
};

export default SignIn;
