import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import React from "react";

import auth from '@react-native-firebase/auth';


export default function HomeScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(email);
    console.log(password);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            console.log(user)
            if (user) {
                navigation.navigate("AdScreen")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                alert("Registration successful!")
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:' , user.email);
        })
        .catch(error => alert(error.message))
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
           <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text>Login</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
            >
                <Text>Register</Text>

            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'bold',
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
    buttonContainer: {

    }
});
