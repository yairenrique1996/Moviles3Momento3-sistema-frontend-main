import { Text, View } from "react-native";
import { tablaStyles } from "../assets/styles/styles";
import TablaRowVentas from "./TablaRowVentas";

export default function TablaVentas({ datos = [] }) {
  return (
    <View style={tablaStyles.tabla}>
      <View style={tablaStyles.titulos}>
        <Text style={tablaStyles.titulo}>Identificación</Text>
        <Text style={tablaStyles.titulo}>Zona</Text>
        <Text style={tablaStyles.titulo}>Fecha</Text>
        <Text style={tablaStyles.titulo}>Valor Venta</Text>
      </View>
      <View style={tablaStyles.container}>
        {datos.map((venta, index) => (
          <TablaRowVentas venta={venta} key={`${venta.identificacion}-${index}`} />
        ))}
      </View>
    </View>
  );
}
