import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type SubmitButtonProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  handleSubmit: () => void;
};
