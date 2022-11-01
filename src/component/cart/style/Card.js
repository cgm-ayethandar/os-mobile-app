import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 1,
    borderColor: Colors.yellow,
    marginVertical: 5,
    marginLeft: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  detail: {
    marginLeft: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 6,
  },
  detailText: {
    ...fonts.style.regularNormal,
    color: Colors.avocado,
  },
  price: {
    ...fonts.style.mediumBold,
    color: Colors.brown,
  },
  countContainer: {
    alignSelf: "flex-end",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  count: {
    ...fonts.style.mediumBold,
    color: Colors.avocado,
  },
});

export default styles;
