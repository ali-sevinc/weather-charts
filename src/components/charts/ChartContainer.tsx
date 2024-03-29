import { ReactNode } from "react";

export default function ChartContainer({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto">{children}</div>;
}
