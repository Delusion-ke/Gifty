import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';
import { palette } from '../theme/colors';

/**
 * Custom Gifty logo: gift box outline + bow + heart.
 * Uses the brand gradient (or a single color when monochrome).
 */
export default function GiftyLogo({ size = 64, monochrome = false, color }) {
  const stroke = size * 0.085;
  const strokeColor = monochrome ? color || palette.purple : 'url(#giftyGrad)';

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="giftyGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={palette.purple} />
          <Stop offset="1" stopColor={palette.pinkAccent} />
        </LinearGradient>
      </Defs>

      {/* Box */}
      <Rect
        x="12"
        y="32"
        width="76"
        height="56"
        rx="8"
        ry="8"
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeLinejoin="round"
      />

      {/* Bow left */}
      <Path
        d="M 50 32 C 42 18, 22 12, 30 32"
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bow right */}
      <Path
        d="M 50 32 C 58 18, 78 12, 70 32"
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Heart inside */}
      <Path
        d="M 50 76 C 72 60, 65 38, 50 51 C 35 38, 28 60, 50 76 Z"
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
