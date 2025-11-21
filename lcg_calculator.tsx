import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function LCGCalculator() {
  const [N0, setN0] = useState(3);
  const [lambda, setLambda] = useState(21);
  const [mu, setMu] = useState(7);
  const [m, setM] = useState(32);
  const [iterations, setIterations] = useState(10);
  const [results, setResults] = useState([]);

  const calculate = () => {
    const sequence = [];
    let Ni = N0;

    for (let i = 0; i <= iterations; i++) {
      const beforeMod = lambda * Ni + mu;
      const afterMod = beforeMod % m;
      const quotient = Math.floor(beforeMod / m);
      const r = afterMod / (m - 1);

      sequence.push({
        i,
        Ni,
        calculation: `${lambda} × ${Ni} + ${mu} = ${beforeMod}`,
        quotient,
        modResult: afterMod,
        r: r.toFixed(6)
      });

      Ni = afterMod;
    }

    setResults(sequence);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Linear Congruential Generator
            </h1>
          </div>

          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-lg font-mono text-gray-700">
              N<sub>i</sub> = (λ × N<sub>i-1</sub> + μ) mod m
            </p>
            <p className="text-sm text-gray-600 mt-2">
              r = N<sub>i</sub> / (m - 1)
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                N<sub>0</sub> (Initial)
              </label>
              <input
                type="number"
                value={N0}
                onChange={(e) => setN0(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                λ (Lambda)
              </label>
              <input
                type="number"
                value={lambda}
                onChange={(e) => setLambda(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                μ (Mu)
              </label>
              <input
                type="number"
                value={mu}
                onChange={(e) => setMu(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                m (Modulus)
              </label>
              <input
                type="number"
                value={m}
                onChange={(e) => setM(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Iterations
              </label>
              <input
                type="number"
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Calculate Sequence
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-100 border-b-2 border-indigo-200">
                  <th className="px-4 py-3 text-left font-semibold">i</th>
                  <th className="px-4 py-3 text-left font-semibold">N<sub>i</sub></th>
                  <th className="px-4 py-3 text-left font-semibold">Calculation</th>
                  <th className="px-4 py-3 text-left font-semibold">Quotient (m×)</th>
                  <th className="px-4 py-3 text-left font-semibold">mod m</th>
                  <th className="px-4 py-3 text-left font-semibold">r = N<sub>i</sub>/(m-1)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-4 py-3 font-mono">{row.i}</td>
                    <td className="px-4 py-3 font-mono font-bold text-indigo-600">
                      {row.Ni}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{row.calculation}</td>
                    <td className="px-4 py-3 font-mono">{row.quotient}</td>
                    <td className="px-4 py-3 font-mono text-green-600">
                      {row.modResult}
                    </td>
                    <td className="px-4 py-3 font-mono">{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}