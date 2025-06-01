import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addVinyl, updateVinyl } from "../../database/Database";
import { Vinyl, NewVinyl } from "../../type/Vinyl";
import { AddVinylstyles } from "../../style/styles";

const AddVinyl = () => {
  const route = useRoute();
  const { vinyl } = (route.params || {}) as { vinyl?: Vinyl };

  const id = useRef(vinyl?.id || 0); // Utilisé pour l'édition, sinon 0 pour un nouvel ajout
  const [artist, setArtist] = useState(vinyl?.artist || "");
  const [title, setTitle] = useState(vinyl?.title || "");
  const [releaseYear, setReleaseYear] = useState(
    vinyl?.releaseYear?.toString() || ""
  );
  const [addedDate, setAddedDate] = useState(
    vinyl?.addedDate || new Date().toISOString().split("T")[0]
  );
  const [coverPath, setCoverPath] = useState(vinyl?.coverPath || "");
  const [status, setStatus] = useState<"wish" | "got">(vinyl?.status || "wish");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverPath(result.assets[0].uri); // récupère le chemin vers l'image
    }
  };

  const handleSubmit = async () => {
    if (!artist || !title || !status || !addedDate) return;

    if (id.current === 0) {
      const vinyl: NewVinyl = {
        artist,
        title,
        releaseYear: releaseYear ? parseInt(releaseYear, 10) : undefined,
        addedDate,
        coverPath,
        status,
      };
      await addVinyl(vinyl);
    } else {
      const updatedVinyl: Vinyl = {
        id: id.current,
        artist,
        title,
        releaseYear: releaseYear ? parseInt(releaseYear, 10) : undefined,
        addedDate,
        coverPath,
        status,
      };
      await updateVinyl(updatedVinyl);
    }

    navigation.navigate("Home");
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission d'accéder à la galerie refusée");
      }
    })();
  }, []);

  return (
    <View style={AddVinylstyles.container}>
      <TextInput
        label="Artiste"
        value={artist}
        onChangeText={setArtist}
        mode="outlined"
        style={AddVinylstyles.input}
      />
      <TextInput
        label="Titre"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={AddVinylstyles.input}
      />
      <TextInput
        label="Année de sortie (Optionnel)"
        value={releaseYear}
        onChangeText={setReleaseYear}
        keyboardType="numeric"
        mode="outlined"
        style={AddVinylstyles.input}
      />
      <TextInput
        label="Date d'ajout"
        value={addedDate}
        onChangeText={setAddedDate}
        mode="outlined"
        style={AddVinylstyles.input}
      />
      <Button onPress={handlePickImage}>Choisir une image (Optionnel)</Button>
      {coverPath ? (
        <Image source={{ uri: coverPath }} style={AddVinylstyles.image} />
      ) : null}

      <Text style={{ marginTop: 10 }}>Statut :</Text>
      <RadioButton.Group
        onValueChange={(value) => setStatus(value as "wish" | "got")}
        value={status}
      >
        <View style={AddVinylstyles.radioGroup}>
          <RadioButton.Item label="Souhaité" value="wish" />
          <RadioButton.Item label="En possession" value="got" />
        </View>
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={AddVinylstyles.button}
      >
        Ajouter
      </Button>
    </View>
  );
};

export default AddVinyl;
