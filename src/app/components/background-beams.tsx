"use client";
import { cn } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundBeams = ({ className, children }: { className?: string, children?: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const dots2Ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check and add resize listener
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const dots = dotsRef.current;
    const dots2 = dots2Ref.current;
    if (!container || !dots || !dots2) return;
    
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Improved animation interpolation
    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor;
    
    const animate = () => {
      const smoothFactor = isMobile ? 0.05 : 0.08; // Adjust smoothness for mobile
      currentX = lerp(currentX, targetX, smoothFactor);
      currentY = lerp(currentY, targetY, smoothFactor);
      
      // Use translate3d for GPU acceleration
      dots.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      dots2.style.transform = `translate3d(${currentX * 1.2}px, ${currentY * 1.2}px, 0)`;
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      requestAnimationFrame(() => {
        container.style.setProperty("--x", `${x}px`);
        container.style.setProperty("--y", `${y}px`);
      });
      
      // Reduced parallax effect on mobile
      const parallaxFactor = isMobile ? 0.005 : 0.015;
      targetX = (clientX - window.innerWidth / 2) * parallaxFactor;
      targetY = (clientY - window.innerHeight / 2) * parallaxFactor;
    };
    
    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "h-full w-full overflow-hidden relative",
        "[--x:50%] [--y:50%]",
        "bg-black/[0.96]", // Slightly transparent background
        className
      )}
    >
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 
        bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 
        animate-shimmer
        opacity-70" 
      />
      
      {/* Optimized blur effect with responsive sizes */}
      <div className="absolute inset-0 
        backdrop-blur-[1px] sm:backdrop-blur-[2px]
        [mask-image:radial-gradient(circle_400px_at_var(--x)_var(--y),transparent_0%,white_8%,transparent_65%)]
        sm:[mask-image:radial-gradient(circle_600px_at_var(--x)_var(--y),transparent_0%,white_8%,transparent_65%)]
        md:[mask-image:radial-gradient(circle_1000px_at_var(--x)_var(--y),transparent_0%,white_8%,transparent_65%)]
        opacity-90" 
      />
      
      {/* Main luminous points */}
      <div 
        ref={dotsRef}
        className="absolute inset-0 
          [background-image:radial-gradient(#F59E0B_1px,transparent_1px)] 
          [background-size:24px_24px] sm:[background-size:32px_32px]
          [mask-image:radial-gradient(circle_600px_at_var(--x)_var(--y),white_45%,transparent_75%)]
          md:[mask-image:radial-gradient(circle_800px_at_var(--x)_var(--y),white_45%,transparent_75%)]
          opacity-60
          will-change-transform
          after:absolute after:inset-0 
          after:backdrop-blur-[0.5px] sm:after:backdrop-blur-[1px]
          after:[mask-image:radial-gradient(circle_400px_at_var(--x)_var(--y),white_10%,transparent_85%)]
          blur-[1px] sm:blur-[1px] md:blur-[1px]" 
      />

      {/* Secondary luminous points */}
      <div 
        ref={dots2Ref}
        className="absolute inset-0 
          [background-image:radial-gradient(#F97316_1px,transparent_1px)] 
          [background-size:36px_36px] sm:[background-size:48px_48px]
          [background-position:12px_12px] sm:[background-position:16px_16px]
          [mask-image:radial-gradient(circle_600px_at_var(--x)_var(--y),white_35%,transparent_65%)]
          md:[mask-image:radial-gradient(circle_800px_at_var(--x)_var(--y),white_35%,transparent_65%)]
          opacity-40
          will-change-transform
          after:absolute after:inset-0 
          after:backdrop-blur-[1px] sm:after:backdrop-blur-[1.5px]
          after:[mask-image:radial-gradient(circle_800px_at_var(--x)_var(--y),white_10%,transparent_85%)]
          blur-[2px] sm:blur-[3px] md:blur-[4px]" 
      />

      {/* Optional: Render children on top of the background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};