"use client";
import { useEffect, useState } from "react";

export default function FleetMock() {
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Generate a JSON array with 10 objects representing fleet vehicles. Each object should include: - "id" (unique string like T001, T002), - "make" (e.g. "Ford", "Chevrolet"), - "model" (e.g. "F-150", "Silverado"), - "year" (random year between 2010-2023), - "mileage" (integer between 50000 and 250000), - "lastServiceDate" (random date within the last year), - "status" (either "active", "maintenance", "out of service") Output the data as a valid JSON array with all necessary fields.` })
      });

      const result = await res.json();
      setData(result.reply);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">🔧 Simulated Fleet Data</h2>
      <pre className="bg-black text-white p-4 rounded overflow-x-auto text-sm max-h-[400px]">
        {data}
      </pre>
    </div>
  );
}