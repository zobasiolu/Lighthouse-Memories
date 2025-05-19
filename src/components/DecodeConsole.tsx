import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DecodeConsoleProps {
  currentMorse?: string;
  onSubmitDecoding?: (decodedText: string) => void;
}

const DecodeConsole = ({
  currentMorse = "... --- ... / ... --- ...",
  onSubmitDecoding = () => {},
}: DecodeConsoleProps) => {
  const [decodedText, setDecodedText] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (decodedText.trim() === "") {
      setFeedback({
        type: "error",
        message: "Please enter your decoded message",
      });
      return;
    }

    onSubmitDecoding(decodedText);

    // This is a placeholder for the actual validation logic
    // In a real implementation, this would be handled by the parent component
    const isCorrect = Math.random() > 0.5; // Simulating success/failure

    if (isCorrect) {
      setFeedback({
        type: "success",
        message: "Correct translation! Memory added to your journal.",
      });
    } else {
      setFeedback({
        type: "error",
        message: "Translation incorrect. Try again.",
      });
    }
  };

  const morseReference = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    " ": "/", // Space is represented as a slash in Morse
  };

  return (
    <Card className="w-full max-w-md bg-slate-900 border-slate-700 text-slate-100">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-slate-100">
            Decode Console
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-slate-100"
                >
                  <HelpCircle size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 text-slate-100 border-slate-700">
                Watch the lighthouse flashes and decode the Morse message
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-slate-400">
          Decode the lighthouse flashes to reveal memories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-slate-800 rounded-md overflow-x-auto">
            <p className="font-mono text-amber-400 whitespace-nowrap">
              {currentMorse}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="audio-mode"
              checked={audioEnabled}
              onCheckedChange={setAudioEnabled}
            />
            <Label htmlFor="audio-mode" className="text-slate-300">
              Enable audio beeps
            </Label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="decoded-text" className="text-slate-300">
                Your translation
              </Label>
              <Textarea
                id="decoded-text"
                placeholder="Type what you think the message says..."
                className="mt-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                value={decodedText}
                onChange={(e) => setDecodedText(e.target.value)}
              />
            </div>

            {feedback.type && (
              <Alert
                variant={
                  feedback.type === "success" ? "default" : "destructive"
                }
                className={
                  feedback.type === "success"
                    ? "bg-green-900/20 border-green-800 text-green-200"
                    : "bg-red-900/20 border-red-800 text-red-200"
                }
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                )}
                <AlertDescription>{feedback.message}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Translation
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start border-t border-slate-800 pt-4">
        <p className="text-sm text-slate-400 mb-2">Morse Code Reference</p>
        <div className="grid grid-cols-6 gap-2 w-full text-xs text-slate-300">
          {Object.entries(morseReference)
            .slice(0, 24)
            .map(([char, code]) => (
              <div key={char} className="flex justify-between">
                <span className="font-semibold">{char}</span>
                <span className="font-mono">{code}</span>
              </div>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DecodeConsole;
