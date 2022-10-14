import { Colors } from "../../../../constant/Colors";
import { StyleSheet } from "react-native";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderColor: Colors.yellow,
    borderRadius: 10,
    borderWidth: 1,
    height: 200,
    marginRight: 10,
    width: 270,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 150,
    width: "100%",
  },
  likeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  name: {
    ...fonts.style.regularNormal,
    color: Colors.avocado,
    marginLeft: 10,
  },
  price: {
    ...fonts.style.mediumBold,
    color: Colors.brown,
    marginLeft: 10,
  },
});

export default styles;
