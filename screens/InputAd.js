import { StyleSheet, TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Linking } from "react-native";
import { firebase } from '@react-native-firebase/database';

import React, { useState } from "react";
import  auth  from '@react-native-firebase/auth';
import { useRoute } from "@react-navigation/native";


export default function InputAd({navigation}) {
    //const [isActiveState, setIsActiveState] = useState(false);
    const route = useRoute();
    const [adName, setAdName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [codeNumber, setCodeNumber] = useState(route.params.codeNumber);
    console.log(adName);
    console.log(description);
    console.log(price);
    console.log(codeNumber);


    // Firebase Realtime database reference URL
    const reference = firebase
    .app()
    .database("https://third-project-b2c92-default-rtdb.europe-west1.firebasedatabase.app/")
    .ref('/inventory')


    createPage = () => {
        const newRef = reference.push();
        newRef.set({
            id: newRef.key,
            userName: auth().currentUser?.email,
            adName: adName,
            price: price,
            description: description,
            codeNumber: codeNumber,
        })
        .then(() => console.log("data is in"))
        .catch(error => alert(error.message));
        setAdName('');
        setPrice('');
        setDescription('');
        setCodeNumber('');
    }    

    return(
        <KeyboardAvoidingView style={styles.container}>
            
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Pavadinimas:"
                        value={adName}
                        onChangeText={text => setAdName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Kaina:"
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Aprasas:"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Bruksninio kodo skaiciai:"
                        value={route.params.codeNumber}
                        onChangeText={text => setCodeNumber(text)}
                        
                    />

                </View>
            
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("InputScannerScreen")}
                >
                <Text>Skenuoti QR koda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={createPage}
                >
                <Text>Irasyti</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
                >
                <Text>Back</Text>

                </TouchableOpacity>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '60%',
        fontSize: 14,
        color: "red",
        backgroundColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 20,
        
    },
    button: {
        backgroundColor: 'blue',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});