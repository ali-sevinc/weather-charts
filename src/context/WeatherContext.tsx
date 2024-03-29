import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type Chart =
  | "temperature"
  | "relativeHumidity"
  | "wind"
  | "precipitation"
  | "tempHumidityLine"
  | "visibility";
type InitialType = {
  position: [number, number] | null;
  chart: Chart;
  status: "loading" | "error" | "idle";
  onGetPosition: ({ lat, lon }: { lat: number; lon: number }) => void;
  onChangeChart: (chartType: Chart) => void;
  onLoading: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  onReset: () => void;
};
type ActionType = {
  type:
    | "position/get"
    | "position/reset"
    | "position/error"
    | "position/loading"
    | "position/success"
    | "chart/change";
  payload?: [number, number] | string | Chart;
};
const initialState: InitialType = {
  position: null,
  status: "idle",
  chart: "temperature",
  onGetPosition: () => {},
  onChangeChart: () => {},
  onError: () => {},
  onLoading: () => {},
  onSuccess: () => {},
  onReset: () => {},
};
const WeatherContext = createContext(initialState);

function reducer(state: InitialType, action: ActionType) {
  if (action.type === "position/get") {
    return {
      ...state,
      position: action.payload,
      status: "idle",
    } as InitialType;
  }
  if (action.type === "position/reset") {
    return {
      ...state,
      position: null,
      chart: "temperature",
    } as InitialType;
  }
  if (action.type === "chart/change") {
    return { ...state, chart: action.payload } as InitialType;
  }
  if (action.type === "position/error") {
    return { ...state, status: "error" } as InitialType;
  }
  if (action.type === "position/loading") {
    return { ...state, status: "loading" } as InitialType;
  }
  if (action.type === "position/success") {
    return { ...state, status: "idle" } as InitialType;
  }

  return state;
}

export default function WeatherProvider({ children }: { children: ReactNode }) {
  const [{ status, position, chart }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function handleGetPosition({ lat, lon }: { lat: number; lon: number }) {
    dispatch({ type: "position/get", payload: [lat, lon] });
  }
  function handleResetPosition() {
    dispatch({ type: "position/reset" });
  }
  const handleErrorPosition = useCallback(function handleErrorPosition(
    err: string
  ) {
    dispatch({ type: "position/error", payload: err });
  },
  []);
  function handleChangeChart(chart: Chart) {
    dispatch({ type: "chart/change", payload: chart });
  }
  const handleLoading = useCallback(function handleLoading() {
    dispatch({ type: "position/loading" });
  }, []);
  const handleSuccess = useCallback(function hanleSuccess() {
    dispatch({ type: "position/success" });
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        status,
        position,
        chart,
        onChangeChart: handleChangeChart,
        onError: handleErrorPosition,
        onGetPosition: handleGetPosition,
        onLoading: handleLoading,
        onSuccess: handleSuccess,
        onReset: handleResetPosition,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("Context used outside of WeatherContext scope");
  return context;
}
