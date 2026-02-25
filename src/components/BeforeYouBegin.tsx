import React from "react";

interface BeforeYouBeginProps {
  onBegin: () => void;
}

const BeforeYouBegin: React.FC<BeforeYouBeginProps> = ({ onBegin }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <span className="mb-6 inline-block text-3xl">🌿</span>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
            Before You Begin
          </h1>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            If you feel comfortable, you may choose to stand in front of a
            mirror while reading these affirmations.
          </p>
          <p>
            You might gently look at yourself and say each line out loud, slowly
            and clearly. Hearing your own voice can make the words feel more
            personal and grounding.
          </p>
          <p className="font-medium text-foreground">
            There's no right way to do this.
          </p>
          <div className="space-y-1 text-foreground/80">
            <p>Take your time.</p>
            <p>Breathe naturally.</p>
            <p>There is no need to rush or force any feeling.</p>
          </div>
          <p>
            Even if the words don't feel fully true right now, allowing this
            moment of intention can still be meaningful.
          </p>
          <p className="pt-2 text-center font-serif text-lg text-foreground">
            Whenever you feel ready, you may begin ✨
          </p>
        </div>

        <button
          onClick={onBegin}
          className="mt-4 w-full rounded-lg bg-primary py-4 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
        >
          Begin
        </button>
      </div>
    </div>
  );
};

export default BeforeYouBegin;
