import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Loading(){
    return (
        <View>
            <Text style={ style.container }>Загрузка...</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        fontSize: 23,
        color: "black"
    }
})