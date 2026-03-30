import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type SubmitButtonProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  handleSubmit: () => void;
};
