import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";

const styles = StyleSheet.create({
  checkboxBase: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "gray",
    borderRadius: 11,
    borderWidth: 1,
    height: 22,
    justifyContent: "center",
    width: 22,
  },
  checkboxChecked: {
    backgroundColor: Colors.avocado,
  },
});

export default styles;
