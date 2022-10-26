import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.avocado,
  },
  activeBackground: {
    position: "absolute",
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  component: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -8,
    paddingEnd: 4,
  },
  componentCircle: {
    // flex: 1,
    marginBottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    left: 18,
  },
  badge: {
    position: "absolute",
    backgroundColor: Colors.brown,
    paddingVertical: 3,
    paddingHorizontal: 5,
    top: 0,
    left: 16,
    color: Colors.white,
    borderRadius: 50,
  },
  badgeText: {
    color: Colors.white,
    ...fonts.style.smallBold,
  },
  icon: {
    marginTop: 10,
  },
});

export default styles;
