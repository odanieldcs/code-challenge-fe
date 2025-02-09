import { ColorPickerProps } from '@/components/color-picker/color-picker.types';

export const ColorPicker = ({
  value,
  onChange,
}: ColorPickerProps) => (
  <div className="relative group ">
    <input
      type="color"
      value={value}
      data-testid="color-picker-input"
      onChange={(e) => onChange(e.target.value)}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />

    <button
      data-testid="color-picker-button"
      style={{ backgroundColor: value }}
      className="w-8 h-8 rounded-full group-hover:border group-hover:border-gray-900"
    />
  </div>
);
