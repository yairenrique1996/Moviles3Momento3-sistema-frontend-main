import axios from 'axios';
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { formStyles, tablaStyles } from "../assets/styles/styles";

export default function TablaRow({ venta }) {
  const fecha = new Date(venta.fecha);
  return (
    <View style={tablaStyles.row}>
      <Text>{venta.identificacion}</Text>
      <Text>{venta.zona}</Text>
      <Text>{fecha.toDateString()}</Text>
      <Text>{venta.valorventa}</Text>
    </View>
  );
}
