import React from "react";
import { Button } from "./button";
import Image from "next/image";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      <div className="flex items-center flex-4">
        {isLoading ? (
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            height={24}
            width={24}
            className="animate-spin"
          >
            Loading...
          </Image>
        ) : (
          children
        )}
      </div>
    </Button>
  );
};

export default SubmitButton;
