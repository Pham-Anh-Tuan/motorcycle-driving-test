type SeriesItem = { label: string; value: number };

type Props = {
    data: SeriesItem[];
    height?: number;
    className?: string;
    showValues?: boolean;
    title?: string;
};

export const BarChart: React.FC<Props> = ({
    data,
    height = 220,
    className = "",
    showValues = true,
    title,
}) => {
    const max = Math.max(...data.map((d) => d.value), 1);

    // margin chart
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 20;
    const paddingRight = 20;

    const innerWidth = 600;
    const innerHeight = height - paddingTop - paddingBottom;

    const barWidth = Math.max(
        20,
        (innerWidth - paddingLeft - paddingRight) / data.length - 8
    );

    const svgHeight = height + 30; // thêm khoảng trống để label không bị ẩn

    function wrapText(label: string, maxChars: number): string[] {
        const words = label.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        words.forEach((word) => {
            if ((currentLine + " " + word).trim().length <= maxChars) {
                currentLine = (currentLine + " " + word).trim();
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                }
                currentLine = word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    return (
        <div
            className={`bg-white rounded-2xl p-4 pb-0 shadow-sm ${className}`}
        >
            {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}

            <div className="overflow-x-auto">
                <svg
                    width={Math.max(innerWidth, data.length * (barWidth + 8))}
                    height={svgHeight}
                >
                    {/* y grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                        const y = paddingTop + innerHeight * (1 - t);
                        return (
                            <line
                                key={i}
                                x1={paddingLeft}
                                x2="100%"
                                y1={y}
                                y2={y}
                                stroke="#e6e6e6"
                            />
                        );
                    })}

                    {/* bars */}
                    {data.map((d, i) => {
                        const x = paddingLeft + i * (barWidth + 8);
                        const h = (d.value / max) * innerHeight;
                        const y = paddingTop + (innerHeight - h);

                        return (
                            <g key={i} transform={`translate(${x},0)`}>
                                {/* cột */}
                                <rect
                                    x={0}
                                    y={y}
                                    width={barWidth}
                                    height={h}
                                    rx={4}
                                    ry={4}
                                    className="fill-sky-600"
                                />

                                {/* giá trị trên cột */}
                                {showValues && (
                                    <text
                                        x={barWidth / 2}
                                        y={y - 6}
                                        textAnchor="middle"
                                        fontSize={11}
                                        fill="#111"
                                    >
                                        {d.value}
                                    </text>
                                )}

                                {/* label dưới cột */}
                                {/* <text
                                    x={barWidth / 2}
                                    y={paddingTop + innerHeight + 18} // luôn nằm dưới trục X
                                    textAnchor="middle"
                                    fontSize={11}
                                    fill="#666"
                                >
                                    {d.label}
                                </text> */}

                                <text
                                    x={barWidth / 2}
                                    y={paddingTop + innerHeight + 18}
                                    textAnchor="middle"
                                    fontSize={11}
                                    fill="#666"
                                >
                                    {wrapText(d.label, 10).map((line, i) => (
                                        <tspan key={i} x={barWidth / 2} dy={i === 0 ? 0 : 12}>
                                            {line}
                                        </tspan>
                                    ))}
                                </text>
                            </g>
                        );
                    })}

                    {/* trục X */}
                    <line
                        x1={paddingLeft}
                        x2={Math.max(innerWidth, data.length * (barWidth + 8))}
                        y1={paddingTop + innerHeight}
                        y2={paddingTop + innerHeight}
                        stroke="#888"
                    />
                </svg>
            </div>
        </div>
    );
};
