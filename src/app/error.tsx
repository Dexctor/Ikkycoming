'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-white mb-4">Une erreur est survenue</h2>
        <button
          onClick={reset}
          className="text-green-400 hover:text-green-300"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
} 