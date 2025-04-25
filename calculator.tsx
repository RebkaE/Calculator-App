import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AdvancedCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleEvaluate = () => {
    try {
      const sanitizedExpression = expression
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/√/g, "Math.sqrt")
        .replace(/θ/g, "theta");

      const theta = Math.PI / 4; // default theta value (45 degrees in radians)
      const evalResult = eval(sanitizedExpression);
      setResult(evalResult);
    } catch (e) {
      setResult("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "√(", "^2", "sin(", "cos(",
    "θ", ")"
  ];

  return (
    <motion.div className="p-4 max-w-md mx-auto mt-10">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <Input
            className="text-right text-xl mb-2"
            value={expression}
            readOnly
          />
          <div className="text-right text-lg mb-4">{result}</div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="text-lg p-4"
                onClick={() => {
                  if (btn === "=") handleEvaluate();
                  else if (btn === "^2") handleClick("**2");
                  else handleClick(btn);
                }}
              >
                {btn}
              </Button>
            ))}
            <Button
              variant="destructive"
              className="col-span-4 text-lg p-4"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
