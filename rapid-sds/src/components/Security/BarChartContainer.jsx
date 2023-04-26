import { useCallback, useEffect, useState } from "react";
import { COLORS, RAPID_API_URL } from "../../config/constants";
import Loader from "../Loader";
import BarChart from "./barChart";

const BarChartContainer = ({ order, client, title }) => {
  const [seriesData, setSeriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const buildChartData = data => {
    const series = data.map((obj, idx) => ({
      name: obj?.name,
      y: parseInt(obj?.y),
      color: COLORS[idx],
      custom: { title },
    }));

    setSeriesData(series);
    setCategories(series.map(obj => obj.name));
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BarChart
          title={title}
          seriesData={seriesData}
          categoryData={categories}
          height="270"
          legends={false}
          type={"column"}
          pointPadding={0.2}
          stacking={"normal"}
          barDataLabel={true}
          tooltip={true}
          xLabels={true}
          yLabels={true}
          pointWidth="30"
          customYAxisTicks={false}
          id="vul-exp-cves-barchart"
          cropThreshold={seriesData && seriesData.length}
          endOnTick={false}
          scrollbar={true}
          numOfBars={5}
          softMax={1}
          colors={COLORS}
        />
      )}
    </>
  );
};

export default BarChartContainer;
