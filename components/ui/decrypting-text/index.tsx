import React, { useEffect, useState } from "react";

type DecryptingTextProps = {
  text: string;
  duration?: number; // Duration of the animation in milliseconds
};

const DecryptingText: React.FC<DecryptingTextProps> = ({
  text,
  duration = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState(
    "".padEnd(text.length, "_")
  );

  useEffect(() => {
    let animationFrame: number;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const numCharsToReveal = Math.floor(progress * text.length);

      const newText = text
        .split("")
        .map((char, index) => {
          if (index < numCharsToReveal) {
            return char;
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setDisplayedText(newText);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [text, duration]);

  return <span>{displayedText}</span>;
};

export default DecryptingText;
