// Install dependencies: npm install react-router-dom recharts tailwindcss

import Panel from "./components/Panel";
import Header from "./components/Header";
import Table from "./components/Table";
import DateTime from "./components/DateTime";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

const mockStockData = [
  { date: "2024-02-10", price: 20 },
  { date: "2024-02-11", price: 50 },
  { date: "2024-02-12", price: 121 },
  { date: "2024-02-13", price: 110 },
  { date: "2024-02-14", price: 128 },
  { date: "2024-02-15", price: 20 },
  { date: "2024-02-16", price: 50 },
  { date: "2024-02-17", price: 121 },
  { date: "2024-02-18", price: 110 },
  { date: "2024-02-19", price: 128 }
];

const sampleData = [
  { label:"ABC", bid:30.02, ask:31.0, net:4, oned:"0.4%", high:29, low:20, trend:"up" },
  { label:"CDE", bid:2.5, ask:2.0, net:3, oned:"0.3%", high:3, low:4, trend:"up" },
  { label:"USD", bid:32.5, ask:33.0, net:32, oned:"0.9%", high:3, low:99, trend:"down" },
  { label:"XY", bid:3.5, ask:8.0, net:3, oned:"0.10%", high:3, low:2, trend:"up" },
  { label:"APP", bid:8.5, ask:0.0, net:3, oned:"0.01%", high:3, low:9, trend:"down" },
  { label:"MCD", bid:100.5, ask:102.0, net:3, oned:"0.8%", high:33, low:29, trend:"up" },
];

const StockTicker = () => {
  const [price, setPrice] = useState(mockStockData[mockStockData.length - 1].price);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => prev + (Math.random() * 4 - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white text-center">
      <h2 className="text-xl font-bold">Stock Ticker: $XYZ</h2>
      <p className="text-2xl">${price.toFixed(2)}</p>
    </div>
  );
};

const StockChart = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Stock Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockStockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-6">
        <Header />

        {/* Row 1: Two Info Panels */}
        <div className="flex flex-row gap-4 mt-4">
            <div className="flex-1">
                <Panel title="Watchlists">
                <Table data={sampleData} />
                </Panel>
            </div>

            <div className="flex-1">
                <Panel title="Details">
                <StockTicker />
                <StockChart />
                </Panel>
            </div>
        </div>

        {/* Row 2: Full-width Table */}
        <div className="flex flex-row gap-4 mt-4">
            <div className="flex-1">
                <Panel title="Positions">
                <Table data={sampleData} />
                </Panel>
            </div>
        </div>

    </div>
    </Router>
  );
};

export default App;

