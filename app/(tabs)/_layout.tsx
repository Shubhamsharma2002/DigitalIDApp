import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import clsx from "clsx";
import { Tabs } from "expo-router";
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
          "w-12 h-12 items-center justify-center rounded-full transition-all duration-200",
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

const Tabslayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // Floating Tab Bar Styling
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 5, // Android Shadow
          shadowColor: "#000", // iOS Shadow
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          paddingVertical: (tabBar.height - 48) / 2, // Centering the 48px (w-12) pill
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

export default Tabslayout;
