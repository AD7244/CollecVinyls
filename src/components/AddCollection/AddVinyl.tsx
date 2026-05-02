import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Button,
  Searchbar,
  RadioButton,
  Text,
  useTheme,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addVinyl, updateVinyl } from "../../database/Database";
import { Vinyl, NewVinyl } from "../../type/Vinyl";
import { makeAddVinylStyles } from "../../style/styles";

interface DeezerAlbum {
  id: number;
  title: string;
  cover_medium: string;
  cover_big: string;
  release_date?: string;
  artist: {
    name: string;
  };
}

const AddVinyl = () => {
  const route = useRoute();
  const { vinyl } = (route.params || {}) as { vinyl?: Vinyl };

  const theme = useTheme();
  const styles = makeAddVinylStyles(theme);

  const id = useRef(vinyl?.id || 0); // Utilisé pour l'édition, sinon 0 pour un nouvel ajout
  const [searchText, setSearchText] = useState("");
  const [albums, setAlbums] = useState<DeezerAlbum[]>([]);
  const [artist, setArtist] = useState(vinyl?.artist || "");
  const [title, setTitle] = useState(vinyl?.title || "");
  const [releaseYear, setReleaseYear] = useState(
    vinyl?.releaseYear?.toString() || "",
  );
  const [addedDate, setAddedDate] = useState(
    vinyl?.addedDate || new Date().toISOString().split("T")[0],
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

  const searchAlbum = async (query) => {
    setSearchText(query);

    if (query.length > 2) {
      // On cherche seulement après 3 caractères
      try {
        const response = await fetch(
          `https://api.deezer.com/search/album?q=${query}`,
        );
        const result = await response.json();
        setAlbums(result.data || []);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    } else {
      setAlbums([]);
    }
  };

  const handleSelectAlbum = async (album: DeezerAlbum) => {
    Keyboard.dismiss();
    let albumResult = null;
    try {
      const response = await fetch(`https://api.deezer.com/album/${album.id}`);
      albumResult = await response.json();
    } catch (error) {
      console.error("Erreur dans la récupèration de la date :", error);
    }
    console.log("albumResult", albumResult);
    const year = albumResult ? albumResult.release_date.split("-")[0] : "";
    setReleaseYear(year);
    setArtist(album.artist.name);
    setTitle(album.title);
    setCoverPath(album.cover_big);

    setAlbums([]);
    setSearchText("");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchSection, { zIndex: 5000 }]}>
        <Searchbar
          placeholder="Search"
          value={searchText}
          onChangeText={searchAlbum}
          mode="bar"
        />
      </View>

      {albums.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={albums}
            keyboardShouldPersistTaps="always"
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.albumItem}
                onPress={() => handleSelectAlbum(item)}
              >
                <Image
                  source={{ uri: item.cover_medium }}
                  style={styles.cover}
                />
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.artist}>{item.artist.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <TextInput
          label="Artiste"
          value={artist}
          onChangeText={setArtist}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Titre"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Année de sortie (Optionnel)"
          value={releaseYear}
          onChangeText={setReleaseYear}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Date d'ajout"
          value={addedDate}
          onChangeText={setAddedDate}
          mode="outlined"
          style={styles.input}
        />
        <Button onPress={handlePickImage}>Choisir une image (Optionnel)</Button>
        {coverPath ? (
          <Image source={{ uri: coverPath }} style={styles.imagePreview} />
        ) : null}

        <Text style={{ marginTop: 10 }}>Statut :</Text>
        <RadioButton.Group
          onValueChange={(value) => setStatus(value as "wish" | "got")}
          value={status}
        >
          <View style={styles.radioGroup}>
            <RadioButton.Item label="Souhaité" value="wish" />
            <RadioButton.Item label="En possession" value="got" />
          </View>
        </RadioButton.Group>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Ajouter
        </Button>
      </ScrollView>
    </View>
  );
};
export default AddVinyl;
