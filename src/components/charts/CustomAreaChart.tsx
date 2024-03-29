import {
  Area,
  AreaChart,
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
export default function CustomAreaChart({
  data,
  unit,
  dataKey,
  name,
  stroke,
  fill,
  header,
}: PropsType) {
  return (
    <ChartContainer>
      <ChartHeader data={data}>{header}</ChartHeader>
      <ResponsiveContainer height={240} width="95%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="time" />
          <YAxis unit={unit} />
          <Tooltip />
          <Area
            dataKey={dataKey}
            type="monotone"
            stroke={stroke}
            fill={fill}
            strokeWidth={2}
            name={name}
            unit={unit}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
