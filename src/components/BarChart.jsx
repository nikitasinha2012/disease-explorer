import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data, categories }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Extracts data values and labels from the data array
  const dataValues = data.map((dataType) => dataType.score);
  const dataLabels = data.map((dataType) => dataType.id);

  useEffect(() => {
    if (chartInstanceRef.current) {
      // If a Chart instance already exists, destroy it.
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dataLabels,
          datasets: [
            {
              label: "Data Set",
              data: dataValues,
              backgroundColor: "rgba(173, 216, 230, 0.2)",
              borderColor: "rgba(0, 0, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 1.0,
            },
          },
        },
      });

      chartInstanceRef.current = chartInstance; // Store the Chart instance in a ref
    }
  }, [data]);

  return (
    <div className="bar-chart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
