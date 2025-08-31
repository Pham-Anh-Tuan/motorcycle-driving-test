type DonutChartProps = { data: { label: string; value: number }[]; size?: number };
const normalizeSmallSlices = (data: { label: string; value: number }[], minPercent = 0.05) => {
    const total = data.reduce((s, d) => s + d.value, 0);
    let adjusted = data.map(d => ({
        ...d,
        value: Math.max(d.value, total * minPercent)
    }));
    const newTotal = adjusted.reduce((s, d) => s + d.value, 0);
    return adjusted.map(d => ({
        ...d,
        value: (d.value / newTotal) * total // scale lại theo tổng ban đầu
    }));
};

export const DonutChart: React.FC<DonutChartProps> = ({ data, size = 160 }) => {
    const normalized = normalizeSmallSlices(data); // 👉 xử lý trước
    const total = normalized.reduce((s, d) => s + d.value, 0) || 1;
    const radius = size / 2;
    const stroke = 28;
    let cumulative = 0;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
            <g transform={`translate(${radius},${radius})`}>
                {normalized.map((d, i) => {
                    const start = (cumulative / total) * Math.PI * 2;
                    cumulative += d.value;
                    const end = (cumulative / total) * Math.PI * 2;
                    const large = end - start > Math.PI ? 1 : 0;
                    const x1 = Math.cos(start - Math.PI / 2) * (radius - stroke / 2);
                    const y1 = Math.sin(start - Math.PI / 2) * (radius - stroke / 2);
                    const x2 = Math.cos(end - Math.PI / 2) * (radius - stroke / 2);
                    const y2 = Math.sin(end - Math.PI / 2) * (radius - stroke / 2);
                    const path = `M ${x1} ${y1} A ${radius - stroke / 2} ${radius - stroke / 2} 0 ${large} 1 ${x2} ${y2}`;
                    const colorClass = [
                        "fill-sky-500",
                        "fill-emerald-500",
                        "fill-rose-500",
                        "fill-amber-500",
                        "fill-indigo-500",
                    ][i % 5];
                    return (
                        <path key={d.label} d={path} stroke="none" className={colorClass} strokeWidth={stroke} />
                    );
                })}
                <circle r={radius - stroke - 2} fill="white" />
                <text x="0" y="4" textAnchor="middle" fontSize={14} fill="#0f172a">
                    {total}
                </text>
            </g>
        </svg>
    );
};