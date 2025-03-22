import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../styles/rapport.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Rapport = () => {
  const [chartData, setChartData] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://mern-gestion-de-stock-production.up.railway.app/rapport/rapportinventaire"
      );
      processChartData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const processChartData = (data) => {
    const processedData = data.map((rapport, index) => ({
      name: `Rapport ${index + 1}`,
      valeur: rapport.total || Math.floor(Math.random() * 100) + 1,
    }));
    setChartData(processedData);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="Rapport-content">
        <h3>Analyse des Rapports</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="valeur" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="valeur"
              stroke="#00C49F"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="valeur"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rapport;
