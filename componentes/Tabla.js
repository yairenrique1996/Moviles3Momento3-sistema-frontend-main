import { Text, View } from "react-native";
import { tablaStyles } from "../assets/styles/styles";
import TablaRow from "./TablaRow";

export default function Tabla({ datos = [], updateLista }) {
  return (
    <View style={tablaStyles.tabla}>
      <View style={tablaStyles.titulos}>
        <Text style={tablaStyles.titulo}>Identificación</Text>
        <Text style={tablaStyles.titulo}>Nombre</Text>
        <Text style={tablaStyles.titulo}>Email</Text>
        <Text style={tablaStyles.titulo}>Total Comisión</Text>
      </View>
      <View style={tablaStyles.container}>
        {datos.map((vendedor, index) => (
          <TablaRow vendedor={vendedor} key={`${vendedor.identificacion}-${index}`} updateLista={updateLista} />
        ))}
      </View>
    </View>
  );
}
