import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

// Más suave y lento: stiffness bajo = movimiento lento, damping alto = sin rebote excesivo
const SPRING_ENTRY = { damping: 18, stiffness: 45 } as const;
const SPRING_EXIT = { damping: 20, stiffness: 55 } as const;

// Tiempo mínimo que las plantas están en pantalla antes de salir (ms)
const MIN_DISPLAY_MS = 1200;

const { width: W, height: H } = Dimensions.get("window");

const OFFSET = {
  arriba: { x: 0, y: -H },
  abajo: { x: 0, y: H },
  izquierda: { x: -W, y: 0 },
  derecha: { x: W, y: 0 },
  izquierdaAbajo: { x: -W * 0.7, y: H * 0.7 },
  derechaAbajo: { x: W * 0.7, y: H * 0.7 },
};

// Posición de reposo: fracción del contenedor que queda OCULTA tras el borde.
// 0.6 = solo el 40% del contenedor asoma. Ajustar para más/menos presencia.
// Debe coincidir con los tamaños de contenedor del StyleSheet (H*0.34, W*0.40, H*0.42, W*0.45).
const HIDE = 0.6;
const PEEK = {
  arriba: { y: -(H * 0.34 * HIDE) },
  abajo: { y: H * 0.34 * HIDE },
  izquierda: { x: -(W * 0.4 * HIDE) },
  derecha: { x: W * 0.4 * HIDE },
  izqAbajo: { x: -(W * 0.45 * HIDE), y: H * 0.42 * HIDE },
  derAbajo: { x: W * 0.45 * HIDE, y: H * 0.42 * HIDE },
};

type Props = {
  isReady: boolean;
  onComplete: () => void;
};

export default function AnimatedSplash({ isReady, onComplete }: Props) {
  const tyArriba = useSharedValue(OFFSET.arriba.y);
  const tyAbajo = useSharedValue(OFFSET.abajo.y);
  const txIzquierda = useSharedValue(OFFSET.izquierda.x);
  const txDerecha = useSharedValue(OFFSET.derecha.x);
  const txIzqAbajo = useSharedValue(OFFSET.izquierdaAbajo.x);
  const tyIzqAbajo = useSharedValue(OFFSET.izquierdaAbajo.y);
  const txDerAbajo = useSharedValue(OFFSET.derechaAbajo.x);
  const tyDerAbajo = useSharedValue(OFFSET.derechaAbajo.y);

  // Indica que la animación de entrada terminó
  const [entryDone, setEntryDone] = useState(false);

  // Entrada: se dispara al montar
  useEffect(() => {
    tyArriba.value = withSpring(PEEK.arriba.y, SPRING_ENTRY);
    tyAbajo.value = withSpring(PEEK.abajo.y, SPRING_ENTRY);
    txIzquierda.value = withSpring(PEEK.izquierda.x, SPRING_ENTRY);
    txDerecha.value = withSpring(PEEK.derecha.x, SPRING_ENTRY);
    txIzqAbajo.value = withSpring(PEEK.izqAbajo.x, SPRING_ENTRY);
    tyIzqAbajo.value = withSpring(PEEK.izqAbajo.y, SPRING_ENTRY);
    txDerAbajo.value = withSpring(PEEK.derAbajo.x, SPRING_ENTRY);
    // Callback en la última planta — marca entrada como completa
    tyDerAbajo.value = withSpring(PEEK.derAbajo.y, SPRING_ENTRY, (finished) => {
      if (finished) runOnJS(setEntryDone)(true);
    });
  }, []);

  // Salida: espera a que TANTO la entrada haya terminado COMO la app esté lista
  useEffect(() => {
    if (!entryDone || !isReady) return;

    // Pausa de MIN_DISPLAY_MS antes de salir — el usuario ve el logo
    tyArriba.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.arriba.y, SPRING_EXIT),
    );
    tyAbajo.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.abajo.y, SPRING_EXIT),
    );
    txIzquierda.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.izquierda.x, SPRING_EXIT),
    );
    txDerecha.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.derecha.x, SPRING_EXIT),
    );
    txIzqAbajo.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.izquierdaAbajo.x, SPRING_EXIT),
    );
    tyIzqAbajo.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.izquierdaAbajo.y, SPRING_EXIT),
    );
    txDerAbajo.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.derechaAbajo.x, SPRING_EXIT),
    );
    // Callback en la última — navega cuando todas han salido
    tyDerAbajo.value = withDelay(
      MIN_DISPLAY_MS,
      withSpring(OFFSET.derechaAbajo.y, SPRING_EXIT, (finished) => {
        if (finished) runOnJS(onComplete)();
      }),
    );
  }, [entryDone, isReady]);

  const styleArriba = useAnimatedStyle(() => ({
    transform: [{ translateY: tyArriba.value }],
  }));
  const styleAbajo = useAnimatedStyle(() => ({
    transform: [{ translateY: tyAbajo.value }],
  }));
  const styleIzquierda = useAnimatedStyle(() => ({
    transform: [{ translateX: txIzquierda.value }],
  }));
  const styleDerecha = useAnimatedStyle(() => ({
    transform: [{ translateX: txDerecha.value }],
  }));
  const styleIzqAbajo = useAnimatedStyle(() => ({
    transform: [
      { translateX: txIzqAbajo.value },
      { translateY: tyIzqAbajo.value },
    ],
  }));
  const styleDerAbajo = useAnimatedStyle(() => ({
    transform: [
      { translateX: txDerAbajo.value },
      { translateY: tyDerAbajo.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/images/splash/planta-arriba.png")}
        style={[styles.arriba, styleArriba]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("@/assets/images/splash/planta-abajo.png")}
        style={[styles.abajo, styleAbajo]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("@/assets/images/splash/planta-izquierda.png")}
        style={[styles.izquierda, styleIzquierda]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("@/assets/images/splash/planta-derecha.png")}
        style={[styles.derecha, styleDerecha]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("@/assets/images/splash/planta-izquierda-abajo.png")}
        style={[styles.izquierdaAbajo, styleIzqAbajo]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("@/assets/images/splash/planta-derecha-abajo.png")}
        style={[styles.derechaAbajo, styleDerAbajo]}
        resizeMode="cover"
      />

      <View style={[styles.center, { pointerEvents: "none" }]}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.title}>Plantia</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "visible",
  },
  arriba: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: H * 0.34,
    zIndex: 1,
  },
  abajo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: H * 0.34,
    zIndex: 1,
  },
  izquierda: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: W * 0.4,
    zIndex: 2,
  },
  derecha: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: W * 0.4,
    zIndex: 2,
  },
  izquierdaAbajo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: W * 0.45,
    height: H * 0.42,
    zIndex: 3,
  },
  derechaAbajo: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: W * 0.45,
    height: H * 0.42,
    zIndex: 3,
  },
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    marginTop: 12,
    fontSize: 36,
    fontFamily: "Nunito_700Bold",
    color: "#2e5e36",
    letterSpacing: 1,
  },
});
