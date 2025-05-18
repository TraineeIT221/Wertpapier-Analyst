import type { Route } from "./+types/home";
import React, { useState, useMemo } from "react";
import securities from "../data/securities.json";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wertpapiere Vergleich" },
    { name: "description", content: "Übersicht und Filter von Wertpapieren" },
  ];
}

export default function Home() {
  const [filterType, setFilterType] = useState("");
  const [filterRisk, setFilterRisk] = useState("");

  const types = useMemo(
    () => [...new Set(securities.map((s) => s.typ.toLowerCase()))],
    []
  );
  const risks = useMemo(
    () => [...new Set(securities.map((s) => s.anlagerisiko))],
    []
  );

  const filtered = useMemo(
    () =>
      securities
        .filter((s) => !filterType || s.typ.toLowerCase() === filterType)
        .filter((s) => !filterRisk || s.anlagerisiko === filterRisk),
    [filterType, filterRisk]
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-lg mt-10 mb-10">
      <div className="flex items-center bg-blue-800/10 p-4 rounded-xl mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
          KM
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-blue-800">Klaus Meier, 66</h2>
          <p className="text-base text-gray-700">
            Ihr Ziel: Kapital konservativ in Wertpapieren anlegen
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        Wertpapiere Übersicht
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <label className="flex flex-col text-blue-800">
          Typ:
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="">Alle</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-blue-800">
          Risiko:
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
          >
            <option value="">Alle</option>
            {risks.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table border-separate border-spacing-0">
          <thead>
            <tr>
              {['WKN', 'Name', 'Typ', 'Kurs', 'Risiko', 'nächste HV', 'Emittent'].map((col) => (
                <th
                  key={col}
                  className="bg-blue-600 text-white font-semibold px-4 py-2 text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr
                key={s.wkn}
                className={
                  i % 2 === 0
                    ? "bg-white hover:bg-blue-800/10 transition-colors"
                    : "bg-blue-600/10 hover:bg-blue-600/20 transition-colors"
                }
              >
                <td className="border-b border-gray-200 px-4 py-2 text-blue-800">{s.wkn}</td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">{s.name}</td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">{s.typ}</td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">
                  {s.kurs.toFixed(2)} €
                </td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">{s.anlagerisiko}</td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">
                  {s.datum_naechste_hauptversammlung}
                </td>
                <td className="border-b border-gray-200 px-4 py-2 text-gray-700">{s.emittent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
