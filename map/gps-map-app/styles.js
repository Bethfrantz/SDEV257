import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },

  mapView: {
    flex: 1,
  },

  label: {
    fontSize: 16,
    padding: 8,
    fontWeight: "500",
  },
});
