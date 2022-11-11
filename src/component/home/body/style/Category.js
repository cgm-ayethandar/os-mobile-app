import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.yellow,
    marginRight: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    ...fonts.style.smallNormal,
    color: Colors.avocado,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default styles;
