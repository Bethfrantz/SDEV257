import React, { useState, useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polygon } from "react-native-maps";
import styles from "./styles";

StatusBar.setBarStyle("dark-content");

const API_KEY = "AIzaSyBGXcxZtZR7LNkbACliKtSFYo3_q4zdxAo";
const URL = `https://maps.google.com/maps/api/geocode/json?key=${API_KEY}&latlng=`;

//  Polygon region around Swan Lake Chophouse
const chophouseRegion = {
  coordinates: [
    { latitude: 41.41040, longitude: -86.35120 },
    { latitude: 41.41040, longitude: -86.34960 },
    { latitude: 41.40940, longitude: -86.34960 },
    { latitude: 41.40940, longitude: -86.35120 },
    { latitude: 41.41040, longitude: -86.35120 },
  ],
  strokeColor: "purple",
  strokeWidth: 4,
};

export default function WhereAmI() {
  const [address, setAddress] = useState("loading...");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  useEffect(() => {
    function setPosition({ coords: { latitude, longitude } }) {
      setLongitude(longitude);
      setLatitude(latitude);

      fetch(`${URL}${latitude},${longitude}`)
        .then((resp) => resp.json())
        .then(({ results }) => {
          if (results.length > 0) {
            setAddress(results[0].formatted_address);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    let watcher;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);

      watcher = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest },
        setPosition
      );
    })();

    return () => {
      watcher?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        showsUserLocation
        followUserLocation
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: latitude || 0,
          longitude: longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/*  Swan Lake Chophouse Marker */}
        <Marker
          title="Swan Lake Chophouse"
          description="Steaks, cocktails, and lakeside dining"
          coordinate={{
            latitude: 41.40994,
            longitude: -86.35041,
          }}
        />

        {/*  Polygon Overlay */}
        <Polygon
          coordinates={chophouseRegion.coordinates}
          strokeColor={chophouseRegion.strokeColor}
          strokeWidth={chophouseRegion.strokeWidth}
        />
      </MapView>

      <Text style={styles.label}>Address: {address}</Text>
      <Text style={styles.label}>Latitude: {latitude}</Text>
      <Text style={styles.label}>Longitude: {longitude}</Text>
    </View>
  );
}

