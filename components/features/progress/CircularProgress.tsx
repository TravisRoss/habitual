import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

interface CircularProgressProps {
  value: number;
  size?: number;
  thickness?: number;
  fillColor?: string;
  textColor?: string;
}

export default function CircularProgress({ value, size = 80, thickness = 10, fillColor = "#f59e0b", textColor = "#f59e0b" }: CircularProgressProps) {
  const center = size / 2;

  return (
    <RadialBarChart 
      width={size}
      height={size}
      cx={center}
      cy={center}
      innerRadius={center - thickness}
      outerRadius={center}
      startAngle={90}
      endAngle={-270}
      data={[{ value }]}
      responsive
    >
      <PolarAngleAxis
        type="number"
        domain={[0, 100]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        background={{ fill: "rgba(255,255,255,0.3)" }}
        dataKey="value"
        angleAxisId={0}
        fill={fillColor}  
        cornerRadius={10}
      />
      <text
        x={center}
        y={center + 5}
        textAnchor="middle"
        fill={textColor ? textColor : "#f59e0b"}
        fontWeight="bold"
        fontSize={16}
        className="font-bold"
      >
        {value}%
      </text>
    </RadialBarChart>
  );
}
