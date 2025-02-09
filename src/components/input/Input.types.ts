
type InputSize = 'sm' | 'lg';
type InputVariant = 'outlined' | 'transparent';

export type InputProps = {
  value: string;
  size: InputSize;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  variant: InputVariant;
  handleEnter?: () => void;
  onChange: (value: string) => void;
};
