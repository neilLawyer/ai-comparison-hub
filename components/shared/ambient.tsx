export function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="aurora-blob opacity-20 dark:opacity-30"
        style={{
          top: "-18%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle at center, oklch(0.55 0.25 293) 0%, transparent 65%)",
          animationDuration: "34s",
        }}
      />
      <div
        className="aurora-blob opacity-15 dark:opacity-20"
        style={{
          top: "10%",
          right: "-15%",
          width: "48vw",
          height: "48vw",
          background:
            "radial-gradient(circle at center, oklch(0.6 0.18 250) 0%, transparent 65%)",
          animationDuration: "44s",
          animationDelay: "-12s",
        }}
      />
      <div
        className="aurora-blob opacity-10 dark:opacity-15"
        style={{
          bottom: "-25%",
          left: "22%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle at center, oklch(0.5 0.2 330) 0%, transparent 65%)",
          animationDuration: "52s",
          animationDelay: "-25s",
        }}
      />
      <div className="grain" />
    </div>
  );
}
