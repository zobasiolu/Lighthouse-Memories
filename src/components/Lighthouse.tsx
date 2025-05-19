import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LighthouseProps {
  currentMemory?: {
    text: string;
    morse: string;
    sentiment?: "positive" | "neutral" | "negative";
  };
  isFlashing?: boolean;
  onFlashComplete?: () => void;
}

const Lighthouse = ({
  currentMemory = {
    text: "Welcome to Memory Morse",
    morse: "... --- ...", // SOS as default
    sentiment: "neutral",
  },
  isFlashing = true,
  onFlashComplete = () => {},
}: LighthouseProps) => {
  const [isBeamOn, setIsBeamOn] = useState(false);
  const [rotation, setRotation] = useState(0);
  const morseSequenceRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Parse morse code into timing sequence
  useEffect(() => {
    if (currentMemory?.morse) {
      // Convert morse string into array of dots, dashes and spaces
      const sequence = currentMemory.morse
        .split("")
        .map((char) => {
          if (char === ".") return "dot";
          if (char === "-") return "dash";
          if (char === " ") return "space";
          return null;
        })
        .filter(Boolean) as string[];

      morseSequenceRef.current = sequence;
      currentIndexRef.current = 0;
    }
  }, [currentMemory]);

  // Handle the lighthouse beam rotation
  useEffect(() => {
    const rotateBeam = () => {
      setRotation((prev) => (prev + 0.2) % 360);
      animationFrameRef.current = requestAnimationFrame(rotateBeam);
    };

    animationFrameRef.current = requestAnimationFrame(rotateBeam);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle morse code flashing
  useEffect(() => {
    if (!isFlashing) {
      setIsBeamOn(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const flashNextSymbol = () => {
      if (currentIndexRef.current >= morseSequenceRef.current.length) {
        // Reset to beginning of sequence
        currentIndexRef.current = 0;
        onFlashComplete();
      }

      const symbol = morseSequenceRef.current[currentIndexRef.current];
      currentIndexRef.current++;

      // Set flash duration based on symbol
      let onDuration = 200; // dot duration
      let offDuration = 200; // space between symbols

      if (symbol === "dash") {
        onDuration = 600; // dash is 3x dot duration
      } else if (symbol === "space") {
        onDuration = 0;
        offDuration = 600; // space between words
      }

      // Turn beam on
      setIsBeamOn(true);

      // Schedule turning it off
      timeoutId = setTimeout(() => {
        setIsBeamOn(false);

        // Schedule next symbol
        timeoutId = setTimeout(flashNextSymbol, offDuration);
      }, onDuration);
    };

    // Start the sequence
    flashNextSymbol();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFlashing, onFlashComplete]);

  // Determine beam color based on sentiment
  const getBeamColor = () => {
    switch (currentMemory?.sentiment) {
      case "positive":
        return "rgba(255, 255, 200, 0.8)";
      case "negative":
        return "rgba(255, 200, 200, 0.8)";
      case "neutral":
      default:
        return "rgba(255, 255, 255, 0.8)";
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900">
      {/* Ocean background */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-950">
        {/* Animated waves */}
        <div className="absolute bottom-0 w-full h-32 opacity-30">
          <motion.div
            className="absolute bottom-0 w-full h-16 bg-blue-700 rounded-t-full"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 w-full h-24 bg-blue-800 rounded-t-full"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Lighthouse structure */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-40 flex flex-col items-center">
        {/* Lighthouse top/lantern room */}
        <div className="relative w-24 h-24 bg-gray-200 rounded-t-full z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Lighthouse beam */}
          {isBeamOn && (
            <div
              className="absolute w-[800px] h-40 origin-left"
              style={{
                left: "50%",
                top: "50%",
                transform: `translateY(-50%) rotate(${rotation}deg)`,
                background: `linear-gradient(90deg, ${getBeamColor()}, transparent)`,
                opacity: 0.8,
                zIndex: -1,
              }}
            />
          )}

          {/* Lighthouse railing */}
          <div className="absolute -bottom-2 w-28 h-4 bg-gray-400 rounded-full left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Lighthouse tower */}
        <div className="w-20 h-80 bg-gradient-to-b from-gray-200 to-gray-300 relative">
          {/* Lighthouse stripes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-12 bg-red-500"
              style={{ top: i * 40 + "px" }}
            />
          ))}

          {/* Lighthouse door */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-yellow-800 rounded-t-lg"></div>
        </div>

        {/* Lighthouse base */}
        <div className="w-32 h-10 bg-gray-400 rounded-t-lg"></div>
      </div>

      {/* Debug info - can be removed in production */}
      <div className="absolute top-4 left-4 text-white text-xs bg-black/50 p-2 rounded">
        <p>Current Memory: {currentMemory.text.substring(0, 20)}...</p>
        <p>Morse: {currentMemory.morse.substring(0, 20)}...</p>
        <p>Sentiment: {currentMemory.sentiment}</p>
        <p>Beam Status: {isBeamOn ? "ON" : "OFF"}</p>
      </div>
    </div>
  );
};

export default Lighthouse;
