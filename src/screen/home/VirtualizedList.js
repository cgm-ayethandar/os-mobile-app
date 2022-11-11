import React from "react";
import { FlatList } from "react-native";

const VirtualizedList = ({children}) => {
    return (
        <FlatList
            data={[]}
            keyExtractor={() => "key"}
            showsVerticalScrollIndicator ={false}
            renderItem={null}
            ListHeaderComponent={
                <>{children}</>
            }
        />
    )
}

export default VirtualizedList;