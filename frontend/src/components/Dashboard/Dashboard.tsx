import { useEffect, useState } from "react";
import { BarChart } from "../Charts/BarChart";
import { Stacked100BarChart } from "../Charts/Stacked100BarChart";
import { PieChart } from "../Charts/PieChart";
import { mcQuestionApi } from "../../api/api";

type SeriesItem = { label: string; value: number };
type Segment = { label: string; value: number };
const Dashboard = () => {
    const [seriesItem, setSeriesItem] = useState<SeriesItem[]>([]);
    const [segment, setSegment] = useState<Segment[]>([]);

    const loadData = async () => {
        try {
            // Gọi API lấy dữ liệu seriesItem
            const res1 = await mcQuestionApi.getQuestionStatsByType();
            setSeriesItem(res1.data);

            // Gọi API lấy dữ liệu slice
            const res2 = await mcQuestionApi.getCriticalVsNonCritical();
            setSegment(res2.data);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="bg-white">
            <BarChart title="Số lượng câu hỏi theo loại" data={seriesItem} />
            <Stacked100BarChart data={segment} />
            <PieChart data={seriesItem} title="Phân bố câu hỏi theo loại" />
        </div>
    )
}

export default Dashboard