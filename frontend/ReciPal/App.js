import { StyleSheet, Text, View } from 'react-native';
import Chat from "./src/chat"

export default function App() {
  return (
    <View style={styles.container}>
    <Chat/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
