import { InputProps } from './Input.types';

export const Input = ({
  size,
  value,
  variant,
  onChange,
  autoFocus,
  className,
  placeholder,
  handleEnter,
}: InputProps) => {

  const getVariantClassNames = () => {
    if (variant === 'transparent') return '';
    return 'bg-input border border-stroke rounded-[10px] px-3 hover:border-checked';
  };

  const getSizeClassNames = () => size === 'sm' ? 'h-[29px]' : 'h-[60px]';

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && handleEnter) {
      handleEnter();
    }
  };

  return (
    <div
      title={value}
      className={`${getVariantClassNames()} ${getSizeClassNames()} ${className}`}
    >
      <input
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        onChange={(e) => onChange(e.target.value)}
        className={`outline-0 border-none text-base text-primary-on-primary w-full ${getSizeClassNames()}`}
      />
    </div>
  )
};
