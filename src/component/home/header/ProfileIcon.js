import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

// Constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// utils
import RenderIf from "../../../utils/RenderIf";

const ProfileIcon = ({ profileImg }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("ShowProfile")}
        style={{ marginRight: 15 }}
      >
        <RenderIf isTrue={profileImg}>
          <Image
            source={{ uri: profileImg }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </RenderIf>
        <RenderIf isTrue={!profileImg}>
          <Ionicons name={Icons.profile} size={30} color={Colors.avocado} />
        </RenderIf>
      </TouchableOpacity>
    </>
  );
};

export default ProfileIcon;
