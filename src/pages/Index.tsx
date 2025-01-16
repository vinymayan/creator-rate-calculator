import { CalculatorForm } from "@/components/CalculatorForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-calculator-muted to-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-calculator-primary mb-4">
          Creator Fee Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate your content creation fees based on your metrics and deliverables
        </p>
        <CalculatorForm />
      </div>
    </div>
  );
};

export default Index;