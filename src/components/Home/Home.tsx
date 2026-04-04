import React, { useCallback, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { Button } from "react-native-paper";
import CardVinyl from "../CardVinyl";
import { deleteVinyl, getVinyls } from "../../database/Database";
import { Vinyl } from "../../type/Vinyl";
import { HomeStyles } from "../../style/styles";

const Home = () => {
  const [allVinyls, setAllVinyls] = React.useState<Vinyl[]>();

  //! BUG : Cette fonction n'est pas appelé à l'ouverture. Ainsi si je supprime un vinyl depuis la wishlist, je le vois toujours ici
  const handleGetVinyls = async () => {
    const allVinyls = await getVinyls();
    setAllVinyls(allVinyls);
  };

  const handleDeleteVinyl = (vinylToDelete: Vinyl) => {
    // Supprime le vinyle de l'état local
    setAllVinyls((prevVinyls) =>
      prevVinyls!.filter((vinyl) => vinyl.id !== vinylToDelete.id)
    );
    deleteVinyl(vinylToDelete); // On supprime le vinyle de la base de données aussi
  };

  // recharge les vinyles à chaque retour sur l’écran
  useFocusEffect(
    useCallback(() => {
      handleGetVinyls();
    }, [])
  );

  useEffect(() => {
    handleGetVinyls();
  }, []);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <>
      <View>
        <Text style={HomeStyles.title}>
          {allVinyls?.length === 0
            ? "Aucun  Vinyle dans la collection"
            : "Derniers ajouts dans la collec"}
        </Text>
      </View>

      {allVinyls?.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary",
          }}
        >
          <Button
            mode="contained"
            onPress={() => navigation.navigate("AddOrModify")}
          >
            Ajouter mon premier vinyle
          </Button>
        </View>
      )}

      <ScrollView contentContainerStyle={HomeStyles.grid}>
        {allVinyls
          ?.slice(-4)
          .reverse()
          .map((vinyl) => (
            <CardVinyl
              key={vinyl.id}
              vinyl={vinyl}
              onDeleteVinyl={handleDeleteVinyl}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default Home;
