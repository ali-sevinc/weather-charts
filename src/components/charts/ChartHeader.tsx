import { ReactNode } from "react";
import { ConvertedDataType } from "../../helpers/types";

export default function ChartHeader({
  data,
  children,
}: {
  data: ConvertedDataType[] | undefined;
  children: ReactNode;
}) {
  return (
    <h2 className="text-2xl py-2 text-center">
      {data?.at(0)?.time} - {data?.at(-1)?.time} {children}
    </h2>
  );
}
