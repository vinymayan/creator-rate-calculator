export const calculateBaseRate = (followers: number, engagementRate: number) => {
  let ratePercentage = 0;

  if (followers <= 10000) {
    if (engagementRate >= 5 && engagementRate < 10) {
      ratePercentage = 0.025; // 2.5%
    } else if (engagementRate >= 10 && engagementRate < 20) {
      ratePercentage = 0.035; // 3.5%
    } else if (engagementRate >= 20) {
      ratePercentage = 0.045; // 4.5%
    }
  } else if (followers <= 100000) {
    if (engagementRate >= 3 && engagementRate < 5) {
      ratePercentage = 0.025; // 2.5%
    } else if (engagementRate >= 5 && engagementRate < 10) {
      ratePercentage = 0.035; // 3.5%
    } else if (engagementRate >= 10) {
      ratePercentage = 0.045; // 4.5%
    }
  } else {
    if (engagementRate >= 3 && engagementRate < 5) {
      ratePercentage = 0.0175; // 1.75%
    } else if (engagementRate >= 5) {
      ratePercentage = 0.025; // 2.5%
    }
  }

  return followers * ratePercentage;
};

export const calculateTotalPrice = (
  baseRate: number,
  formData: {
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
  }
) => {
  let total = 0;

  // Calculate deliverables
  total += baseRate * formData.deliverables.staticPost; // Static posts
  total += (baseRate * 1.2) * formData.deliverables.carouselPost; // Carousel posts (+20%)
  total += (baseRate * 0.2) * formData.deliverables.stories; // Stories (20% of base rate)
  total += (baseRate * 1.5) * formData.deliverables.reels; // Reels (+50%)
  total += (baseRate * 1.5) * formData.deliverables.otherVideo; // Other videos (+50%)

  // Add-ons
  if (formData.addOns.bioLink) {
    total += baseRate * 0.275; // 27.5% for bio link
  }
  if (formData.addOns.allowList) {
    total += baseRate * 0.35; // 35% for allow list
  }
  if (formData.addOns.exclusivity) {
    total += baseRate * 0.75; // 75% for exclusivity
  }

  // Niche multiplier
  const nicheMultipliers: { [key: string]: number } = {
    tech: 1.1, // +10% for tech
    fashion: 1.15, // +15% for fashion
    beauty: 1.12, // +12% for beauty
    lifestyle: 1.08, // +8% for lifestyle
    food: 1.05, // +5% for food
  };

  if (formData.niche && nicheMultipliers[formData.niche]) {
    total *= nicheMultipliers[formData.niche];
  }

  // Package discounts
  const totalDeliverables =
    formData.deliverables.staticPost +
    formData.deliverables.carouselPost +
    formData.deliverables.stories +
    formData.deliverables.reels +
    formData.deliverables.otherVideo;

  if (totalDeliverables >= 5) {
    total *= 0.85; // 15% discount for 5+ deliverables
  } else if (totalDeliverables >= 3) {
    total *= 0.9; // 10% discount for 3+ deliverables
  }

  return Math.round(total * 100) / 100; // Round to 2 decimal places
};