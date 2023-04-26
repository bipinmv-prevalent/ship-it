import { useState, useEffect, useCallback } from "react";
import { COLORS, RAPID_API_URL } from "../../config/constants";
import Loader from "../Loader";
import PieChart from "./pieChart";

const PieChartContainer = ({ client, order, title }) => {
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState([]);

  const dataLabelFormatter = point => `<b>${point?.name}</b>`;
  //<br/><div class="text-center">${point?.y}</div>`;

  const tooltipFormatter = point => `<b>${title}</b><br/>
  <div class="d-flex justify-content-between">
    <span class="me-2">${point?.name}</span>
    <span>${point?.y}</span>
  </div>`;

  const buildChartData = useCallback(
    data => {
      const chartData = data.map((obj, idx) => ({
        name: obj?.name,
        y: Number(obj?.y),
        color: COLORS[idx],
      }));

      setSeriesData([{ data: chartData }]);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch(`${RAPID_API_URL}${order}?client=${client}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      buildChartData(data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <PieChart
          seriesData={seriesData}
          height="270"
          title={title}
          innerSize="70%"
          type="pie"
          borderWidth={1}
          size="180"
          connectorColor="transparent"
          dataLabelFormatter={dataLabelFormatter}
          tooltipFormatter={tooltipFormatter}
          subtitleText={0}
        />
      )}
    </>
  );
};

export default PieChartContainer;
