import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie.js";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

variablePie(Highcharts);
NoDataToDisplay(Highcharts);

const PieChart = (props) => {
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
    setChartData(props.seriesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.seriesData]);

  const setChartData = seriesData => {
    const options = {
      chart: {
        type: props.type,
        backgroundColor: "transparent",
        height: props.height,
        animation: false,
        spacing: props.spacing ?? [10, 10, 15, 10],
      },
      credits: {
        enabled: false,
      },
      lang: {
        thousandsSep: "\u002C",
        noData: "No data to display",
      },
      title: {
        text: props.title !== "Scope" ? props.title : "",
        useHtml: true,
        align: "left",
        style: {
          color: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "Arial",
        },
      },
      subtitle: {
        text: props.subtitleText !== 0 ? props.subtitleText?.toString() : "",
        useHTML: true,
        align: "center",
        y: props.subtitleAlignY ?? 30,
        verticalAlign: "middle",
        style: {
          color: "#FFFFFF",
          fontSize: "16px",
          fontFamily: "Arial",
          fontWeight: "bold",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgb(15,18,38, 0.9)",
        style: {
          color: "#FFFFFF",
          fontSize: "11px",
          fontFamily: "Arial",
          distance: 30,
          padding: 15,
          split: true,
          outside: true,
          useHTML: true,
          zIndex: 1200,
        },
        formatter() {
          if (props.tooltipFormatter) {
            return props.tooltipFormatter(this.point);
          }
          return (
            "<b>" +
            props.title.split("(")[0] +
            "</b><br/><span class='chart-capitalize'>" +
            this.key +
            ": " +
            this.y +
            " (" +
            Math.round(this.point.percentage) +
            "%)</span>"
          );
        },
      },
      plotOptions: {
        pie: {
          size: props.size,
          borderWidth: props.subtitleText !== 0 && props.borderWidth,
          borderColor: "rgb(15,18,38, 0.9)",
          innerSize: props.innerSize,
          dataLabels: {
            enabled: true,
            distance: 18,
            connectorWidth: 1,
            connectorColor: props.connectorColor,
            style: {
              color: "rgb(151, 154, 177, 1)",
              fontSize: "11px",
              fontFamily: "arial",
              fontWeight: "normal",
              textOutline: "none",
            },
            useHTML: true,
            formatter() {
              let strTooltip = "";
              if (props.dataLabelFormatter) {
                return props.dataLabelFormatter(this.point);
              }
              strTooltip = Math.round(this.point.percentage) + "% " + this.key;

              return strTooltip;
            },
          },
          colors: props.colors,
        },
        variablepie: {
          size: props.size,
          innerSize: props.innerSize,
          borderWidth: props.subtitleText !== 0 && props.borderWidth,
          borderColor: "rgb(15,18,38, 0.9)",
          dataLabels: {
            enabled: true,
            distance: props.distance ?? 30,
            connectorWidth: 1,
            connectorColor: props.connectorColor,
            // format: this.props.formatPercentage ? "{point.y}<br/>({point.percentage:.0f}%)" : "{point.y}",
            style: {
              color: "rgb(151, 154, 177, 1)",
              fontSize: "11px",
              fontFamily: "arial",
              fontWeight: "normal",
              textOutline: "none",
            },
            formatter() {
              let strTooltip = "";
              if (props.dataLabelFormatter) {
                return props.dataLabelFormatter(this.point);
              } else if (
                this.series.name === "Number Of Users" ||
                this.series.name === "Number Of Hosts" ||
                this.series.name === "Number Of Companies"
              ) {
                strTooltip = this.y;
              } else if (this.series.name === "Domain Awairness") {
                strTooltip = this.y.toFixed(2) + "% " + this.key;
              } else if (
                this.point.custom !== undefined &&
                this.point.custom.formatPercentage !== undefined
              ) {
                if (this.point.custom.formatPercentage) {
                  strTooltip = this.y + "<br />(" + Math.round(this.point.percentage) + "% )";
                }
              } else {
                strTooltip = this.y.toFixed(2) + "% <br/>" + this.key;
              }
              return strTooltip;
            },
          },
          colors: props.colors,
        },
        series: {
          point: {
            events: {
              click: props.onElementClick,
              legendItemClick: () => false,
            },
          },
          cursor: props.cursor,
          showInLegend: props.legends ? props.legends : false,
        },
      },
      legend: {
        enabled: props.legends ?? false,
        align: "center",
        verticalAlign: "bottom",
        itemStyle: {
          color: "rgb(130, 131, 160, 1)",
          fontSize: "11px",
          fontWeight: "normal",
          fontFamily: "Arial",
        },
        itemHoverStyle: {
          color: "rgb(130, 131, 160, 1)",
          fontSize: "11px",
          fontFamily: "Arial",
          fontWeight: "normal",
        },
        symbolHeight: 8,
        symbolWidth: 8,
      },
      series: seriesData,
    };

    setChartOptions(options);
  };

  return <HighchartsReact options={chartOptions} highcharts={Highcharts} />;
};

export default PieChart;
