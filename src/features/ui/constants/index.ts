import { Steps } from "@/features/ui/types";

export const steps: Steps = [
    {
        name: "Details",
        fields: [
            "targetAmount",
            "sourceAccount",
            "targetAccount",
            "targetCurrency",
        ],
    },
    { name: "Review" },
];
