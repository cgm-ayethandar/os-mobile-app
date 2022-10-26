import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { UserContext } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import React, { useContext, useEffect, useReducer, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// svg
import Svg, { Path } from "react-native-svg";
// reanimated
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import styles from "./style/BottomTabNavigator";

// screen
import Cart from "../../screen/cart/Cart";
import Favorite from "../../screen/favorite/Favorite";
import Home from "../../screen/home/Home";
import Search from "../../screen/search/Search";

// component
import BackButton from "../../component/os-mobile-app/backButton/BackButton";
import ProfileIcon from "../../component/home/header/ProfileIcon";

// constant
import { Colors } from "../../constant/Colors";
import { GlobalContext } from "../../provider/GlobalProvider";

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BottomTabNavigator = () => {
  const GLOBAL = useContext(GlobalContext);

  const [profileImg, setProfileImg] = useContext(UserContext);
  const tabLabels = {
    home: "Home",
    search: "Search",
    cart: "Cart",
    favorite: "Favorite",
  };

  return (
    <>
      <Tab.Navigator
        tabBar = {(props) => <AnimatedTabBar {...props} />}
        screenOptions={({ route }) => ({
          // headerShown: false,
          headerTransparent: true,
        //   tabBarActiveTintColor: "#558303",
        //   tabBarInactiveTintColor: "#F2E880",
        //   tabBarLabel: tabLabels[route.name.toLowerCase()],
        //   tabBarStyle: {
        //     borderTopLeftRadius: 25,
        //     borderTopRightRadius: 25,
        //     borderTopWidth: 0,
        //     elevation: 0,
        //     paddingTop: 5,
        //     shadowColor: "#558303",
        //     shadowOffset: {
        //       width: 0,
        //       height: 2,
        //     },
        //     shadowOpacity: 0.25,
        //     shadowRadius: 4,
        //   },
        })}
      >
        <Tab.Screen
          component={Home}
          name="Home"
          options={{
            headerTitle: "",
            headerRight: () => <ProfileIcon profileImg={profileImg} />,
            tabBarIcon: ({active}) => <Ionicons
            color={active ? Colors.brown : Colors.white}
            name={active ? "home-outline" : "home"}
            size={22}
            style={!active && styles.icon}
          />
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerLeft: () => (
              <View style={{ marginLeft: 8, marginTop: 5 }}>
                <BackButton />
              </View>
            ),
            tabBarIcon: ({active}) => <Ionicons
            color={active ? Colors.brown : Colors.white}
            name={active ? "search-outline" : "search"}
            size={22}
            style={!active && styles.icon}
          />
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            tabBarIcon: ({active}) => <Ionicons
            color={active ? Colors.brown : Colors.white}
            name={active ? "cart-outline" : "cart"}
            size={22}
            style={!active && styles.icon}
          />,
            tabBarBadge: GLOBAL.itemCount,
            // tabBarBadgeStyle: 
              // GLOBAL.itemCount > 0
              //   ? { backgroundColor: Colors.brown }
              //   : { opacity: 0 },
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            headerLeft: () => (
              <View style={{ marginLeft: 8, marginTop: 5 }}>
                <BackButton />
              </View>
            ),
            tabBarIcon: ({active}) => <Ionicons
            color={active ? Colors.brown : Colors.white}
            name={active ? "heart-outline" : "heart"}
            size={22}
            style={!active && styles.icon}
          />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

// ------------------------------------------------------------------

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors } : BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets()

  // get information about the components position on the screen -----

  const reducer = (state: any, action: { x: number, index: number }) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }]
  }

  const [layout, dispatch] = useReducer(reducer, [])
  console.log(layout)

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 0;
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    }
  })

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={106}
        height={46}
        viewBox="0 0 106 46"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill="#fff"
          d="M18 18v-7c0 19.33 15.67 35 35 35s35-15.67 35-35v7c0-9.941 8.059-18 18-18H0c9.941 0 18 8.059 18 18z"
             />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
              routename={route.name}
            />
          )
        })}
      </View>
    </View>
  )
}

// ------------------------------------------------------------------

type TabBarComponentProps = {
  active?: boolean
  options: BottomTabNavigationOptions
  onLayout: (e: LayoutChangeEvent) => void
  onPress: () => void
  routename?: string
}

const TabBarComponent = ({ active, options, onLayout, onPress, routename }: TabBarComponentProps) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play()
    }
  }, [active])

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    }
  })

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ active }) : <Text>?</Text>}
        {routename == "Cart" && options.tabBarBadge>0 && !active ? 
          <View style={styles.badge}>
          <Text style={styles.badgeText}>{options.tabBarBadge }</Text>
          </View> : 
          null
      }
      </Animated.View>
    </Pressable>
  )
}

export default BottomTabNavigator;
