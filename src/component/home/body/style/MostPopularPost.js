import { StyleSheet } from "react-native";
import { AuthContext } from "../../../../../App";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    elevation: 8,
    margin: 5,
    shadowColor: Colors.yellow,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: "100%",
  },
  image: {
    borderColor: Colors.yellow,
    borderRadius: 15,
    borderWidth: 1,
    height: 200,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.avocado,
    borderRadius: 5,
    borderWidth: 0.5,
    bottom: 20,
    opacity: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: "absolute",
    right: 20,
  },
  text: {
    ...fonts.style.regularBold,
    color: Colors.avocado,
  },
});

export default styles;
