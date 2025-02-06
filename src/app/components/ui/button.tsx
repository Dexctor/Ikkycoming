interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-[#00FFA3] to-[#DC1FFF]
      text-white 
      shadow-lg shadow-[#00FFA3]/25 
      hover:shadow-[#00FFA3]/50 
      hover:scale-[1.02] 
      active:scale-[0.98] 
      relative overflow-hidden 
      after:absolute after:inset-0 
      after:z-10 
      after:bg-gradient-to-r 
      after:from-white/0 after:via-white/25 after:to-white/0
      after:translate-x-[-200%] 
      hover:after:translate-x-[200%] 
      after:transition-transform 
      after:duration-1000
      border border-[#00FFA3]/30
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:scale-100
    `,
    secondary: `
      glass 
      glass-hover 
      text-foreground 
      hover:scale-[1.02] 
      active:scale-[0.98]
      border border-indigo-400/20
      bg-gradient-to-r from-indigo-500/10 to-purple-500/10
    `,
    ghost: "hover:bg-white/5 text-foreground hover:scale-[1.02] active:scale-[0.98]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      {...props}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
} 