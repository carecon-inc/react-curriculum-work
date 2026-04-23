import { ProjectColor } from "@/generated/prisma/enums";

export const COLOR_OPTIONS: {
    value: ProjectColor;
    label: string;
    bg: string;
}[] = [
    { value: "BLUE", label: "ブルー", bg: "bg-[#009FE8]" },
    { value: "ORANGE", label: "オレンジ", bg: "bg-[#EC7426]" },
    { value: "EMERALD", label: "エメラルド", bg: "bg-emerald-500" },
    { value: "PURPLE", label: "パープル", bg: "bg-purple-500" },
    { value: "PINK", label: "ピンク", bg: "bg-pink-500" },
];
