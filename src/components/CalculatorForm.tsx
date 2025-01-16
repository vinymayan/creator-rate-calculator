import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateBaseRate, calculateTotalPrice } from "@/lib/calculator";
import { PricingSummary } from "./PricingSummary";

export const CalculatorForm = () => {
  const [formData, setFormData] = useState({
    followers: "",
    engagementRate: "",
    deliverables: {
      staticPost: 0,
      carouselPost: 0,
      stories: 0,
      reels: 0,
      otherVideo: 0,
    },
    addOns: {
      bioLink: false,
      allowList: false,
      exclusivity: false,
    },
    niche: "",
  });

  const [step, setStep] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDeliverableChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof formData.deliverables
  ) => {
    setFormData({
      ...formData,
      deliverables: {
        ...formData.deliverables,
        [type]: parseInt(e.target.value) || 0,
      },
    });
  };

  const handleAddOnChange = (checked: boolean, type: keyof typeof formData.addOns) => {
    setFormData({
      ...formData,
      addOns: {
        ...formData.addOns,
        [type]: checked,
      },
    });
  };

  const handleCalculate = () => {
    const baseRate = calculateBaseRate(
      parseInt(formData.followers),
      parseFloat(formData.engagementRate)
    );
    const total = calculateTotalPrice(baseRate, formData);
    setCalculatedPrice(total);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-calculator-background">
      <div className="space-y-8">
        {step === 1 && (
          <div className="space-y-4 animate-slideIn">
            <h2 className="text-2xl font-bold text-calculator-primary">
              Basic Information
            </h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="followers">Number of Followers</Label>
                <Input
                  id="followers"
                  type="number"
                  value={formData.followers}
                  onChange={(e) => handleInputChange(e, "followers")}
                  placeholder="Enter number of followers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engagementRate">Engagement Rate (%)</Label>
                <Input
                  id="engagementRate"
                  type="number"
                  step="0.1"
                  value={formData.engagementRate}
                  onChange={(e) => handleInputChange(e, "engagementRate")}
                  placeholder="Enter engagement rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche">Content Niche</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, niche: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-calculator-primary hover:bg-calculator-secondary"
            >
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-slideIn">
            <h2 className="text-2xl font-bold text-calculator-primary">
              Deliverables
            </h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="staticPost">Static Posts</Label>
                <Input
                  id="staticPost"
                  type="number"
                  value={formData.deliverables.staticPost || ""}
                  onChange={(e) => handleDeliverableChange(e, "staticPost")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carouselPost">Carousel Posts</Label>
                <Input
                  id="carouselPost"
                  type="number"
                  value={formData.deliverables.carouselPost || ""}
                  onChange={(e) => handleDeliverableChange(e, "carouselPost")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stories">Stories</Label>
                <Input
                  id="stories"
                  type="number"
                  value={formData.deliverables.stories || ""}
                  onChange={(e) => handleDeliverableChange(e, "stories")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reels">Reels</Label>
                <Input
                  id="reels"
                  type="number"
                  value={formData.deliverables.reels || ""}
                  onChange={(e) => handleDeliverableChange(e, "reels")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherVideo">Other Video Content</Label>
                <Input
                  id="otherVideo"
                  type="number"
                  value={formData.deliverables.otherVideo || ""}
                  onChange={(e) => handleDeliverableChange(e, "otherVideo")}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-1/2"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="w-1/2 bg-calculator-primary hover:bg-calculator-secondary"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-slideIn">
            <h2 className="text-2xl font-bold text-calculator-primary">Add-ons</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bioLink"
                  checked={formData.addOns.bioLink}
                  onCheckedChange={(checked) =>
                    handleAddOnChange(checked as boolean, "bioLink")
                  }
                />
                <Label htmlFor="bioLink">Link in Bio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowList"
                  checked={formData.addOns.allowList}
                  onCheckedChange={(checked) =>
                    handleAddOnChange(checked as boolean, "allowList")
                  }
                />
                <Label htmlFor="allowList">Allow List</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exclusivity"
                  checked={formData.addOns.exclusivity}
                  onCheckedChange={(checked) =>
                    handleAddOnChange(checked as boolean, "exclusivity")
                  }
                />
                <Label htmlFor="exclusivity">Exclusivity</Label>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="w-1/2"
              >
                Back
              </Button>
              <Button
                onClick={handleCalculate}
                className="w-1/2 bg-calculator-primary hover:bg-calculator-secondary"
              >
                Calculate
              </Button>
            </div>
          </div>
        )}

        {calculatedPrice !== null && (
          <PricingSummary
            formData={formData}
            totalPrice={calculatedPrice}
            onReset={() => {
              setCalculatedPrice(null);
              setStep(1);
            }}
          />
        )}
      </div>
    </Card>
  );
};