import { Check, Pencil } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { label: "Choose Package", icon: currentStep > 1 ? Check : Pencil },
    {
      label: "Select Add-ons",
      icon: currentStep > 2 ? Check : currentStep > 1 ? Pencil : undefined,
    },
    { label: "Checkout", icon: currentStep > 2 ? Pencil : undefined },
  ];


  return (
    <div className="flex items-center justify-center ">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          {/* Circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep > index + 1
                ? "bg-black text-white"
                : currentStep === index + 1
                ? "border-2 border-gray-800 text-gray-800"
                : "border-2 border-black text-gray-800 bg-gray-100"
            }`}>
            {step.icon ? <step.icon className="w-4 h-4" /> : index + 1}
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-20  mx-2 border border-black ${
                currentStep > index + 1 ? "bg-black" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
