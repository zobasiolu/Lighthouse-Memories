import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Lighthouse from "@/components/Lighthouse";
import DecodeConsole from "@/components/DecodeConsole";
import MemoryForm from "@/components/MemoryForm";

// Create a default MemoryJournal component since the import is failing
const MemoryJournal = ({ onClose = () => {} }) => {
  return (
    <div className="p-4 bg-slate-900">
      <h2 className="text-xl font-bold mb-4">Memory Journal</h2>
      <p className="text-gray-300 mb-4">
        Your decoded memories will appear here.
      </p>
      <div className="border border-slate-700 rounded-md p-4 min-h-[300px] mb-4">
        <p className="text-gray-400 text-center italic mt-12">
          No memories decoded yet.
        </p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

const LighthouseScene = () => {
  const [isDecodeOpen, setIsDecodeOpen] = useState(false);
  const [isMemoryFormOpen, setIsMemoryFormOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a1929] text-white">
      {/* Night sky with stars */}
      <div className="absolute inset-0 bg-[#0a1929]">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Ocean with waves */}
      <div className="absolute bottom-0 w-full h-1/3 bg-[#0d2e4a]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-8 bg-[#163b5e] opacity-30"
            style={{ bottom: i * 20 + "px" }}
            animate={{
              x: [0, 20, 0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + i,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Lighthouse component */}
      <div className="absolute left-1/2 bottom-[33%] transform -translate-x-1/2">
        <Lighthouse audioEnabled={audioEnabled} />
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <Dialog open={isDecodeOpen} onOpenChange={setIsDecodeOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-800/70 text-white border-slate-600 hover:bg-slate-700"
            >
              Decode Memory
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white">
            <DecodeConsole
              onClose={() => setIsDecodeOpen(false)}
              audioEnabled={audioEnabled}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isMemoryFormOpen} onOpenChange={setIsMemoryFormOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-800/70 text-white border-slate-600 hover:bg-slate-700"
            >
              Create Memory
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white">
            <MemoryForm onClose={() => setIsMemoryFormOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={isJournalOpen} onOpenChange={setIsJournalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-800/70 text-white border-slate-600 hover:bg-slate-700"
            >
              Memory Journal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl">
            <MemoryJournal onClose={() => setIsJournalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Settings panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-slate-800/50 p-3 rounded-md">
        <div className="flex items-center gap-2">
          <label htmlFor="audio-toggle" className="text-sm">
            Morse Audio:
          </label>
          <input
            id="audio-toggle"
            type="checkbox"
            checked={audioEnabled}
            onChange={() => setAudioEnabled(!audioEnabled)}
            className="rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="volume-slider" className="text-sm">
            Wave Volume:
          </label>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      {/* Ambient text */}
      <div className="absolute bottom-32 left-8 text-white/30 text-sm max-w-xs">
        <p>
          Listen to the lighthouse. Each flash carries a memory waiting to be
          discovered...
        </p>
      </div>
    </div>
  );
};

export default LighthouseScene;
