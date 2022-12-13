import { StyleSheet, TouchableOpacity, View, Text, KeyboardAvoidingView } from "react-native";
import { firebase } from '@react-native-firebase/database';
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import  auth  from '@react-native-firebase/auth';
import { useRoute } from "@react-navigation/native";

export default function DeleteAd({navigation}) {
    const route = useRoute();

    const [ad, setAd] = useState([]);
    console.log(ad);

    // Firebase Realtime database reference URL
    const reference = firebase.app().database("https://third-project-b2c92-default-rtdb.europe-west1.firebasedatabase.app/");

    const deletePost = (id) => {
        reference.ref('inventory/' + id).remove();
    }

    useEffect(() => {
        reference.ref('inventory')
            .on('value', (snapshot) => {
                setAd([]);
                snapshot.forEach((element) => {
                    const readObj = {
                        id: element.val().id,
                        userName: element.val().userName,
                        adName: element.val().adName,
                        price: element.val().price,
                        description: element.val().description
                    };
                    setAd(emptyArray => [...emptyArray, readObj]);
                })
                console.log(JSON.stringify(ad));
            })
    }, []);

    return(
        <KeyboardAvoidingView style={styles.container}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={ad}
                    renderItem={({item}) => {

                        return(
                            <View style={styles.listStyle}>
                                <Text>{item.adName}, {item.price} </Text>
                                <Text>{item.description}, {item.userName}</Text>
                                <TouchableOpacity
                                style={styles.insideListButton}
                                onPress={() => deletePost(item.id)}
                                >
                                <Text>Istrinti</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}/>    

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
    listStyle: {
        height:100,
        width: 300,
        borderWidth:5,
        borderColor:'black',
        backgroundColor: 'red',    
        margin:12
    },
    insideListButton: {
        backgroundColor: 'blue',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
});