import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

interface AvatarImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const AvatarImage = React.forwardRef<HTMLDivElement, AvatarImageProps>(
  ({ className, src, alt, width, height, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  )
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
