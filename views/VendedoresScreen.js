import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { View, Text } from "react-native-web";
import { Formik } from "formik";
import * as yup from "yup";

import { formStyles } from "../assets/styles/styles";
import { useCallback, useEffect, useState } from 'react';
import Tabla from '../componentes/Tabla';

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  image: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
  },
});

const vendedorValidationSchema = yup.object().shape({
  identificacion: yup
    .string("Ingresa la identificacion del Vendedor")
    .matches(/^\d+$/, "La identificacion del vendedor debe ser numerica.")
    .required("*Campo requerido"),
  nombre: yup
    .string("Ingresa el nombre del Vendedor")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g, "Nombre del Vendedor solo puede contener letras.")
    .required("*Campo requerido"),
  email: yup
    .string("Ingresa el Email")
    .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, "El Email debe ser valido")
    .required("*Campo requerido"),
});

export default function VendedoresScreen({ navigation }) {
  const [initialValues, setInitialValues] = useState({
    identificacion: "",
    nombre: "",
    email: "",
  });
  const [listaVendedores, setListaVendedores] = useState([]);

  const fetchListaVendedores = async () => {
    const { status, data } = await axios.get(`http://localhost:3000/api/vendedores`);
    setListaVendedores(data);
  }

  useEffect(() => {
    fetchListaVendedores();
  }, [])

  const updateLista = () => {
    fetchListaVendedores();
  }

  const onFormSubmit = async (vendedor) => {
    console.log(vendedor)
    try {
      if (vendedor._id !== undefined) {
        const { status, data } = await axios.put(`http://localhost:3000/api/vendedores/${vendedor._id}`, vendedor);
        alert('Vendedor actualizado correctamente!')
      } else {
        const { status, data } = await axios.post(`http://localhost:3000/api/vendedores`, vendedor);
        alert('Vendedor creado correctamente!')
      }
      onFormReset();
      updateLista();
    } catch ({ response: { data: { error } } }) {
      alert(error)
    }
  };
  const handleSearch = useCallback(async (identificacion) => {
    const { status, data } = await axios.get(`http://localhost:3000/api/vendedores/${identificacion}`);
    if (data != null){
      setInitialValues(data);
    }
    else{
      alert(`Error consultando vendedor, no existe ${identificacion}`)
    }
    // if (status === 200) {
    //   setInitialValues(data);
    // } else {
    //   if (data.identificacion ==null)
    //     alert(`Error consultando vendedor ${identificacion}`)
    // }
  }, [setInitialValues])

  const onFormReset = useCallback(() => {
    console.log('reset');
    setInitialValues({
      identificacion: '',
      nombre: '',
      email: '',
    });
  }, [setInitialValues])

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <ImageBackground
        source={require("../assets/images (1).jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Formik
          enableReinitialize={true}
          validateOnMount={true}
          validationSchema={vendedorValidationSchema}
          initialValues={initialValues}
          style={formStyles.formulario}
          onSubmit={onFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <TextInput
                style={formStyles.inputs}
                placeholder="Identificacion"
                onChangeText={handleChange("identificacion")}
                onBlur={handleBlur("identificacion")}
                value={values.identificacion}
                keyboardType="numeric"
                
                
              />
              {errors.identificacion && touched.identificacion && (
                <Text style={formStyles.errorText}>{errors.identificacion}</Text>
              )}

              <TextInput
                style={formStyles.inputs}
                placeholder="Nombre"
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
                keyboardType="default"
              />
              {errors.nombre && touched.nombre && (
                <Text style={formStyles.errorText}>{errors.nombre}</Text>
              )}

              <TextInput
                style={formStyles.inputs}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={formStyles.errorText}>{errors.email}</Text>
              )}

              <TouchableOpacity
                style={formStyles.button}
                onPress={handleSubmit}
              >
                <Text style={formStyles.buttonText}>Guardar/Actualizar Vendedor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={formStyles.button}
                onPress={() => {
                  if (values.identificacion !== '') {
                    handleSearch(values.identificacion)
                  }
                }}
              >
                <Text style={formStyles.buttonText}>Buscar Vendedor</Text>
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
        <Tabla datos={listaVendedores} updateLista={updateLista} />
      </ImageBackground>
    </ScrollView>
  );
}
