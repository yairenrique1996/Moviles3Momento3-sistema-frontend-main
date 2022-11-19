import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'

import VendedoresScreen from "./views/VendedoresScreen";
import VentasScreen from "./views/VentasScreen";


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer> 
     
      <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={{ headerShown: false , tabBarActiveBackgroundColor:'#CFD8D3'}}
      
      >
          
        <Tab.Screen  
        name= "Vendedores" 
        component = {VendedoresScreen} 
        options = {{title: 'ingresando vendedor' , tabBarIcon:({color, size})=>(
          <Ionicons name="person-circle-outline" color={"orange"} size={25}/>
        )}}/>

        <Tab.Screen  
        name= "Settings" 
        component = {VentasScreen} 
        options = {{title: 'ingresado venta', tabBarIcon:({color, size})=>(
          <Ionicons name ="settings" color={'blue'} size = {25}/>
        )}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}



