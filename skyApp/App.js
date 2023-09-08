import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Alert, Button } from 'react-native';

import * as Location from 'expo-location';

import Loading from "./components/loading";

const API_KEY = "1d1b1c58a4eab19b639fe391301e31c8";

async function getWeather(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    return await response.json();
}

function getRights(){
    return Location.requestForegroundPermissionsAsync();
}

function getPosition(){
    return Location.getCurrentPositionAsync();
}

async function getLocation (){
    if((await getRights()).status === "denied") return `Не могу определить место положение,
     разрешите доступ к геоданным`;
    const {coords: {latitude, longitude}} = await getPosition();

  return getWeather(latitude, longitude);

}

export default function App() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

  useEffect(() => {
     getLocation()
        .then((response) => {
            if(typeof response === "string") {
                setData(response);
            } else {
                setData(`Температура ${Math.round(response.main.temp)}°`);
                setLoading(false);
            }
        })
        .catch((error) => {
            Alert.alert(`${error}`);
        })
  }, [])

    const loadingComponent = loading ? <Loading/> : null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        { loadingComponent }
        <Text>{ data }</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
