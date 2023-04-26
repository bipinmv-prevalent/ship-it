import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import wordCloud from "highcharts/modules/wordcloud";

wordCloud(Highcharts);
NoDataToDisplay(Highcharts);

const WordCloud = props => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: "transparent",
      height: props.height,
    },
    title: { text: "" },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    const options = {
      lang: {
        thousandsSep: "\u002C",
        noData: "No data to display",
      },
      chart: {
        backgroundColor: "transparent",
        height: props.height,
        animation: false,
        margin: [10, 0, 0, 0],
        padding: [0, 0, 0, 0],
        spacing: props.spacing ?? [10, 10, 15, 10],
      },
      series: [
        {
          colors: ["#9E81B6", "#2685AF", "#07C2CB", "#84B3B9", "#84B3B9", "#2EA0A5", "#90AF56"],
          type: "wordcloud",
          data: props.data,
        },
      ],
      plotOptions: {
        series: {
          point: {
            events: {
              click: props.onElementClick,
            },
          },
          rotation: {
            from: 0,
            orientations: 1,
            to: 0,
          },
          style: {
            fontFamily: "Arial",
          },
        },
        wordcloud: {
          borderRadius: 0,
          borderWidth: 0,
          maxFontSize: 15,
          minFontSize: 7,
        },
      },
      title: {
        text: props.title ?? "",
        align: "left",
        style: {
          color: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "Arial",
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        shared: false,
        formatter() {
          return props.tooltipFormatter(this.point);
        },
        style: {
          color: "#FFFFFF",
          fontSize: "11px",
          fontFamily: "arial",
          fontWeight: "normal",
        },
        backgroundColor: "rgb(15,18,38, 0.9)",
        useHTML: true,
        outside: true,
      },
    };

    setChartOptions(options);
  }, [props]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default WordCloud;
