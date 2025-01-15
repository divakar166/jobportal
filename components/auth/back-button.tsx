"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLoader } from "@/providers/LoaderContext";

interface BackButtonProps {
  label: string;
  onClick?: () => void;
}

export const BackButton = ({
  label,
  onClick
}: BackButtonProps) => {
  const router = useRouter();
  const { setLoading } = useLoader();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Show the loader
    setLoading(true);

    // Simulate a short delay to showcase the loader effect
    setTimeout(() => {
      if (onClick) {
        onClick();
      } else {
        router.push('/');
      }

      // Hide the loader after navigation
      setLoading(false);
    }, 500); // Adjust delay as needed
  };
  return (
    <Button
      variant="link"
      className="font-normal w-full text-black dark:text-white"
      size="sm"
      asChild
      onClick={handleClick}
    >
      <div className="cursor-pointer">{label}</div>
    </Button>
  )
}