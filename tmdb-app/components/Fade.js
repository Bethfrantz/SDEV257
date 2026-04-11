import { LinearGradient } from "expo-linear-gradient";

export function RowFadeLeft() {
  return (
    <LinearGradient
      colors={["#111", "transparent"]}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 40,
        zIndex: 10,
      }}
    />
  );
}

export function RowFadeRight() {
  return (
    <LinearGradient
      colors={["transparent", "#111"]}
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 40,
        zIndex: 10,
      }}
    />
  );
}
