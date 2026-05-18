import React from 'react';
interface ADashLinesProps {
  variant?: 'grid' | 'arc';
  stroke?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export default function ADashLines({
  variant = 'grid',
  stroke = '#FFE7C9',
  opacity = 0.4,
  style = {},
}: ADashLinesProps) {
  const base: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    ...style,
  };

  if (variant === 'arc') {
    return (
      <svg viewBox="0 0 1435 691" preserveAspectRatio="none" style={base} aria-hidden="true">
        <path
          d="M1434.31 870.374C1436.46 799.018 1282.19 705.699 1121.21 620.332C965.68 524.682 958.615 503.23 863.282 442.878C767.9 381.956 622.76 569.253 481.671 587.721C340.535 605.617 79.1842 -58.8238 -45.5064 4.51079"
          stroke={stroke}
          strokeOpacity={opacity}
          strokeWidth="0.6"
          strokeDasharray="10.13 10.13"
          fill="none"
        />
        <path
          d="M1230 -22.5243C1075.21 -39.2602 839.669 343.95 787.357 350.168C735.358 346.648 208.222 147.795 160.064 142.588C117.514 137.988 3.4202 321.316 -74 403.79"
          stroke={stroke}
          strokeOpacity={opacity * 0.5}
          strokeWidth="1.8"
          strokeDasharray="10.13 10.13"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1512 784"
      preserveAspectRatio="xMidYMid slice"
      style={base}
      aria-hidden="true"
    >
      <g stroke={stroke} strokeOpacity={opacity} strokeDasharray="10.13 10.13" fill="none">
        <line x1="61.43" y1="-107.93" x2="164.39" y2="1278.96" />
        <line x1="374.91" y1="-131.20" x2="477.87" y2="1255.69" />
        <line x1="688.39" y1="-154.47" x2="791.35" y2="1232.42" />
        <line x1="999.76" y1="-177.58" x2="1102.71" y2="1209.30" />
        <line x1="1310.63" y1="-200.66" x2="1413.58" y2="1186.23" />
        <line x1="-241.38" y1="52.35" x2="2104.50" y2="-121.79" />
        <line x1="-231.17" y1="189.89" x2="2114.71" y2="15.75" />
        <line x1="-220.96" y1="327.44" x2="2124.92" y2="153.29" />
        <line x1="-210.75" y1="464.98" x2="2135.13" y2="290.84" />
        <line x1="-200.37" y1="604.81" x2="2145.51" y2="430.67" />
        <line x1="-190.33" y1="740.06" x2="2155.55" y2="565.92" />
        <line x1="-180.12" y1="877.61" x2="2165.76" y2="703.46" />
      </g>
    </svg>
  );
}
