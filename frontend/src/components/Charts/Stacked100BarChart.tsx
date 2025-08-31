import React, { useMemo, useState } from "react";

export type Segment = {
    label: string;
    value: number;
    color?: string; // optional, tailwind-compatible hex or css color
};

type Props = {
    data: Segment[]; // segments to stack
    height?: number; // px
    className?: string;
    showLegend?: boolean;
    rounded?: boolean;
};

export const Stacked100BarChart: React.FC<Props> = ({
    data,
    height = 36,
    className = "",
    showLegend = true,
    rounded = true,
}) => {
    const total = useMemo(() => Math.max(0, data.reduce((s, d) => s + Math.max(0, d.value), 0)), [data]);
    const segments = useMemo(
        () =>
            data.map((s) => {
                const v = Math.max(0, s.value);
                const pct = total === 0 ? 0 : (v / total) * 100;
                return { ...s, value: v, pct };
            }),
        [data, total]
    );

    // Tooltip state
    const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

    const handleMouseMove = (e: React.MouseEvent, seg: (typeof segments)[0]) => {
        const rect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
        const x = e.clientX - (rect?.left ?? 0);
        const y = (rect?.top ?? 0) - e.clientY + 12; // prefer top anchored
        setTooltip({
            x: e.clientX + 12,
            y: e.clientY - 12,
            content: `${seg.label}: ${seg.value} (${seg.pct.toFixed(1)}%)`,
        });
    };

    const handleLeave = () => setTooltip(null);

    return (
        <div className={`w-full ${className}`}>
            <div className="bg-white p-3 rounded-2xl shadow-sm">
                <div className="w-full overflow-x-auto">
                    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" role="img" aria-label="100% stacked bar chart">
                        {/* background track */}
                        <defs>
                            <linearGradient id="stackGradient" x1="0" x2="1">
                                <stop offset="0%" stopColor="#f3f4f6" />
                                <stop offset="100%" stopColor="#e5e7eb" />
                            </linearGradient>
                        </defs>

                        <rect x={0} y={0} width="100" height={height} fill="url(#stackGradient)" rx={rounded ? 8 : 0} ry={rounded ? 8 : 0} />

                        {/* segments */}
                        {segments.reduce<{ acc: number; nodes: React.ReactElement[] }>(
                            (acc, seg, idx) => {
                                const start = acc.acc;
                                const w = seg.pct; // percent of 100
                                if (w > 0.0001) {
                                    const color = seg.color ?? ["#0ea5e9", "#06b6d4", "#f97316", "#f43f5e", "#a78bfa", "#84cc16"][idx % 6];
                                    acc.nodes.push(
                                        <g key={seg.label}>
                                            <rect
                                                x={start}
                                                y={0}
                                                width={w}
                                                height={height}
                                                fill={color}
                                                rx={start === 0 && rounded ? 8 : 0}
                                                ry={start === 0 && rounded ? 8 : 0}
                                                onMouseMove={(e) => handleMouseMove(e, seg)}
                                                onMouseLeave={handleLeave}
                                                role="presentation"
                                            />
                                        </g>
                                    );
                                }
                                acc.acc = start + w;
                                return acc;
                            },
                            { acc: 0, nodes: [] }
                        ).nodes}
                        {/* border for aesthetic */}
                        <rect x={0} y={0} width="100" height={height} fill="none" stroke="#e6e7eb" rx={rounded ? 8 : 0} ry={rounded ? 8 : 0} />
                    </svg>
                </div>

                {/* percentages below the bar (labels) */}
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                    {segments.map((seg, idx) => (
                        <div key={seg.label} className="flex items-center text-xs">
                            <span
                                className="inline-block w-3 h-3 mr-2 rounded-sm"
                                style={{ background: seg.color ?? ["#0ea5e9", "#06b6d4", "#f97316", "#f43f5e", "#a78bfa", "#84cc16"][idx % 6] }}
                            />
                            <div className="text-gray-700 whitespace-nowrap">
                                <span className="font-medium">{seg.label}</span>
                                <span className="ml-1 text-gray-500">• {seg.pct.toFixed(1)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tooltip overlay (absolute positioned) */}
            {tooltip && (
                <div
                    className="fixed pointer-events-none z-50 bg-black text-white text-xs px-2 py-1 rounded shadow"
                    style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-6px, -100%)" }}
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};

export default Stacked100BarChart;
