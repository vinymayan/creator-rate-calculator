import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingSummaryProps {
  formData: {
    followers: string;
    engagementRate: string;
    deliverables: {
      staticPost: number;
      carouselPost: number;
      stories: number;
      reels: number;
      otherVideo: number;
    };
    addOns: {
      bioLink: boolean;
      allowList: boolean;
      exclusivity: boolean;
    };
    niche: string;
  };
  totalPrice: number;
  onReset: () => void;
}

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  formData,
  totalPrice,
  onReset,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="mt-8 bg-white">
      <CardHeader>
        <CardTitle>Pricing Summary</CardTitle>
        <CardDescription>
          Based on {formData.followers} followers and {formData.engagementRate}%
          engagement rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Deliverables:</h3>
            {formData.deliverables.staticPost > 0 && (
              <p>Static Posts: {formData.deliverables.staticPost}</p>
            )}
            {formData.deliverables.carouselPost > 0 && (
              <p>Carousel Posts: {formData.deliverables.carouselPost}</p>
            )}
            {formData.deliverables.stories > 0 && (
              <p>Stories: {formData.deliverables.stories}</p>
            )}
            {formData.deliverables.reels > 0 && (
              <p>Reels: {formData.deliverables.reels}</p>
            )}
            {formData.deliverables.otherVideo > 0 && (
              <p>Other Videos: {formData.deliverables.otherVideo}</p>
            )}
          </div>

          {(formData.addOns.bioLink ||
            formData.addOns.allowList ||
            formData.addOns.exclusivity) && (
            <div className="space-y-2">
              <h3 className="font-semibold">Add-ons:</h3>
              {formData.addOns.bioLink && <p>Link in Bio</p>}
              {formData.addOns.allowList && <p>Allow List</p>}
              {formData.addOns.exclusivity && <p>Exclusivity</p>}
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-2xl font-bold">
              Total: {formatCurrency(totalPrice)}
            </p>
          </div>

          <Button
            onClick={onReset}
            className="w-full mt-4 bg-calculator-primary hover:bg-calculator-secondary text-white"
          >
            Calculate Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};