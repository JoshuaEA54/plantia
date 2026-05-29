import { StatusBar } from 'expo-status-bar';
import { getStatusBarStyleForBackground } from '@/src/utils/color';

type Props = {
  backgroundColor: string;
};

export default function AppStatusBar({ backgroundColor }: Props) {
  const style = getStatusBarStyleForBackground(backgroundColor);

  return <StatusBar style={style} translucent backgroundColor="transparent" />;
}
