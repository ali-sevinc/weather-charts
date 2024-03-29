export default function ChartError() {
  return (
    <div className="px-8 text-red-600 py-2">
      <h2 className="text-2xl font-semibold py-1">An Error Occured</h2>
      <p className="text-lg">
        Fetching weather data failed. Please, make sure you choose a valid
        location
      </p>
    </div>
  );
}
