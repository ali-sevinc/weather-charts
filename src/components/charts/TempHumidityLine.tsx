import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "./ChartContainer";

import ChartHeader from "./ChartHeader";
import { ConvertedDataType } from "../../helpers/types";
type PropsType = {
  data: ConvertedDataType[] | undefined;
  tempUnit: string;
  humUnit: string;
};
export default function TempHumidityLine({
  data,
  tempUnit,
  humUnit,
}: PropsType) {
  return (
    <ChartContainer>
      <ChartHeader data={data}>
        Temperature-Relative Humidity Line Chart
      </ChartHeader>
      <ResponsiveContainer height={240} width="95%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="time" />
          <YAxis unit={humUnit} yAxisId="relative_humidity" />
          <Tooltip />
          <Line
            dataKey="relative_humidity"
            yAxisId="relative_humidity"
            type="monotone"
            stroke="#4b5563"
            strokeWidth={2}
            name="Relative Humadity"
            unit={humUnit}
          />
          <YAxis yAxisId="temperature" unit={tempUnit} />
          <Line
            dataKey="temperature"
            yAxisId="temperature"
            type="monotone"
            stroke="#ea580c"
            strokeWidth={2}
            name="Temperature"
            unit={tempUnit}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
