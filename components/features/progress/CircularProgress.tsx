interface CircularProgressProps {
  value: number;
  size?: number;
  thickness?: number;
  fillColor?: string;
  textColor?: string;
  className?: string;
}

export default function CircularProgress({
  value,
  size = 80,
  thickness = 10,
  fillColor = "#f59e0b",
  textColor = "#f59e0b",
  className = "",
}: CircularProgressProps) {
  const center = size / 2;
  const radius = center - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className={className}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={thickness}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={fillColor}
        strokeWidth={thickness}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x={center}
        y={center + 5}
        textAnchor="middle"
        fill={textColor}
        fontWeight="bold"
        fontSize={16}
      >
        {value}%
      </text>
    </svg>
  );
}
