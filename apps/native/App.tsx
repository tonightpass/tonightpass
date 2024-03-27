import { useAPI } from "@tonightpass/react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const careersJobs = useAPI("/careers/jobs");
  console.log(careersJobs);
  return (
    <View style={styles.container}>
      <StatusBar style={"auto"} />
      <Text style={styles.text}>{"Hello"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});
