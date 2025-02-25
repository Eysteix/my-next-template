"use client";

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core';
import * as lucide from "lucide-react"; // For Lucide Icons
import * as solid from "@fortawesome/free-solid-svg-icons"; // For FontAwesome Solid Icons
import { cn } from "@/lib/utils"; // Assuming 'cn' is a utility for conditional classNames
import * as regular from "@fortawesome/free-regular-svg-icons";
import * as brands from "@fortawesome/free-brands-svg-icons";
// Dynamically render Lucide Icons
const LIcons: FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  if (!icon) {
    console.error("Icon name is not provided.");
    return null;
  }

  // Dynamically get the icon component from lucide
  const TheIcon = lucide[icon as keyof typeof lucide] as FC<React.SVGProps<SVGSVGElement>>;

  // Ensure the icon exists in lucide
  if (!TheIcon) {
    console.error(`Icon "${icon}" not found in lucide-react.`);
    return null;
  }

  return (
    <TheIcon className={cn("text-primary hover:text-foreground active:text-foreground group-hover:text-foreground", className)} aria-hidden="true" />
  );
};

export default LIcons;

// Dynamically render FontAwesome Icons


export function FIcons({
  icon,
  className,
  size,
}: {
  icon:string;
  className?: string;
  size?: SizeProp;
}) {
  // Determine which pack the icon belongs to
  let TheIcon: IconProp | undefined;

  // Handle solid icons
  if (solid[icon as keyof typeof solid]) {
    TheIcon = solid[icon as keyof typeof solid] as IconProp;
  }
  // Check if the icon is found in the regular icons pack
  else if (regular[icon as keyof typeof regular]) {
    TheIcon = regular[icon as keyof typeof regular] as IconProp;
  }
  // Check if the icon is found in the brand icons pack
  else if (brands[icon as keyof typeof brands]) {
    TheIcon = brands[icon as keyof typeof brands] as IconProp;
  }


  // Ensure the icon exists in one of the packs
  if (!TheIcon) {
    console.error(`Icon "${String(icon)}" not found in FontAwesome.`);
    return null;
  }

  return <FontAwesomeIcon icon={TheIcon} className={cn(className)} size={size} />;
}