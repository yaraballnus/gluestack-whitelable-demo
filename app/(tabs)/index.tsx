import { Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Home Screen!</Text>
    </View>
  );
}