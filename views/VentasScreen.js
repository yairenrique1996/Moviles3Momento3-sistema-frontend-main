import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  Picker,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { View, Text } from "react-native-web";
import { Formik } from "formik";
import * as yup from "yup";

import { formStyles } from "../assets/styles/styles";
import { useCallback, useEffect, useState } from 'react';
import TablaVentas from '../componentes/TablaVentas';

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "left",
  },
  image: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
  },
});

const ventasValidationSchema = yup.object().shape({
  identificacion: yup
    .string("Ingresa un Vendedor")
    .required("*Campo requerido"),
  zona: yup
    .string("Ingresa la Zona")
    .oneOf(["sur", "norte"], 'La zona solo puede ser "sur" o "norte"')
    .required("*Campo requerido"),
  valorventa: yup
    .number()
    .required("*Campo requerido")
    .integer("ingresa numeros enteros")
    .positive("ingresa un número mayor que cero")
    .test("el valor de la venta debe ser mayor a $2.000.000", (value) => {
      if (value < 2000000) {
        return false;
      }
      return true;
    })
});

export default function VendedoresScreen({ navigation }) {
  const [initialValues, setInitialValues] = useState({
    identificacion: "",
    zona: "sur",
    valorventa: 0,
   
  });
  const [listaVendedores, setListaVendedores] = useState([]);
  const [listaVentas, setListaVentas] = useState([]);

  const fetchListaVendedores = async () => {
    const { status, data } = await axios.get(`http://localhost:3000/api/vendedores`);
    setListaVendedores(data);
  }

  const fetchListaVentas = async () => {
    const { status, data } = await axios.get(`http://localhost:3000/api/ventas`);
    setListaVentas(data);
  }

  useEffect(() => {
    fetchListaVendedores();
    fetchListaVentas();
  }, [])

  const onFormSubmit = async (venta) => {
    try {
      const { status, data } = await axios.post(`http://localhost:3000/api/ventas`, venta);
      alert('Venta creada correctamente!')
      console.log(status, data)
      onFormReset();
      fetchListaVentas();
    } catch ({ response: { data: { error } } }) {
      alert(error)
    }
  };
  
  const onFormReset = useCallback(() => {
    setInitialValues({
      identificacion: '',
      zona: 'sur',
      valorventa: 0,
    });
  }, [setInitialValues])

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <ImageBackground
        source={require("../assets/que-es-un-sistema-punto-de-venta-4.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Formik
          enableReinitialize={true}
          validateOnMount={true}
          validationSchema={ventasValidationSchema}
          initialValues={initialValues}
          style={formStyles.formulario}
          onSubmit={onFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <Picker
                selectedValue={values.identificacion}
                style={{ height: 50, width: 320}}
                onValueChange={(itemValue, itemIndex) => setFieldValue("identificacion", itemValue)}
                
              >
                <Picker.Item label="SELECCIONE UN VENDEDOR" value="" enabled={false} />
                {
                  listaVendedores.map(vendedor => (
                    <Picker.Item
                      key={vendedor.identificacion}
                      label={`${vendedor.nombre} - ${vendedor.identificacion}`}
                      value={vendedor.identificacion} />
                  ))
                }
              </Picker>
              {errors.identificacion && touched.identificacion && (
                <Text style={formStyles.errorText}>{errors.identificacion}</Text>
              )}

              <TextInput
                style={formStyles.inputs}
                placeholder="Zona"
                onChangeText={handleChange("zona")}
                onBlur={handleBlur("zona")}
                value={values.zona}
                keyboardType="default"
                
              />
              {errors.zona && touched.zona && (
                <Text style={formStyles.errorText}>{errors.zona}</Text>
              )}

              <TextInput
                style={formStyles.inputs}
                placeholder="Valor venta"
                onChangeText={handleChange("valorventa")}
                onBlur={handleBlur("valorventa")}
                value={values.valorventa}
                keyboardType="numeric"
              />
              {errors.valorventa && touched.valorventa && (
                <Text style={formStyles.errorText}>{errors.valorventa}</Text>
              )}

              <TouchableOpacity
                style={formStyles.button}
                onPress={handleSubmit}
              >
                <Text style={formStyles.buttonText}>Guardar Venta</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity
          style={formStyles.button}
          onPress={onFormReset}
        >
          <Text style={formStyles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
        <TablaVentas datos={listaVentas} />
      </ImageBackground>
    </ScrollView>
  );
}
