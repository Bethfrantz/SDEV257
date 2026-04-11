import { Text, View } from "react-native";

export default function Favorites() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Favorites Screen</Text>
    </View>
  );
}
