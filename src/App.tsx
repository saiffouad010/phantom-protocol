/**
 * PHANTOM PROTOCOL
 * Developed by ENG - SAIF
 */
import { lazy, Suspense, useCallback, useState } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { ProfileCard } from "@/components/ProfileCard";
import { Footer } from "@/components/Footer";
import { useMediaFlags } from "@/hooks/useMediaFlags";

const LazyIntroOverlay = lazy(() =>
  import("@/components/IntroOverlay").then(({ IntroOverlay }) => ({ default: IntroOverlay })),
);

export function App() {
  const flags = useMediaFlags();
  const [, setEntered] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const handleComplete = useCallback(() => setEntered(true), []);
  const replayIntro = useCallback(() => {
    setEntered(false);
    setReplayKey((key) => key + 1);
  }, []);

  return (
    <div className="relative min-h-dvh">
      <Atmosphere />
      <Suspense fallback={null}>
        <LazyIntroOverlay key={replayKey} replayKey={replayKey} reducedMotion={flags.reducedMotion} onComplete={handleComplete} />
      </Suspense>
      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-10">
        <ProfileCard />
        <Footer onReplayIntro={replayIntro} />
      </main>
    </div>
  );
}
