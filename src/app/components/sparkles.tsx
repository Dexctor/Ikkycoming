"use client";
import React from "react";

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  id: string;
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity: number;
  className: string;
  particleColor: string;
}) => {
  return (
    <div className={className}>
      {/* Implémentation simplifiée des particules */}
      <div className="absolute inset-0 bg-repeat bg-[url('/sparkle.png')] opacity-50" />
    </div>
  );
}; 