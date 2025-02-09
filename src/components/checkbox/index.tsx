import { IoMdCheckmark } from 'react-icons/io';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({
  checked,
  toggleCheckbox,
}: CheckboxProps) => {

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        className="hidden"
        onChange={toggleCheckbox}
      />
      
      <div
        className={`w-[30px] h-[30px] border-2 rounded-[10px] flex items-center justify-center transition-all hover:bg-check-hover ${
          checked ? "bg-checked border-checked" : "border-checked"
        }`}
      >
        {checked && <IoMdCheckmark size={21} className="text-white" data-testid="checkmark" />}
      </div>
    </label>
  );
};
