/* eslint-disable prefer-const */
"use client";
import { cn } from "@/app/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.title}
          className="relative group block p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  height: '100%',
                  width: '100%',
                  background: 'linear-gradient(45deg, rgba(0,255,163,0.1), rgba(220,31,255,0.1))',
                  borderRadius: '1.5rem',
                  backdropFilter: 'blur(8px)',
                }}
                layoutId="hoverBackground"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.15, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <CardTitle>{item.title}</CardTitle>
            </div>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden relative",
        "bg-black/20 backdrop-blur-xl",
        "border border-white/[0.05]",
        "group-hover:border-white/[0.1]",
        "transition duration-700",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent",
        "before:pointer-events-none",
        className
      )}
    >
      <div className="relative z-10">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn(
      "text-zinc-100 font-bold tracking-wide mt-1",
      "bg-clip-text text-transparent bg-gradient-to-r",
      "from-white to-white/70",
      className
    )}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400/80 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
}; 