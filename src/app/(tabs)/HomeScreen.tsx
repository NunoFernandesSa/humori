import Container from '@/src/components/common/Container';
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Container>
        <Text>Home Screen</Text>
      </Container>
    </SafeAreaView>
  );
}
