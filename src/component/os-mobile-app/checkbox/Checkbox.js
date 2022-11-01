import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import RenderIf from "../../../utils/RenderIf";
import styles from "./style/Checkbox";
import { SelectedIdsContext } from "../../../../App";

const Checkbox = ({ id }) => {
  const [selectedIds, setSelectedIds] = useContext(SelectedIdsContext);
  const [checked, setChecked] = useState(false);

  const onCheckedPress = () => {
    if (checked === false) {
      setSelectedIds([...selectedIds, id]);
      setChecked(!checked);
    } else {
      const arr = selectedIds.filter((sid) => sid != id);
      setSelectedIds(arr);
      setChecked(!checked);
    }
    console.log(selectedIds);
  };

  return (
    <>
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onCheckedPress}
      >
        <RenderIf isTrue={checked}>
          <Ionicons name="checkmark-outline" size={20} color="white" />
        </RenderIf>
      </Pressable>
    </>
  );
};

export default Checkbox;
