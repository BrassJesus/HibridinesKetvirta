
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AdScreen from './screens/AdScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputAd from './screens/InputAd';
import ShowAd from './screens/ShowAd';
import DeleteAd from './screens/DeleteAd';
import InputScannerScreen from './screens/InputScannerScreen';
import SearchScanner from './screens/SearchScanner';

const Stack = createNativeStackNavigator();

export default function App(){
  return(  
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: "Naminis langas"}}
        />
        <Stack.Screen
          name="AdScreen"
          component={AdScreen}
          options={{title: "Prisijungta"}}
        />
        <Stack.Screen
          name="SearchByQR"
          component={SearchScanner}
          options={{title: "Ieskojimas"}}
        />
        <Stack.Screen
          name="InputScannerScreen"
          component={InputScannerScreen}
          options={{title: "skeneris"}}
        />
        <Stack.Screen
          name="InputAd"
          component={InputAd}
          options={{title: "Irasyti skelbima"}}
        />
        <Stack.Screen
          name="ShowAd"
          component={ShowAd}
          options={{title: "Skelbimai"}}
        />
        <Stack.Screen
          name="DeleteAd"
          component={DeleteAd}
          options={{title: "Trinimas"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

});

