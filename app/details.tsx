import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colorByType, Pokemon } from "./utils";

export default function Details() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    async function fetchPokemon(name: string) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        ).then((res) => res.json());
        const data = response;

        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          imageBack: data.sprites.back_default,
          types: data.types,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    // @ts-ignore
    fetchPokemon(params.name);
    console.log("fetchPokemon");
  }, [params.name]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ gap: 16, padding: 16, alignItems: "center" }}
    >
      <View
        style={{
          // @ts-ignore
          backgroundColor: colorByType[pokemon?.types[0].type.name] + 50,
          width: 300,
          // height: 450,
          padding: 32,
          // paddingBottom: 48,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 36, fontWeight: "bold" }}>
          {pokemon?.name}
        </Text>
        {pokemon && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 250, height: 250 }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
