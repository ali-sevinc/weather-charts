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
  unit: string;
  dataKey: string;
  name: string;
  stroke: string;
  header: string;
};
export default function CustomLineChart({
  data,
  dataKey,
  header,
  name,
  stroke,
  unit,
}: PropsType) {
  return (
    <ChartContainer>
      <ChartHeader data={data}>{header}</ChartHeader>
      <ResponsiveContainer height={240} width="95%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="time" />
          <YAxis unit={unit} />
          <Tooltip />
          <Line
            dataKey={dataKey}
            type="monotone"
            stroke={stroke}
            strokeWidth={1}
            name={name}
            unit={unit}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
