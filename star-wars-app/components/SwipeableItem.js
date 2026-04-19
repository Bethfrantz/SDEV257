import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function SwipeableItem({ item, onSwipe }) {
  function handleScroll(e) {
    if (e.nativeEvent.contentOffset.x >= 200) {
      onSwipe(item);
    }
  }

  return (
    <View style={{ width: 200, height: 40, marginVertical: 10 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        onScroll={handleScroll}
      >
        <TouchableOpacity>
          <View
            style={{
              width: 200,
              height: 40,
              backgroundColor: "azure",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "slategrey",
            }}
          >
            <Text style={{ textAlign: "center", color: "slategrey" }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Blank page for swipe target */}
        <View style={{ width: 200, height: 40 }} />
      </ScrollView>
    </View>
  );
}
