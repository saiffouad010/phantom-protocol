/**
 * PHANTOM PROTOCOL
 * Developed by ENG - SAIF
 */
import { useCallback, useState } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ProfileCard } from "@/components/ProfileCard";
import { Footer } from "@/components/Footer";
import { useMediaFlags } from "@/hooks/useMediaFlags";

export function App() {
  const flags = useMediaFlags();
  const [entered, setEntered] = useState(flags.reducedMotion);
  const [replayKey, setReplayKey] = useState(0);
  const handleComplete = useCallback(() => setEntered(true), []);
  const replayIntro = useCallback(() => {
    setEntered(false);
    setReplayKey((key) => key + 1);
  }, []);

  return (
    <div className="relative min-h-dvh">
      <Atmosphere />
      <IntroOverlay key={replayKey} replayKey={replayKey} reducedMotion={flags.reducedMotion} onComplete={handleComplete} />
      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-10">
        <ProfileCard ready={entered} />
        <Footer onReplayIntro={replayIntro} />
      </main>
    </div>
  );
}
