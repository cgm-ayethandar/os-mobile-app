import { StyleSheet } from "react-native";
import { Colors } from "../../../../constant/Colors";
import fonts from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {},
  profileContainer: {
    alignItems: "center",
    backgroundColor: Colors.avocado,
    paddingBottom: 20,
    paddingTop: 70,
    width: "100%",
  },
  image: {
    borderRadius: 60,
    height: 120,
    width: 120,
  },
  name: {
    ...fonts.style.bigBold,
    color: Colors.yellow,
    paddingTop: 10,
  },
  edit: {
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    bottom: 160,
    left: 230,
  },
  logoutText: {
    ...fonts.style.regularNormal,
    color: Colors.yellow,
    textAlign: "center",
  },
  emailText: {
    ...fonts.style.smallNormal,
    color: Colors.brown,
  },
  logout: {
    backgroundColor: Colors.brown,
    paddingVertical: 5,
    borderRadius: 5,
    width: 85,
    // bottom: 235,
    // left: 280,
  },
  title: {
    marginVertical: 10,
    marginLeft: 20,
    width: "100%",
  },
  titleText: {
    ...fonts.style.regularBold,
    textAlign: "left",
    color: Colors.avocado,
  },
  card: {
    marginTop: 10,
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
