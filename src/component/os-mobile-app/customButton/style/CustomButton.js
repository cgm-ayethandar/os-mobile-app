import { Colors } from "../../../../constant/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.avocado,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles;
