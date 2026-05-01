import React, { useEffect, useState, useMemo, createContext } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider, IconButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/components/Home/Home";
import AddVinyl from "./src/components/AddCollection/AddVinyl";
import { initDB } from "./src/database/Database";
import Wishlist from "./src/components/Wishlist/Wishlist";
import Collection from "./src/components/Collection/Collection";
import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  MD3Theme,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

type DrawerNav = DrawerNavigationProp<any>;

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
  fonts: MD3LightTheme.fonts, // On force les fonts de Paper
} as unknown as MD3Theme;

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  fonts: MD3DarkTheme.fonts, // On force les fonts de Paper
} as unknown as MD3Theme;

function HomeStack() {
  return (
    <Stack.Navigator>
      {/*Pour la sidebar de navigation*/}
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "CollecVinyls",
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("AddOrModify")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddOrModify"
        options={({}) => ({ title: "Ajouter un vinyle" })}
        component={AddVinyl}
      />
    </Stack.Navigator>
  );
}

function WishlistStack() {
  return (
    <Stack.Navigator>
      {/*Pour la sidebar de navigation*/}
      <Stack.Screen
        name="Home"
        component={Wishlist}
        options={({ navigation }) => ({
          title: "Ma wishList",
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("AddOrModify")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddOrModify"
        options={({ navigation }) => ({ title: "Ajouter un vinyle" })}
        component={AddVinyl}
      />
    </Stack.Navigator>
  );
}

function CollectionStack() {
  return (
    <Stack.Navigator>
      {/*Pour la sidebar de navigation*/}
      <Stack.Screen
        name="Home"
        component={Collection}
        options={({ navigation }) => ({
          title: "Ma Collection",
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("AddOrModify")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddOrModify"
        options={({ navigation }) => ({ title: "Ajouter un vinyle" })}
        component={AddVinyl}
      />
    </Stack.Navigator>
  );
}

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkTheme: true,
});

export default function App() {
  const colorScheme = useColorScheme(); // 'light' ou 'dark'
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === "dark");

  useEffect(() => {
    //crée la BDD si n'existe pas
    initDB();
  }, []);

  const themeContext = useMemo(
    () => ({
      toggleTheme: () => setIsDarkTheme((prev) => !prev),
      isDarkTheme,
    }),
    [isDarkTheme],
  );

  useEffect(() => {
    setIsDarkTheme(colorScheme === "dark");
  }, [colorScheme]);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <ThemeContext.Provider value={themeContext}>
      <PaperProvider theme={theme as unknown as MD3Theme}>
        <NavigationContainer theme={theme as any}>
          <Drawer.Navigator>
            <Drawer.Screen
              name="Accueil"
              component={HomeStack}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Wishlist"
              component={WishlistStack}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Collection"
              component={CollectionStack}
              options={{ headerShown: false }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
