import React, { useState, useEffect, useCallback } from "react";
import { feelings } from "@/data/affirmations";

interface AffirmationScreenProps {
  feelingId: string;
  onChooseAnother: () => void;
}

const AffirmationScreen: React.FC<AffirmationScreenProps> = ({
  feelingId,
  onChooseAnother,
}) => {
  const feeling = feelings.find((f) => f.id === feelingId);
  const [key, setKey] = useState(0);

  const handleReadAgain = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  // Reset animation key when feeling changes
  useEffect(() => {
    setKey(0);
  }, [feelingId]);

  if (!feeling) return null;

  return (
    <div className="flex min-h-screen flex-col px-6 py-12">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="text-center">
          <span className="mb-4 inline-block text-3xl">🌿</span>
          <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            {feeling.label}
          </h1>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10" key={key}>
          <div className="space-y-7">
            {feeling.affirmations.map((affirmation, index) => (
              <p
                key={index}
                className="affirmation-fade-in text-center font-serif text-lg leading-relaxed text-foreground/90"
                style={{ animationDelay: `${index * 0.6}s` }}
              >
                {affirmation}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 pb-4 pt-6">
          <button
            onClick={handleReadAgain}
            className="w-full rounded-lg bg-primary py-4 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
          >
            Read Again
          </button>
          <button
            onClick={onChooseAnother}
            className="w-full py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Choose Another Feeling
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffirmationScreen;
