import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface MemoryFormProps {
  onSubmit?: (memory: { text: string; morse: string }) => void;
  isOpen?: boolean;
}

const MemoryForm = ({
  onSubmit = () => {},
  isOpen = true,
}: MemoryFormProps) => {
  const [memory, setMemory] = useState("");
  const [morsePreview, setMorsePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const maxLength = 100;

  // Convert text to Morse code
  useEffect(() => {
    const textToMorse = (text: string) => {
      const morseMap: Record<string, string> = {
        a: ".-",
        b: "-...",
        c: "-.-.",
        d: "-..",
        e: ".",
        f: "..-.",
        g: "--.",
        h: "....",
        i: "..",
        j: ".---",
        k: "-.-",
        l: ".-..",
        m: "--",
        n: "-.",
        o: "---",
        p: ".--.",
        q: "--.-",
        r: ".-.",
        s: "...",
        t: "-",
        u: "..-",
        v: "...-",
        w: ".--",
        x: "-..-",
        y: "-.--",
        z: "--..",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        "0": "-----",
        " ": "/",
        ".": ".-.-.-",
        ",": "--..--",
        "?": "..--..",
        "'": ".----.",
        "!": "-.-.--",
        "/": "-..-.",
        "(": "-.--.",
        ")": "-.--.-",
        "&": ".-...",
        ":": "---...",
        ";": "-.-.-.",
        "=": "-...-",
        "+": ".-.-.",
        "-": "-....-",
        _: "..--.-",
        '"': ".-..-.",
        $: "...-..-",
        "@": ".--.-.",
      };

      return text
        .toLowerCase()
        .split("")
        .map((char) => morseMap[char] || "")
        .join(" ");
    };

    setMorsePreview(textToMorse(memory));
  }, [memory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memory.trim() || memory.length > maxLength) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit({ text: memory, morse: morsePreview });
      setSubmitStatus("success");
      setMemory("");

      // Reset status after showing success message
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");

      // Reset status after showing error message
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setMemory("");
    setSubmitStatus("idle");
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full max-w-md bg-slate-900 border-slate-700 text-slate-100">
      <CardHeader>
        <CardTitle className="text-center text-xl text-slate-100">
          Share Your Memory
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="memory"
                className="text-sm font-medium text-slate-300"
              >
                Your Memory
              </label>
              <span
                className={`text-xs ${memory.length > maxLength ? "text-red-400" : "text-slate-400"}`}
              >
                {memory.length}/{maxLength}
              </span>
            </div>
            <Textarea
              id="memory"
              placeholder="Type your memory here (100 characters max)..."
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              className="h-24 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              disabled={isSubmitting}
            />
            <Progress
              value={(memory.length / maxLength) * 100}
              className="h-1"
              indicatorClassName={memory.length > maxLength ? "bg-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Morse Code Preview
            </label>
            <div className="p-3 bg-slate-800 rounded-md border border-slate-700 min-h-[60px] text-slate-300 font-mono text-sm break-all">
              {morsePreview || (
                <span className="text-slate-500">
                  Morse code will appear here...
                </span>
              )}
            </div>
          </div>

          {submitStatus === "success" && (
            <Alert className="bg-green-900/30 border-green-800 text-green-200">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription>
                Memory successfully added to the lighthouse!
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="bg-red-900/30 border-red-800 text-red-200">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription>
                Failed to submit memory. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={isSubmitting || !memory}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          >
            Clear
          </Button>
          <Button
            type="submit"
            disabled={
              isSubmitting || !memory.trim() || memory.length > maxLength
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Memory"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MemoryForm;
