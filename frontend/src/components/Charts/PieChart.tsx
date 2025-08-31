// src/components/PieChart.tsx
import React from "react";

type Slice = { label: string; value: number; color?: string };
type Props = { data: Slice[]; radius?: number; innerRadius?: number; title?: string };

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return { x: cx + (r * Math.cos(angleInRadians)), y: cy + (r * Math.sin(angleInRadians)) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export const PieChart: React.FC<Props> = ({ data, radius = 80, innerRadius = 40, title }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let start = 0;
  const cx = radius + 10;
  const cy = radius + 10;
  const size = (radius + 10) * 2;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
      <svg width={size} height={size}>
        {data.map((d, i) => {
          const sliceAngle = (d.value / total) * 360;
          const end = start + sliceAngle;
          const path = describeArc(cx, cy, radius, start, end);
          const color = d.color || ["#0ea5e9", "#06b6d4", "#f97316", "#f43f5e", "#a78bfa", "#84cc16"][i % 6];
          start = end;
          return <path key={i} d={path} fill={color} stroke="#fff" strokeWidth={1} />;
        })}
        {/* donut hole if innerRadius > 0 */}
        {innerRadius > 0 && <circle cx={cx} cy={cy} r={innerRadius} fill="white" />}

        {/* total text ở giữa */}
        {innerRadius > 0 && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={16}
            fontWeight="bold"
            fill="#0f172a"
          >
            {total}
          </text>
        )}
      </svg>

      <div className="mt-3 space-y-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center text-sm">
            <span className="w-3 h-3 rounded mr-2" style={{ backgroundColor: d.color || ["#0ea5e9", "#06b6d4", "#f97316", "#f43f5e", "#a78bfa", "#84cc16"][i % 6] }} />
            <span className="flex-1">{d.label}</span>
            <span className="font-medium">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
