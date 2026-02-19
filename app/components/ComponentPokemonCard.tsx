import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { colorByType, Pokemon } from "../utils";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
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
        {pokemon.types.map((type: any) => (
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
