export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
      {children}
    </div>
  );
}
