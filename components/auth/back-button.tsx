"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export const BackButton = ({
  href,
  label,
  onClick
}: BackButtonProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(); // Call the provided onClick handler
    } else {
      router.push(href); // Default behavior
    }
  };
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
      onClick={handleClick}
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}