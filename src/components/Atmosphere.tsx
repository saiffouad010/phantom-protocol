import { useEffect, useRef } from "react";
import { profile } from "@/config/profile";
import { useMediaFlags } from "@/hooks/useMediaFlags";

export function Atmosphere() {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const flags = useMediaFlags();
  const canVideo =
    Boolean(profile.media.video) && !flags.simplifyAtmosphere && !flags.reducedMotion;

  useEffect(() => {
    const node = layerRef.current;
    if (!node || flags.coarsePointer || flags.reducedMotion) return;

    let frame = 0;
    let mx = 0.5;
    let my = 0.5;

    const onMove = (event: PointerEvent) => {
      mx = event.clientX / window.innerWidth;
      my = event.clientY / window.innerHeight;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (mx - 0.5) * 18;
        const y = (my - 0.5) * 12;
        node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
        node.style.setProperty("--lx", `${mx * 100}%`);
        node.style.setProperty("--ly", `${my * 100}%`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [flags.coarsePointer, flags.reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canVideo) return;

    const fadeOut = () => {
      video.style.opacity = "0";
    };

    video.addEventListener("ended", fadeOut);
    void video.play().catch(() => fadeOut());

    return () => {
      video.removeEventListener("ended", fadeOut);
      video.pause();
    };
  }, [canVideo]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void" aria-hidden="true">
      <div
        ref={layerRef}
        className="absolute -inset-10 origin-center will-change-transform"
        style={{ transform: "scale(1.06)" }}
      >
        <img
          src={profile.media.background}
          alt=""
          className="h-full w-full object-cover object-[center_42%] opacity-55 grayscale"
        />
        {canVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen transition-opacity duration-[1800ms] ease-out"
            muted
            playsInline
            preload="metadata"
            poster={profile.media.poster}
          >
            <source src={profile.media.video} type="video/mp4" />
          </video>
        ) : null}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(520px circle at var(--lx, 50%) var(--ly, 30%), rgba(229,57,53,0.16), transparent 46%)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[#050506]/55" />
      <div className="vignette" />
      <p className="pointer-events-none absolute top-[46%] left-1/2 w-[160vw] -translate-x-1/2 -translate-y-1/2 text-center font-display text-[18vw] font-semibold tracking-[-0.08em] text-white/[0.045] select-none">
        PHANTOM
      </p>
      <div className="grain" />
    </div>
  );
}
