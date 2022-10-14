import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  detailContainer: {
    padding: 10,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 260,
  },
  name: {
    ...fonts.style.regularBold,
    color: Colors.black,
    marginBottom: 10,
  },
  price: {
    ...fonts.style.bigBold,
    color: Colors.brown,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profileText: {
    marginLeft: 10,
    ...fonts.style.mediumBold,
    color: Colors.avocado,
  },
});

export default styles;
