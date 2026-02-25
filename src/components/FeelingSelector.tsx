import React from "react";
import { feelings } from "@/data/affirmations";

interface FeelingSelectorProps {
  onSelect: (feelingId: string) => void;
}

const pastelColors = [
  "bg-pastel-peach",
  "bg-pastel-lavender",
  "bg-pastel-mint",
  "bg-pastel-sky",
  "bg-pastel-rose",
  "bg-pastel-butter",
];

const FeelingSelector: React.FC<FeelingSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex min-h-screen flex-col px-6 py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <span className="mb-4 inline-block text-3xl">🌿</span>
          <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            How Are You Feeling Right Now?
          </h1>
        </div>

        <div className="space-y-3 text-center text-sm leading-relaxed text-muted-foreground">
          <p>You don't have to explain or analyse anything.</p>
          <p>
            Just notice what feels closest to your experience in this moment.
          </p>
          <p>Choose one feeling to begin — you can always come back.</p>
        </div>

        <div className="space-y-3 pt-2">
          {feelings.map((feeling, index) => (
            <button
              key={feeling.id}
              onClick={() => onSelect(feeling.id)}
              className={`w-full rounded-2xl border border-border/50 px-5 py-4 text-left text-[15px] font-medium text-foreground shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${pastelColors[index % pastelColors.length]}`}
            >
              {feeling.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingSelector;
