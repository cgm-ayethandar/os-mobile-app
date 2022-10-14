import { Colors } from "../../../../constant/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.yellow,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 3,
    padding: 5,
  },
  inputField: {
    color: Colors.black,
    height: 25,
    width: "80%",
  },
});

export default styles;
