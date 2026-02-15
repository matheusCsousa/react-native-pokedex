import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: string[];
}

export default function Details() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const params = useLocalSearchParams();

  console.log(JSON.stringify(pokemon, null, 2));
  useEffect(() => {
    // @ts-ignore
    fetchPokemon(params.name);
  }, []);

  async function fetchPokemon(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      setPokemon({
        name: data.name,
        image: data.sprites.front_default,
        imageBack: data.sprites.back_default,
        types: data.types,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16, flex: 1 }}>
      <View style={{ gap: 16, padding: 16, flex: 1 }}>
        <Text>{pokemon?.name}</Text>
        {pokemon && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        )}
        {pokemon && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
