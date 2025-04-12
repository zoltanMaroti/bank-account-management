import { Steps } from "@/features/ui/types";

export const steps: Steps = [
    {
        name: "details",
        fields: [
            "targetAmount",
            "sourceAccount",
            "targetAccount",
            "targetCurrency",
        ],
    },
    { name: "review" },
];
