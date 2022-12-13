import { StyleSheet, TouchableOpacity, View, Text, Linking } from "react-native";


import React, { useState } from "react";


//import { Camera, useCameraDevices } from "react-native-vision-camera";
//import {useScanBarcodes, BarcodeFormat} from "vision-camera-code-scanner";

import QRCodeScanner from "react-native-qrcode-scanner";

import { useRoute } from "@react-navigation/native";

export default function SearchScanner({navigation}) {
    const [codeNumber, setCodeNumber] = useState('');
    const [filtered, setFiltered] = useState(false);

    onRead = e => {
        setCodeNumber(e.data)
        setFiltered(true)
    }

    function renderCamera() {
        return(
        <View style={styles.container}>
            <QRCodeScanner
            onRead={this.onRead}
            />
                <Text>{codeNumber}</Text>
        </View>
                //console.log("camera did a thing")
                
        )
    }

    const route = useRoute();

    return(
        <View
            style = {{
                flex : 1
            }}
        >
            {renderCamera()}

            <TouchableOpacity
                style={styles.button}
                onPress={ () => {navigation.navigate("ShowAd", {codeNumberFromQR : codeNumber, filterFromQR : filtered,});}}
                >
                <Text>Paieska pagal QR koda</Text>
                </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    button: {
        backgroundColor: 'blue',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    barcodetext: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

});