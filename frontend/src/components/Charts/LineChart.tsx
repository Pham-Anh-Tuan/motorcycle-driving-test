// src/components/LineChart.tsx
import React from "react";

type Point = { xLabel: string; y: number };
type Props = { data: Point[]; height?: number; title?: string };

export const LineChart: React.FC<Props> = ({ data, height = 210, title }) => {
    const w = 700;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const innerW = w - paddingLeft;
    const innerH = height - paddingBottom;
    const max = Math.max(...data.map(d => d.y), 1);

    const points = data.map((d, i) => {
        const x = paddingLeft + (i / Math.max(1, data.length - 1)) * innerW;
        const y = paddingBottom + innerH - (d.y / max) * innerH;
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
            {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
            <svg width="100%" viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="xMinYMin meet">
                {/* grid */}
                {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => (
                    <line key={idx} x1={paddingLeft} x2={w} y1={paddingBottom + innerH * (1 - t)} y2={paddingBottom + innerH * (1 - t)} stroke="#eee" />
                ))}
                {/* polyline */}
                <polyline fill="none" stroke="#0ea5e9" strokeWidth={2.5} points={points} strokeLinecap="round" strokeLinejoin="round" />
                {/* points */}
                {data.map((d, i) => {
                    const x = paddingLeft + (i / Math.max(1, data.length - 1)) * innerW;
                    const y = paddingBottom + innerH - (d.y / max) * innerH;
                    return <circle key={i} cx={x} cy={y} r={4} fill="#0ea5e9" />;
                })}
                {/* labels */}
                {data.map((d, i) => {
                    const x = paddingLeft + (i / Math.max(1, data.length - 1)) * innerW;
                    return <text key={i} x={x} y={height - 6} fontSize={11} textAnchor="middle" fill="#444">{d.xLabel}</text>;
                })}
            </svg>
        </div>
    );
};
