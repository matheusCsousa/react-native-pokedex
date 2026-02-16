import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
  };
}

const colorByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(pokemons[0], null, 2));
  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151",
      );
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemon);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        alignItems: "center",
      }}
    >
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
        >
          <View
            style={{
              // @ts-ignore
              backgroundColor: colorByType[pokemon.types[0].type.name] + 50,
              width: 500,
              height: 450,
              padding: 32,
              paddingBottom: 48,
              borderRadius: 20,
            }}
          >
            <Text style={styles.name}>{pokemon.name}</Text>
            {pokemon.types.map((type) => (
              <Text key={type.type.name} style={styles.type}>
                {type.type.name}
              </Text>
            ))}

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 250, height: 250 }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
  },
});
