import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { useAuth } from "@clerk/expo";
import clsx from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { tabBar } = components;

// Pure Inline Tailwind/NativeWind TabIcon
const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => {
  return (
    <View className="flex-1 items-center justify-center w-full">
      <View
        className={clsx(
          "w-12 h-12 items-center justify-center rounded-full",
          focused ? "bg-white shadow-md" : "bg-transparent",
        )}
      >
        <Image
          source={icon}
          resizeMode="contain"
          className="w-6 h-6"
          style={{ tintColor: focused ? colors.primary : "#ffffff" }}
        />
      </View>
    </View>
  );
};

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  // Protect tabs
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          paddingVertical: (tabBar.height - 48) / 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
