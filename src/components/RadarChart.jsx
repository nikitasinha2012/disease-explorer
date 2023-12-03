import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Extracts labels and scores from the data
  const labels = data.map((item) => item.id);
  const scores = data.map((item) => item.score);

  useEffect(() => {
    if (chartInstanceRef.current) {
      // If a Chart instance already exists, destroy it.
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const chartInstance = new Chart(ctx, {
        type: "radar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Data Set ",
              data: scores,
              backgroundColor: "rgba(173, 216, 230, 0.2)",
              borderColor: "rgba(0, 0, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 1.0,
            },
          },
        },
      });

      chartInstanceRef.current = chartInstance;
    }
  }, [data]);

  return (
    <div className="radar-chart">
      <canvas ref={chartRef} width={400} height={400} />
    </div>
  );
};

export default RadarChart;
