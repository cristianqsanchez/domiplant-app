# Domiplant App

## Stack
- Expo 54 / RN 0.81.5 / React 19.1
- NativeWind (Tailwind via `className`), no StyleSheet
- Expo Router (file-based routing in `app/`)
- `lucide-react-native` for icons
- Supabase (MCP at `bcwtrjwvgouaifcoqwmv`, no client lib installed yet)

## Commands
- `npm start` — dev server
- `npm run web` — dev in browser
- `npm run lint` — ESLint + Prettier check
- `npm run format` — auto-fix
- No typecheck script; run `npx tsc --noEmit` manually
- No test framework configured

## Architecture
- `app/` — Expo Router screens (file-based routes)
- `components/` — shared RN components
- `@/*` path alias → `src/*` (tsconfig)
- Install `@supabase/supabase-js`, create client at `src/lib/supabase.ts`
- Auth via Supabase Auth; role check from `profiles` table
- Env vars via `expo-constants` or `react-native-dotenv`

## Migration rules (Figma web code → React Native)
- `<div>/<header>/<section>/<main>/<span>/<h1-6>/<p>` → `<View>`, `<Text>`, `<ScrollView>`, `<Pressable>`
- `react-router` `Link` → `expo-router` `Link`
- `react-router` navigation → `expo-router` `useRouter()`
- All mock data → Supabase queries (`supabase.from(...)`)

## DB roles
- `profiles.role`: `production`, `driver`
- Driver and production are the two key personas
- RLS enabled on all tables

## Code style
- Prettier: singleQuote, trailingComma es5, printWidth 100, bracketSameLine
- ESLint: expo-config, `react/display-name: off`
- React 19: use `use()` not `useContext()`, `ref` is a regular prop (no `forwardRef`)
