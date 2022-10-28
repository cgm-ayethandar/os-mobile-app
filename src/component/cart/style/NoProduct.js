import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    ...fonts.style.regularBold,
    color: Colors.avocado,
  },
});

export default styles;
