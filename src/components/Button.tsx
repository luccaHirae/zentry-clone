import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

export const Button = ({
  className,
  rightIcon,
  leftIcon,
  children,
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black',
        className
      )}
    >
      {leftIcon && leftIcon}

      <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
        <div>{children}</div>
      </span>

      {rightIcon && rightIcon}
    </button>
  );
};
