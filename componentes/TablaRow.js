import axios from 'axios';
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { formStyles, tablaStyles } from "../assets/styles/styles";

export default function TablaRow({ vendedor, updateLista }) {

  const handleDelete = async (_id) => {
    console.log(_id);
    const { status, data } = await axios.delete(`http://localhost:3000/api/vendedores/${_id}`);
    updateLista();
    alert('Vendedor eliminado exitosamente!')
  }

  return (
    <View style={tablaStyles.row}>
      <Text>{vendedor.identificacion}</Text>
      <Text>{vendedor.nombre}</Text>
      <Text>{vendedor.email}</Text>
      <Text>{vendedor.totalcomision}</Text>

      {/* BORRAR EL BOTON ELIMINAR */}
      {/* <TouchableOpacity
        style={formStyles.buttonDelete}
        onPress={() => handleDelete(vendedor._id)}
      >
        <Text style={formStyles.buttonDeleteText}>Eliminar</Text>
      </TouchableOpacity> */}
    </View>
  );
}
