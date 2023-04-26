import { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

NoDataToDisplay(Highcharts);

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {},
    };
  }

  componentDidMount = () => {
    this.setChartData(this.props.seriesData);
  };

  componentDidUpdate(prevProps) {
    if (this.props.seriesData !== prevProps.seriesData) {
      this.setChartData(this.props.seriesData);
    }
  }

  setChartData = seriesData => {
    const tooltipText = this.props.tooltipText;
    const options = {
      chart: {
        type: this.props.type ?? "column",
        backgroundColor: "transparent",
        height: this.props.height,
        border: "0",
        marginLeft: this.props.marginLeft ?? undefined,
        marginRight: this.props.marginRight ?? undefined,
        animation: false,
        zoomType: this.props.zoomType,
        spacing: this.props.spacing ?? [10, 10, 15, 10],
      },
      colors: this.props.colors,
      credits: {
        enabled: false,
      },
      lang: {
        thousandsSep: "\u002C",
        noData: "No data to display",
      },
      title: {
        text: this.props.title,
        align: "left",
        style: {
          color: "#FFFFFF",
          fontSize: "12px",
          fontFamily: "Arial",
        },
      },
      xAxis: {
        categories: this.props.categoryData,
        type: this.props.scrollbar === true ? "category" : null,
        min: 0,
        max: this.props.numOfBars && seriesData.length > this.props.numOfBars ? this.props.numOfBars : null,
        scrollbar: {
          enabled: this.props.scrollbar ?? false,
          barBackgroundColor: "rgb(130, 131, 160, 1)",
          barBorderWidth: 0,
          buttonBackgroundColor: "rgb(130, 131, 160, 1)",
          buttonBorderWidth: 0,
          buttonArrowColor: "black",
          rifleColor: "black",
          trackBackgroundColor: "rgb(64, 68, 99, 1)",
          trackBorderWidth: 0,
          height: 11,
          showFull: false,
        },
        gridLineColor: "transparent",
        gridLineWidth: 0,
        lineWidth: 0,
        title: {
          enabled: this.props.xAxisTitle ? true : false,
          text: this.props.xAxisTitle,
          style: {
            color: "rgb(130, 131, 160, 1)",
            fontSize: "11px",
            fontFamily: "Arial",
          },
        },
        labels: {
          enabled: this.props.xLabels,
          allowOverlap: true,
          style: {
            color: "rgb(130, 131, 160, 1)",
            fontFamily: "Arial",
          },
          step: this.props.xLabelStep ?? 1,
          autoRotation: [0],
        },
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        gridLineColor: "transparent",
        gridLineWidth: 0,
        lineWidth: 0,
        endOnTick: this.props.endOnTick,
        softMax: this.props.softMax,
        tickPositioner: this.props.customYAxisTicks
          ? function () {
            const positions = [];
            if (
              this.dataMax !== null &&
              this.dataMin !== null &&
              this.dataMax !== 0 &&
              this.dataMin !== this.dataMax
            ) {
              positions.push(this.dataMin, Math.ceil(this.dataMax / 2), this.dataMax);
            } else if (
              this.dataMin === this.dataMax &&
              this.dataMax !== null &&
              this.dataMin !== null &&
              this.dataMax !== 0
            ) {
              positions.push(0, this.dataMax);
            }
            return positions;
          }
          : undefined,
        maxPadding: 0.1,
        stackLabels: {
          enabled: this.props.stackLabels ?? true,
          style: {
            color: "rgb(151, 154, 177, 1)",
            textOutline: "none",
            fontWeight: "normal",
            fontSize: "11px",
            fontFamily: "Arial",
          },
        },
        title: {
          enabled: this.props.yAxisTitle ? true : false,
          text: this.props.yAxisTitle ?? "Session Count",
          style: {
            fontSize: "11px",
            color: "rgb(130, 131, 160, 1)",
            fontFamily: "Arial",
            cursor: "default",
            fill: "rgb(130, 131, 160, 1)",
          },
        },
        labels: {
          enabled: this.props.yLabels,
          style: {
            color: "rgb(130, 131, 160, 1)",
            fontFamily: "Arial",
          },
        },
      },
      tooltip: {
        enabled: this.props.tooltip,
        useHTML: true,
        style: {
          color: "#FFFFFF",
          fontSize: "11px",
          fontFamily: "arial",
          fontWeight: "normal",
        },
        backgroundColor: "rgb(15,18,38, 0.9)",
        shared: false,
        valueDecimals: 2,
        formatter() {
          return tooltipText
            ? tooltipText(this.point)
            : "<b>" +
            this.point.series.userOptions.data[0].custom.title +
            "</b><br/><span>" +
            this.key +
            ": " +
            this.point.options.y +
            "</span>";
        },
      },
      legend: {
        enabled: this.props.legends,
        symbolHeight: 8,
        symbolWidth: 8,
        symbolRadius: 4,
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
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: this.props.barDataLabel,
            style: {
              color: "rgb(151, 154, 177, 1)",
              textOutline: "none",
              fontWeight: "normal",
              fontSize: "11px",
              fontFamily: "Arial",
            },
          },
        },
        column: {
          minPointLength: 2,
          pointPadding: this.props.pointPadding ?? 0,
          borderWidth: 0,
        },
        series: {
          minPointLength: this.props.minPointLength ?? 0,
          cropThreshold: this.props.cropThreshold ?? 100,
          stacking: this.props.stacking,
          borderWidth: 0,
          pointWidth: this.props.pointWidth ?? 15,
          groupPadding: 0,
          events: {
            click: this.props.onElementClick,
          },
          centerInCategory: true,
        },
      },
      series: [
        {
          data: seriesData,
        },
      ],
    };

    this.setState({
      chartOptions: options,
    });
  };

  render() {
    Highcharts.setOptions({
      lang: {
        thousandsSep: "\u002C",
      },
    });
    return <HighchartsReact options={this.state.chartOptions} highcharts={Highcharts} />;
  }
}

export default BarChart;
