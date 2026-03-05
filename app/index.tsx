import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(app)/(tabs)/profile" />; // los paréntesis () son grupos de rutas que NO aparecen en la URL
}
