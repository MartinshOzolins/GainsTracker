// Chart JS
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 8, // Change font size for x-axis ticks (labels)
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 8, // Change font size for y-axis ticks (labels)
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "This is a graph",
      },
    },
  };

  return <Line options={options} data={lineChartData} />;
}

const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Biceps Curl",
      data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "Steps",
      data: [1000, 3000, 2500, 9000, 12000, 7000, 9000],
      borderColor: "rgb(75, 192, 192)",
    },
  ],
};
