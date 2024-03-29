import {
  Bar,
  BarChart,
  CartesianGrid,
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
  fill: string;
  header: string;
};
export default function CustomBarChart({
  data,
  name,
  fill,
  stroke,
  dataKey,
  header,
  unit,
}: PropsType) {
  return (
    <ChartContainer>
      <ChartHeader data={data}>{header}</ChartHeader>
      <ResponsiveContainer height={240} width="95%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="time" />
          <YAxis unit={unit} />
          <Tooltip />
          <Bar
            dataKey={dataKey}
            type="monotone"
            stroke={stroke}
            fill={fill}
            strokeWidth={1}
            name={name}
            unit={unit}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
