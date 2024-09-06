import { useEffect } from "react";
import Chart from "chart.js/auto";

function Graph(): JSX.Element {
  useEffect(() => {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get 2D context for canvas");
    }

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            data: [50, 150, 300, 500, 750, 1100],
            label: "Revenue",
            borderColor: "#bd9e1e",
            backgroundColor: "#bd9e1e",
          },
        ],
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className={`flex flex-col pb-20`}>
      <div className="mb-6 flex justify-between mt-6 rounded-lg py-2 px-4">
        <h2>General Revenue</h2>

        <select name="months" id="months" className="bg-inherit outline-none">
          <option value="">Monthly</option>
          <option value="">Bi-weekly</option>
          <option value="">Weekly</option>
          <option value="">Daily</option>
        </select>
      </div>
      {/* line chart */}
      <div className="bg-white mx-4 px-4 pb-[3vh] pt-2">
        <div className="">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Graph;
