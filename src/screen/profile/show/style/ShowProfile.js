import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {},
  profileContainer: {
    width: "100%",
    paddingTop: 70,
    paddingBottom: 20,
    backgroundColor: Colors.avocado,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    paddingTop: 10,
    ...fonts.style.bigBold,
    color: Colors.yellow,
  },
  edit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    paddingVertical: 5,
    backgroundColor: Colors.brown,
    borderRadius: 5,
    top: 25,
    right: 10,
    position: "absolute",
  },
  editText: {
    ...fonts.style.regularNormal,
    color: Colors.yellow,
  },
  emailText: {
    ...fonts.style.smallNormal,
    color: Colors.brown,
  },
});

export default styles;
