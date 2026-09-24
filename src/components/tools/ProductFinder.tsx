"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FinderAnswers,
  FinderMatch,
  FINDER_QUESTIONS,
  findMatches,
} from "@/lib/finder";

type Step = 0 | 1 | 2 | 3;

export default function ProductFinder() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<FinderAnswers>({
    useCase: null,
    budget: null,
    priority: null,
  });
  const [matches, setMatches] = useState<FinderMatch[] | null>(null);

  const questions = FINDER_QUESTIONS;

  function selectAnswer(key: keyof FinderAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 2) {
      setStep((step + 1) as Step);
    } else {
      const next: FinderAnswers = { ...answers, [key]: value };
      setMatches(findMatches(next, 4));
      setStep(3);
    }
  }

  function reset() {
    setAnswers({ useCase: null, budget: null, priority: null });
    setMatches(null);
    setStep(0);
  }

  const progress = useMemo(() => {
    if (step === 3) return 100;
    return Math.round((step / questions.length) * 100);
  }, [step, questions.length]);

  if (step === 3 && matches) {
    return (
      <div className="max-w-2xl mx-auto mb-8 p-6 bg-white border border-border rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Your Shortlist</h2>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-primary hover:underline"
          >
            Start over
          </button>
        </div>

        {matches.length === 0 ? (
          <div className="p-4 bg-warning-light border border-warning/30 rounded-lg">
            <p className="text-sm text-warning">
              No phones matched those constraints with confidence. Try loosening your budget
              preference, or{" "}
              <Link href="/products" className="underline">
                browse all phones
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-text-secondary mb-4">
              Ranked using published specifications (camera hardware, battery capacity, price,
              weight, update commitment, and related attributes) — not lab tests. Open the top
              two side by side to see the differences.
            </p>
            <ol className="space-y-4">
              {matches.map((match, index) => (
                <li
                  key={match.product.id}
                  className="p-4 border border-border rounded-lg bg-bg-secondary"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium text-primary">
                        #{index + 1}
                        {index === 0 ? " · Strong fit for your answers" : ""}
                      </span>
                      <h3 className="font-semibold text-text">{match.product.fullName}</h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {match.product.summary}
                      </p>
                      {match.product.pricing.msrp != null && (
                        <p className="text-sm font-medium text-text mt-1">
                          From ${match.product.pricing.msrp.toLocaleString()} MSRP
                        </p>
                      )}
                      {match.reasons.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {Array.from(new Set(match.reasons)).slice(0, 4).map((reason) => (
                            <li
                              key={reason}
                              className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full"
                            >
                              {reason}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <Link
                      href={`/products/${match.product.slug}`}
                      className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
                    >
                      Details →
                    </Link>
                  </div>
                </li>
              ))}
            </ol>

            {matches.length >= 2 && (
              <div className="mt-6 p-4 bg-primary-light rounded-lg">
                <p className="text-sm text-text mb-3">
                  See exactly how your top two differ, side by side.
                </p>
                <Link
                  href={`/tools/product-comparison?a=${matches[0].product.id}&b=${matches[1].product.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Compare {matches[0].product.model} vs {matches[1].product.model} →
                </Link>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/tools/product-comparison"
                className="text-sm font-medium text-primary hover:underline"
              >
                Open comparison tool →
              </Link>
              <Link href="/products" className="text-sm font-medium text-primary hover:underline">
                Browse all phones →
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }

  const current = questions[Math.min(step, questions.length - 1)];

  return (
    <div className="max-w-2xl mx-auto mb-8 p-6 bg-white border border-border rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          Question {step + 1} of {questions.length}
        </p>
        <button type="button" onClick={reset} className="text-xs text-text-secondary hover:text-primary">
          Reset
        </button>
      </div>
      <div className="h-1.5 bg-border-light rounded-full mb-5 overflow-hidden" aria-hidden>
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <fieldset>
        <legend className="text-lg font-semibold text-text mb-4">{current.question}</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {current.options.map((option) => {
            const selected =
              answers[current.key as keyof FinderAnswers] === (option.value as string);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectAnswer(current.key, option.value as string)}
                className={`p-4 text-left rounded-lg border transition-colors ${
                  selected
                    ? "border-primary bg-primary-light"
                    : "border-border bg-white hover:border-primary hover:bg-primary-light/50"
                }`}
                aria-pressed={selected}
              >
                <span className="block font-medium text-text">{option.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((step - 1) as Step)}
          className="mt-4 text-sm text-text-secondary hover:text-primary"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
