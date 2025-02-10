import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <div data-testid="checkbox-container" className="flex items-center mb-0.5 min-h-[1.5rem]">
            <div className="flex items-center relative">
                <input
                    data-testid="checkbox-input"
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    id="checkboxDefault"
                    className={`h-[30px] w-[30px] appearance-none rounded-md border-2 border-solid border-stoneGray-700 outline-none hover:cursor-pointer ${checked ? 'bg-stoneGray-700' : ''
                        }`}
                />
                {checked && (
                    <svg
                        data-testid="checkbox-check-icon"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        width="18"
                        height="13"
                        viewBox="0 0 18 13"
                        fill="none"
                    >
                        <path
                            d="M17 1L6 12L1 7"
                            stroke="var(--color-stoneGray-200)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
            <label
                data-testid="checkbox-label"
                className={`ml-2 hover:cursor-pointer ${checked ? 'line-through text-stoneGray-700' : 'text-stoneGray-800'
                    }`}
                htmlFor="checkboxDefault"
            >
                {label}
            </label>
        </div>
    );
};

