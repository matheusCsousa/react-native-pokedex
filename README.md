# React Native Pokédex

A mobile Pokédex built with React Native and Expo. Fetches the original 151 Pokémon from [PokéAPI](https://pokeapi.co/) and displays them with type-based color theming.

## Features

- Lists all 151 original Pokémon with sprites and types
- Type-based background color for each card (18 types supported)
- Detail screen per Pokémon
- Loading indicator while fetching data

## Tech

- React Native 0.81 + React 19
- Expo 54 + Expo Router (file-based navigation)
- TypeScript
- PokéAPI (no auth required)

## Run

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS, or `w` for web.

## Screens

| Screen | Route | Description |
|---|---|---|
| Pokémon list | `/` | FlatList of all 151 Pokémon |
| Pokémon detail | `/details?name=:name` | Sprite and type info |

## Project Structure

```
app/
├── _layout.tsx                        # Expo Router root layout
├── index.tsx                          # Pokémon list screen
├── details.tsx                        # Pokémon detail screen
├── utils.ts                           # Pokemon interface + colorByType enum
└── components/
    └── ComponentPokemonCard.tsx       # Card with sprite, name and types
```
