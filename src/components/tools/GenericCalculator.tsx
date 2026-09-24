"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalcDefinition, CalcField, CalcValues } from "@/lib/engine/calc";
import { CALCULATOR_DEFINITIONS } from "@/lib/engine/definitions";

interface Props {
  /** Key into CALCULATOR_DEFINITIONS (the tool_id). Definitions are imported here rather than passed as props because compute functions cannot cross the server→client boundary. */
  definitionId: string;
}

function defaultValues(def: CalcDefinition): CalcValues {
  const out: CalcValues = {};
  for (const f of def.fields) {
    out[f.id] = f.defaultValue ?? (f.type === "select" && f.options ? f.options[0].value : "");
  }
  return out;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: number | string;
  onChange: (v: number | string) => void;
}) {
  const inputClass =
    "w-full px-3 py-2.5 bg-white border border-border rounded-lg text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  if (field.type === "select") {
    return (
      <select
        id={field.id}
        name={field.id}
        className={inputClass}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={field.help ? `${field.id}-help` : undefined}
      >
        {(field.options ?? []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  const isNumeric = field.type !== "text";
  const prefix = field.type === "money" ? "$" : undefined;
  const suffix = field.type === "percent" ? "%" : field.unit;

  return (
    <div className="relative">
      {prefix ? (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
          {prefix}
        </span>
      ) : null}
      <input
        id={field.id}
        name={field.id}
        type={isNumeric ? "number" : "text"}
        inputMode={isNumeric ? "decimal" : undefined}
        className={`${inputClass} ${prefix ? "pl-7" : ""} ${suffix ? "pr-14" : ""}`}
        value={String(value ?? "")}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.step ?? (field.type === "number" ? "any" : undefined)}
        onChange={(e) => onChange(isNumeric ? (e.target.value === "" ? "" : parseFloat(e.target.value)) : e.target.value)}
        aria-describedby={field.help ? `${field.id}-help` : undefined}
      />
      {suffix ? (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary pointer-events-none">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

export default function GenericCalculator({ definitionId }: Props) {
  const definition: CalcDefinition | undefined = CALCULATOR_DEFINITIONS[definitionId];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [values, setValues] = useState<CalcValues>(() => {
    if (!definition) return {};
    const base = defaultValues(definition);
    if (definition.shareable) {
      for (const f of definition.fields) {
        const param = searchParams.get(f.id);
        if (param != null) base[f.id] = f.type === "text" || f.type === "select" ? param : parseFloat(param) || "";
      }
    }
    return base;
  });
  const [touched, setTouched] = useState(false);
  const replaceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const result = useMemo(
    () => (definition ? definition.compute(values) : null),
    [definition, values],
  );

  const update = useCallback(
    (id: string, v: number | string) => {
      setTouched(true);
      setValues((prev) => ({ ...prev, [id]: v }));
      if (definition?.shareable) {
        if (replaceTimer.current) clearTimeout(replaceTimer.current);
        replaceTimer.current = setTimeout(() => {
          const next = new URLSearchParams(window.location.search);
          if (v === "" || v == null) next.delete(id);
          else next.set(id, String(v));
          const qs = next.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        }, 400);
      }
    },
    [definition?.shareable, pathname, router]
  );

  useEffect(() => {
    return () => {
      if (replaceTimer.current) clearTimeout(replaceTimer.current);
    };
  }, []);

  if (!definition || !result) return null;

  const reset = () => {
    setValues(defaultValues(definition));
    setTouched(false);
    if (definition.shareable) router.replace(pathname, { scroll: false });
  };

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Inputs */}
        <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-border">
          <h2 className="text-lg font-semibold text-text mb-4">Enter your values</h2>
          <div className="space-y-4">
            {definition.fields.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-sm font-medium text-text mb-1.5">
                  {f.label}
                </label>
                <FieldInput field={f} value={values[f.id] ?? ""} onChange={(v) => update(f.id, v)} />
                {f.help ? (
                  <p id={`${f.id}-help`} className="mt-1 text-xs text-text-secondary">
                    {f.help}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        <div className="p-5 sm:p-6 bg-bg-secondary" aria-live="polite">
          {!result.ok ? (
            <div>
              <h2 className="text-lg font-semibold text-text mb-3">Result</h2>
              <div
                className={`p-4 rounded-lg border ${
                  touched
                    ? "bg-warning-light border-warning/30 text-warning"
                    : "bg-white border-border text-text-secondary"
                }`}
              >
                <p className="text-sm">{touched ? result.error : "Fill in the fields to see the result."}</p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-text mb-3">{result.output.title}</h2>
              <dl className="space-y-2.5">
                {result.output.lines.map((line) => (
                  <div
                    key={line.label}
                    className={`flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 ${
                      line.emphasis === "primary" ? "bg-primary-light" : "bg-white"
                    }`}
                  >
                    <dt className="text-sm text-text-secondary">
                      {line.label}
                      {line.hint ? <span className="block text-xs text-text-light">{line.hint}</span> : null}
                    </dt>
                    <dd
                      className={`font-semibold text-right ${
                        line.emphasis === "primary" ? "text-primary text-xl" : "text-text"
                      }`}
                    >
                      {line.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {result.output.interpretation ? (
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                  {result.output.interpretation}
                </p>
              ) : null}

              {result.output.steps && result.output.steps.length > 0 ? (
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-sm font-medium text-primary select-none">
                    Show calculation steps
                  </summary>
                  <ol className="mt-3 space-y-2">
                    {result.output.steps.map((s) => (
                      <li key={s.label} className="text-sm bg-white border border-border rounded-lg p-3">
                        <span className="block font-medium text-text">{s.label}</span>
                        <span className="block text-text-secondary mt-1 font-mono text-xs break-words">
                          {s.expression} = <span className="text-text font-semibold">{s.result}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </details>
              ) : null}

              {result.output.warnings && result.output.warnings.length > 0 ? (
                <ul className="mt-4 space-y-1">
                  {result.output.warnings.map((w) => (
                    <li key={w} className="text-xs text-warning bg-warning-light border border-warning/30 rounded-lg p-2.5">
                      {w}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
