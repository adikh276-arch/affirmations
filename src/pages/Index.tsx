import React, { useState } from "react";
import BeforeYouBegin from "@/components/BeforeYouBegin";
import FeelingSelector from "@/components/FeelingSelector";
import AffirmationScreen from "@/components/AffirmationScreen";

type Screen = "intro" | "feelings" | "affirmation";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedFeeling, setSelectedFeeling] = useState<string>("");

  const handleBegin = () => setScreen("feelings");

  const handleSelectFeeling = (feelingId: string) => {
    setSelectedFeeling(feelingId);
    setScreen("affirmation");
  };

  const handleChooseAnother = () => setScreen("feelings");

  return (
    <div className="min-h-screen bg-background">
      {screen === "intro" && <BeforeYouBegin onBegin={handleBegin} />}
      {screen === "feelings" && (
        <FeelingSelector onSelect={handleSelectFeeling} />
      )}
      {screen === "affirmation" && (
        <AffirmationScreen
          feelingId={selectedFeeling}
          onChooseAnother={handleChooseAnother}
        />
      )}
    </div>
  );
};

export default Index;
