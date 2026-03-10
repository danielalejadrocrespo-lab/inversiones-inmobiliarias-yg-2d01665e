const phrase = "Esoqueteestoypassandoesunapáginaweb";
const longPhrase = "Eso que te estoy pasando es una página web ";

const Index = () => {
  // Generate enough repetitions to fill ~3 viewports at massive text
  const wallText = longPhrase.repeat(200);

  return (
    <div className="bg-background">
      {/* The Wall */}
      <div
        className="font-wall text-muted-foreground overflow-hidden select-none"
        style={{
          fontSize: "18vw",
          lineHeight: "0.85em",
          wordBreak: "break-all",
          letterSpacing: "-0.02em",
        }}
      >
        {wallText}
      </div>

      {/* The Break — The Reveal */}
      <div className="h-screen flex items-center justify-center px-8">
        <p
          className="font-reveal text-foreground text-center"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            lineHeight: "1.4em",
            maxWidth: "20em",
          }}
        >
          Eso que te estoy pasando es una página web.
        </p>
      </div>
    </div>
  );
};

export default Index;
