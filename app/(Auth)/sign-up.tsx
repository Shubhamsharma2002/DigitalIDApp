import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>

      <Link
        href="/(Auth)/sign-in"
        className="mt-6 rounded-xl bg-primary text-white px-8 py-4 "
      >
        Go to Login
      </Link>
    </View>
  );
};

export default SignUp;
