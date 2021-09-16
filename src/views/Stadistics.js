import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import LinkButton from "../components/LinkButton";
import AnimatedJumbotron from "../components/AnimatedJumbotron";
import axios from "axios";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const jumbotronProps = {
  content: ["Estadísticas"],
  style: "invisible md:visible mt-6",
  text: "flex-1 text-sm md:text-7xl lg:text-8xl",
};

export default function Stadistics() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const fetchData = useCallback(async () => {
    await axios({
      method: "GET",
      url: "http://localhost:4000/api/reports",
    })
      .then((res) => {
        let data = res.data.map((item) => {
          return item.incorrectas;
        });
        let labels = res.data.map((item, index) => {
          return index + 1;
        });
        setChartData({
          labels,
          datasets: [
            {
              label: "Inténtos incorrectos",
              data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="inline-flex w-full">
      <div class="h-screen w-1/6 px-4 border-r bg-white">
        <div class="h-3/4 flex flex-col justify-around text-gray-500">
          <h3 class="pl-1 cursor-pointer text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
            <i class="fas fa-2x fa-assistive-listening-systems text-indigo-800 mr-3"></i>
            <label class="hover:text-black transition duration-200 ease-linear cursor-pointer">
              Discriminación Auditiva
            </label>
          </h3>
          <h3 class="pl-1 cursor-pointer text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
            <i class="fas fa-2x fa-podcast text-indigo-800 mr-3"></i>
            <label class="hover:text-black transition duration-200 ease-linear cursor-pointer">
              Conciencia Fonológica
            </label>
          </h3>
          <h3 class="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
            <i class="fas fa-2x fa-spell-check text-indigo-800 mr-3"></i>
            <label class="hover:text-black transition duration-200 ease-linear cursor-pointer">
              Identificación Visual
            </label>
          </h3>
        </div>
      </div>
      <div className="text-center ml-11">
        <div className="inline-flex space-x-16 justify-around mb-8">
          <LinkButton
            to="/main-page"
            label="atras"
            color="bg-blue-500"
            fontSize="flex-1 text-3xl sm:text-4xl mt-6 p-4"
          />
          <AnimatedJumbotron features={jumbotronProps} />
        </div>
        <div className="justify-center">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
