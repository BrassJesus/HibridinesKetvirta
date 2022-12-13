import { StyleSheet, TouchableOpacity, View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { firebase } from '@react-native-firebase/database';
import { FlatList } from "react-native";
import { Children, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import { useRoute } from "@react-navigation/native";

export default function ShowAd({navigation}) {
    const route = useRoute();
    const { codeNumberFromQR , filterFromQR } = route.params;
    const [ad, setAd] = useState([]);
    const [filter, setFilter] = useState(false);
    const [codeNumber, setCodeNumber] = useState(codeNumberFromQR);
    const [filtered, setFiltered] = useState(filterFromQR);
    const toggleFilter = () => setFilter(prevState => !prevState);
    console.log(ad);
    console.log(filter);

    // Firebase Realtime database reference URL
    const reference = firebase.app().database("https://third-project-b2c92-default-rtdb.europe-west1.firebasedatabase.app/");



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
                        description: element.val().description,
                        codeNumber: element.val().codeNumber,
                    };
                    setAd(emptyArray => [...emptyArray, readObj]);
                })
                console.log(JSON.stringify(ad));
            })
    }, []);


    return(
        <KeyboardAvoidingView style={styles.container}>
            {
            filtered===false?
            <FlatList
                keyExtractor={(item) => item.id}
                data={ad}
                renderItem={({item}) => (
                    <View style={styles.listStyle}>
                            <Text>{item.codeNumber}</Text>
                            <Text>{item.adName}, {item.price} </Text>
                            <Text>{item.description}</Text>

                    </View>
                )}/>
                :<FlatList
                    keyExtractor={(item) => item.id}
                    data={ad}
                    renderItem={({item}) => {
                    if(item.codeNumber === codeNumber)
                        return(
                            <View style={styles.listStyle}>
                                <Text>{item.codeNumber}</Text>
                                <Text>{item.adName}, {item.price} </Text>
                                <Text>{item.description}</Text>
                            </View>
                        )
                    }}/>
            }
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DeleteAd")}
                >
                <Text>Trinti skelbimus</Text>
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
    listStyle: {
    height:100,
    width: 300,
    borderWidth:5,
    borderColor:'black',
    backgroundColor: 'red',    
    margin:12
    },
});