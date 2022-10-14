import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    ...fonts.style.regularBold,
    color: Colors.avocado,
  },
});

export default styles;
