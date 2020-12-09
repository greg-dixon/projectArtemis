import React from "https://esm.sh/react";
import { Line } from "https://cdn.skypack.dev/react-chartjs-2";
import { Result, Snapshot } from "../../typings/data.d.ts";
import "../../../style/graphs.css";

interface Props {
  aggregateMetrics: Result | null;
  snapshotArray: [Snapshot] | [];
}

const LatencyGraph = (props: Props) => {
  const { snapshotArray, aggregateMetrics } = props;
  const data = {
    labels: !Array.isArray(snapshotArray) || snapshotArray.length <= 0
      ? []
      : snapshotArray.map((obj, index) => {
        const key = `Query ${index}`;
        return key;
      }),
    datasets: [
      {
        label: "Latency",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        data: (!Array.isArray(snapshotArray) || snapshotArray.length <= 0)
          ? []
          : snapshotArray.map((obj: any) => {
            const value = obj.latency;
            return value;
          }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // ! TODO refactor latency avg for ts
    title: {
      display: true,
      text: `Average Latency: ${
        aggregateMetrics ? aggregateMetrics.latencyAvg : 0
      } bytes           Maximum Latency: ${
        aggregateMetrics ? aggregateMetrics.latencyMax : 0
      } bytes`,
    },
    onClick: function (e, item) {
      console.log(item);
    },
  };

  const legend = {
    display: false,
  };

  return (
    <div className="graph">
      <Line
        data={data}
        options={options}
        legend={legend}
        aria-label="display-graph-query-speeds"
        role="img"
      />
    </div>
  );
};

export default LatencyGraph;
