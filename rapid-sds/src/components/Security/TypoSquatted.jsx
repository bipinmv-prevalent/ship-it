import { useState, useEffect } from "react";
import { RAPID_API_URL } from "../../config/constants";
import Loader from "../Loader";
import WordCloud from "./wordCloud";

const TypoSquatted = ({ client, order, title, includeDomains }) => {
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState([]);

  const tooltipFormatter = point => `<b>${title}</b><br/>
    <div class="d-flex justify-content-between">
      <span class="me-2">${point?.name}</span>
      <span>${point?.weight}</span>
    </div>`;

  const tooltipFormatterForDomains = point => `<b>${title}</b><br/>
    <div class="d-flex justify-content-between">
      <span class="me-2">${point?.name}</span>
      <span>${point?.weight}</span>
    </div>
    <div class="wc-tooltip">
      <span>Domains : </span>
      <span class="wc-tooltip">${point?.custom?.domains}</span>
    </div>`;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const response = await fetch(`${RAPID_API_URL}${order}?client=${client}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const series = data.map(obj => ({
        name: obj?.name,
        weight: Number(obj?.count),
        custom: { domains: obj?.domains?.toString() }
      }));
      setSeriesData(series);
      setLoading(false);
    };
    getData();
  }, [client, order]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <WordCloud
          data={seriesData}
          height={"270px"}
          title={title}
          tooltipFormatter={includeDomains ? tooltipFormatterForDomains : tooltipFormatter}
        />
      )}
    </>
  );
};

export default TypoSquatted;
