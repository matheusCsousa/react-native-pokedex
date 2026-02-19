import { useEffect, useState } from "react";
import { Text, FlatList, ActivityIndicator, View } from "react-native";
import { Pokemon } from "./utils";
import PokemonCard from "./components/ComponentPokemonCard";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        data.results.map(async (pokemon: { name: string; url: string }) => {
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
      setError("Failed to load pokemons");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        alignItems: "center",
      }}
    ></FlatList>
  );
}
