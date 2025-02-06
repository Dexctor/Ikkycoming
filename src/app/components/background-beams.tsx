"use client";
import { cn } from "@/app/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-full w-full overflow-hidden", className)}>
      {/* Gradient subtil */}
      <div className="absolute inset-0 
        bg-gradient-to-r from-[#00FFA3]/5 via-[#DC1FFF]/5 to-[#00FFA3]/5" 
      />
      
      {/* Points lumineux */}
      <div className="absolute inset-0 
        [background-image:radial-gradient(#DC1FFF_1px,transparent_1px)] 
        [background-size:40px_40px] 
        [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black_80%)]
        opacity-15" 
      />
    </div>
  );
}; 