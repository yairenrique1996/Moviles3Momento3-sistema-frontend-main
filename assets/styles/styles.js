import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const styleheader = StyleSheet.create({
  container: {
    width: "10%",
    height: 10,
    justifyContent: "left",
    alignItems: "left",
    backgroundColor: "#fff7eb",
    border: "solid 9px",
  },
  htext: {
    fontSize: 10,
    fontWeight: "bold",
    color: "blue",
  },
});
const styleapp = StyleSheet.create({
  containers: {
    marginTop: 320,
    flexDirection: "row",
    alignItems: "center",
  },
});

const styleform = StyleSheet.create({
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    width: "50%",
  },
});

const styleInputRow = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    margin: "10px",
    justifyContent: "space-between",
  },
  input: {
    padding: "1px",
  },
  errorMessage: {
    color: "red",
  },
});

const formStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  inputs: {
    fontSize: 18,
    height: 34,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    fontWeight: "60",
    paddingLeft: 1,
    borderWidth: 1,
    borderRadius: 1,
    width: "30%",
    borderColor: "#110DA1",
    backgroundColor: "white",
    paddingRight: 12,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#f44336",
    backgroundColor: "#f44336",
    padding: 1,
    marginTop: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 7,
    textAlign: "center",
  },
  buttonDelete: {
    borderWidth: 1,
    borderColor: "#ff0000",
    backgroundColor: "#ff0000",
    padding: 5,
    borderRadius: 7,
  },
  buttonDeleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#03a9f4",
    backgroundColor: "#ff0000"
  },
  errorText: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    color: "#0A0B0B",
  }
});

const tablaStyles = StyleSheet.create({
  tabla: {
    marginTop: "40px"
  },
  container: {
    border: "2px solid",
    borderRadius: "5px",
  },
  titulos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "5px",
    backgroundColor: "#ff0000",
    marginBottom: "8px",
    border: "4px solid",
    borderRadius: "5px",
    gap: "15px",
    textAlign:"left"
  },
  titulo: {
    backgroundColor: "#ff0000",
    color: " #ff0000",
    textAlign: "left",
    padding: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
    gap: "15px",
    backgroundColor: "#b9c9fe",
    borderBottomWidth: "1px",
    textAlign:"left"
    
  },
});

export {
  styleheader,
  styleapp,
  styleform,
  styleInputRow,
  formStyles,
  tablaStyles,
  styles,
};
