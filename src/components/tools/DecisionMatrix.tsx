"use client";

import { useMemo, useState } from "react";

interface Criterion {
  id: string;
  name: string;
  weight: number;
}
interface Option {
  id: string;
  name: string;
}

let uid = 0;
const nextId = () => `x${++uid}`;

export default function DecisionMatrix() {
  const [options, setOptions] = useState<Option[]>([
    { id: nextId(), name: "Option A" },
    { id: nextId(), name: "Option B" },
  ]);
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: nextId(), name: "Price", weight: 3 },
    { id: nextId(), name: "Quality", weight: 3 },
    { id: nextId(), name: "Features", weight: 2 },
  ]);
  const [scores, setScores] = useState<Record<string, number>>({});

  const scoreOf = (optionId: string, criterionId: string) => scores[`${optionId}:${criterionId}`] ?? 3;

  const results = useMemo(() => {
    const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
    if (totalWeight <= 0) return [];
    return options.map((o) => {
      let weighted = 0;
      const breakdown = criteria.map((c) => {
        const sc = scores[`${o.id}:${c.id}`] ?? 3;
        weighted += sc * c.weight;
        return { criterion: c.name, score: sc, weight: c.weight, contribution: sc * c.weight };
      });
      const normalized = (weighted / (totalWeight * 5)) * 100;
      return { option: o.name, raw: weighted, normalized, breakdown };
    }).sort((a, b) => b.normalized - a.normalized);
  }, [options, criteria, scores]);

  const addOption = () =>
    setOptions((prev) => (prev.length >= 4 ? prev : [...prev, { id: nextId(), name: `Option ${String.fromCharCode(65 + prev.length)}` }]));
  const addCriterion = () =>
    setCriteria((prev) => (prev.length >= 8 ? prev : [...prev, { id: nextId(), name: "New criterion", weight: 3 }]));

  const inputClass =
    "w-full px-3 py-2 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  const winner = results[0];
  const runnerUp = results[1];
  const margin = winner && runnerUp ? winner.normalized - runnerUp.normalized : null;

  return (
    <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
      {/* Options */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-text">Your options (2–4)</h2>
          {options.length < 4 && (
            <button type="button" onClick={addOption} className="text-sm font-medium text-primary hover:underline">
              + Add option
            </button>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {options.map((o, i) => (
            <div key={o.id} className="flex gap-1">
              <input
                aria-label={`Option ${i + 1} name`}
                type="text"
                className={inputClass}
                value={o.name}
                onChange={(e) =>
                  setOptions((prev) => prev.map((x) => (x.id === o.id ? { ...x, name: e.target.value } : x)))
                }
              />
              {options.length > 2 && (
                <button
                  type="button"
                  aria-label={`Remove option ${i + 1}`}
                  className="px-2 text-error hover:bg-error-light rounded-lg"
                  onClick={() => {
                    setOptions((prev) => prev.filter((x) => x.id !== o.id));
                    setScores((prev) => {
                      const next = { ...prev };
                      for (const k of Object.keys(next)) if (k.startsWith(`${o.id}:`)) delete next[k];
                      return next;
                    });
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Criteria */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-text">Criteria & weights (1 = low, 5 = must-have)</h2>
          {criteria.length < 8 && (
            <button type="button" onClick={addCriterion} className="text-sm font-medium text-primary hover:underline">
              + Add criterion
            </button>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {criteria.map((c) => (
            <div key={c.id} className="flex gap-1 items-center">
              <input
                aria-label="Criterion name"
                type="text"
                className={inputClass}
                value={c.name}
                onChange={(e) =>
                  setCriteria((prev) => prev.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))
                }
              />
              <input
                aria-label={`Weight for ${c.name}`}
                type="number"
                min={1}
                max={5}
                className={`${inputClass} w-16`}
                value={c.weight}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(5, parseInt(e.target.value || "1", 10)));
                  setCriteria((prev) => prev.map((x) => (x.id === c.id ? { ...x, weight: v } : x)));
                }}
              />
              {criteria.length > 2 && (
                <button
                  type="button"
                  aria-label={`Remove criterion ${c.name}`}
                  className="px-2 text-error hover:bg-error-light rounded-lg"
                  onClick={() => {
                    setCriteria((prev) => prev.filter((x) => x.id !== c.id));
                    setScores((prev) => {
                      const next = { ...prev };
                      for (const k of Object.keys(next)) if (k.endsWith(`:${c.id}`)) delete next[k];
                      return next;
                    });
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Score matrix */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden min-w-[480px]">
          <caption className="sr-only">Score each option against each criterion from 1 to 5</caption>
          <thead>
            <tr className="bg-bg-secondary">
              <th scope="col" className="text-left p-3 font-semibold text-text">Criterion</th>
              {options.map((o) => (
                <th key={o.id} scope="col" className="text-center p-3 font-semibold text-text">
                  {o.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <th scope="row" className="text-left p-3 text-text font-medium">
                  {c.name}
                  <span className="block text-xs text-text-light font-normal">weight {c.weight}</span>
                </th>
                {options.map((o) => (
                  <td key={o.id} className="p-2 text-center">
                    <input
                      aria-label={`${o.name} score for ${c.name}`}
                      type="number"
                      min={1}
                      max={5}
                      className={`${inputClass} w-16 mx-auto text-center`}
                      value={scoreOf(o.id, c.id)}
                      onChange={(e) => {
                        const v = Math.max(1, Math.min(5, parseInt(e.target.value || "1", 10)));
                        setScores((prev) => ({ ...prev, [`${o.id}:${c.id}`]: v }));
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results */}
      <div className="p-4 bg-bg-secondary rounded-lg">
        <h3 className="text-sm font-semibold text-text mb-3">Weighted ranking (out of 100)</h3>
        <ol className="space-y-2">
          {results.map((r, i) => (
            <li key={r.option}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-text">
                  {i === 0 ? "🏆 " : ""}
                  {r.option}
                </span>
                <span className="font-bold text-primary">{r.normalized.toFixed(1)}</span>
              </div>
              <div className="h-3 bg-border-light rounded-full overflow-hidden" aria-hidden>
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-primary/40"}`}
                  style={{ width: `${r.normalized}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {r.breakdown
                  .filter((b) => b.contribution > 0)
                  .map((b) => (
                    <span key={b.criterion} className="text-[11px] px-1.5 py-0.5 bg-white border border-border rounded text-text-secondary">
                      {b.criterion}: {b.score}×{b.weight}
                    </span>
                  ))}
              </div>
            </li>
          ))}
        </ol>
        {winner && margin != null && (
          <p className="mt-3 text-sm text-text-secondary">
            <strong>{winner.option}</strong> leads by {margin.toFixed(1)} points
            {margin < 5 ? " — effectively a close call; small score changes could flip the ranking." : "."}
          </p>
        )}
        <p className="mt-2 text-xs text-text-secondary">
          Scores are yours; the tool only applies the weights transparently. Formula: Σ(score ×
          weight) ÷ (total weight × 5) × 100.
        </p>
      </div>
    </div>
  );
}
