import { Link } from "react-router-dom";

interface BrandLogoProps {
  to?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "inverse";
  className?: string;
}

const sizeClasses = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

const textSizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

export const BrandLogo = ({
  to = "/",
  size = "md",
  variant = "default",
  className = "",
}: BrandLogoProps) => {
  const nameClassName = variant === "inverse" ? "text-white" : "text-secondary dark:text-white";

  const content = (
    <>
      <img src="/barbercloud-logo.svg" alt="" className={sizeClasses[size]} aria-hidden="true" />
      <span className={nameClassName}>Barber</span>
      <span className="text-primary">Cloud</span>
    </>
  );

  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 font-bold ${textSizeClasses[size]} ${className}`}
      aria-label="BarberCloud"
    >
      {content}
    </Link>
  );
};
