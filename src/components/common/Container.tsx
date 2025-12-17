import React from "react";
import { View } from "react-native";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <View style={{ padding: 12 }}>{children}</View>;
};

export default Container;
