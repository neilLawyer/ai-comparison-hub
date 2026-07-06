export type TierAdvisorAnswers = {
  frequency: "rare" | "weekly" | "daily";
  usage: "casual" | "regular" | "product";
  limits: "never" | "sometimes" | "often";
};

export type TierVerdict = {
  title: string;
  reason: string;
};

export function getTierVerdict(answers: TierAdvisorAnswers): TierVerdict {
  if (answers.usage === "product") {
    return {
      title: "Use the API instead",
      reason:
        "You're integrating AI into a product or workflow — pay-per-token API access gives you programmatic control and usually costs less than a stack of consumer subscriptions at real usage volume.",
    };
  }

  if (answers.frequency === "daily" || answers.limits === "often") {
    return {
      title: "Get a paid subscription",
      reason:
        "Frequent use or regularly hitting free-tier limits means a ~$20/mo consumer subscription will likely pay for itself in saved time and unlocked usage.",
    };
  }

  return {
    title: "The free tier is enough",
    reason:
      "Occasional or casual use rarely bumps into free-tier limits — save the subscription cost until your usage grows.",
  };
}
