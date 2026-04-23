import { COLOR_OPTIONS } from "@/constants";
import { ProjectColor } from "@/generated/prisma/enums";

type ColorPickerProps = {
    value: ProjectColor;
    onChange: (color: ProjectColor) => void;
};

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                カラー
            </label>
            <div className="flex gap-3">
                {COLOR_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        title={opt.label}
                        onClick={() => onChange(opt.value)}
                        className={`w-8 h-8 rounded-full ${opt.bg} transition-transform ${
                            value === opt.value
                                ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                                : "hover:scale-105"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
