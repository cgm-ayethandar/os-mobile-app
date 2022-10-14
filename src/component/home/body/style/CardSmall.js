import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderColor: Colors.yellow,
    borderRadius: 5,
    borderWidth: 1,
    height: 160,
    marginBottom: 10,
    marginRight: 10,
    width: 170,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 100,
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
