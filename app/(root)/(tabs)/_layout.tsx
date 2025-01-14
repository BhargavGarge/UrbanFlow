import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
      <Tabs.Screen name="chat" options={{ tabBarLabel: "Chat" }} />
      <Tabs.Screen name="rides" options={{ tabBarLabel: "Rides" }} />
    </Tabs>
  );
}
