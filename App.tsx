import React, { useEffect } from "react";
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

type DrawerNav = DrawerNavigationProp<any>;

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
              onPress={() => navigation.navigate("Add")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Add"
        options={({ navigation }) => ({ title: "Ajouter un vinyle" })}
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
              onPress={() => navigation.navigate("Add")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Add"
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
              onPress={() => navigation.navigate("Add")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Add"
        options={({ navigation }) => ({ title: "Ajouter un vinyle" })}
        component={AddVinyl}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    //crée la BDD si n'existe pas
    initDB();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
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
  );
}
