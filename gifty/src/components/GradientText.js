import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { gradients } from '../theme/layout';

/**
 * Gradient-filled text rendered as SVG.
 * Pure SVG implementation avoids @react-native-masked-view dependency.
 */
export default function GradientText({ children, fontSize = 28, fontWeight = '800', letterSpacing = -0.5, height }) {
  const h = height ?? fontSize * 1.25;
  const w = String(children).length * fontSize * 0.6 + fontSize;

  return (
    <Svg height={h} width={w}>
      <Defs>
        <LinearGradient id="gradText" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={gradients.brand[0]} />
          <Stop offset="1" stopColor={gradients.brand[1]} />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#gradText)"
        x="0"
        y={fontSize}
        fontSize={fontSize}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        fontFamily="Inter_800ExtraBold"
      >
        {children}
      </SvgText>
    </Svg>
  );
}
