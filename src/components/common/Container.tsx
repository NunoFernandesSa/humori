import React, { JSX } from "react";
import { View, ViewStyle } from "react-native";

/**
 * Container component that wraps its children with consistent padding.
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the container
 * @returns {JSX.Element} A View with 12 units of padding on all sides
 * @example
 * <Container>
 *   <Text>Hello, World!</Text>
 * </Container>
 */

const Container = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}): JSX.Element => {
  return <View style={[{ padding: 12 }, style]}>{children}</View>;
};

export default Container;
