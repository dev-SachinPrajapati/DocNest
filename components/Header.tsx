import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <div className="flex flex-row">
          <Image
            src="/assets/icons/logo-icon.svg"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <h1 className="hidden md:block text-2xl font-bold flex-row w-40">
            DocNest
          </h1>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Header;
