import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
}

const Button = ({ className, children, width = "w-full", ...rest }: Iprops) => {
  return (
    <button
      className={`px-4 py-2 ${className} ${width} rounded-lg  text-white `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
