import { ButtonLinkType, ButtonType } from "@/types/Button.type";
import Link from "next/link";
Link;

const Button = ({ children, ...restProps }: ButtonType) => {
  return (
    <button
      className="px-4 py-2 rounded-md bg-greenLight border border-greenLight text-greenDark text-sm w-full hover:bg-green hover:border-solid hover:border-cyan-100 hover:border hover:text-white duration-300 disabled:bg-slate-200"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
export const ButtonLink = ({
  link,
  children,
  ...restProps
}: ButtonLinkType) => {
  return (
    <Link
      href={link}
      className="px-4 py-2 text-center rounded-md bg-greenLight border border-greenLight text-greenDark text-sm w-full hover:bg-green hover:border-solid hover:border-cyan-100 hover:border hover:text-white duration-300 disabled:bg-slate-200"
      {...restProps}
    >
      {children}
    </Link>
  );
};
