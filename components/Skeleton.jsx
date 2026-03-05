// Reusable skeleton building blocks

export function SkeletonBox({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-white/5 rounded-2xl ${className}`}
    />
  );
}

// Card skeleton for experience / education cards
export function SkeletonCard() {
  return (
    <div className="p-6 glass-morphism rounded-2xl border border-white/5 space-y-4">
      <SkeletonBox className="h-4 w-1/3" />
      <SkeletonBox className="h-3 w-2/3" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-5/6" />
      <div className="flex gap-2 pt-2">
        <SkeletonBox className="h-5 w-16 rounded-full" />
        <SkeletonBox className="h-5 w-16 rounded-full" />
        <SkeletonBox className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

// Skill icon skeleton
export function SkeletonSkill() {
  return (
    <div className="flex flex-col items-center gap-2 animate-pulse">
      <SkeletonBox className="w-14 h-14 rounded-2xl" />
      <SkeletonBox className="h-2 w-12 rounded-full" />
    </div>
  );
}

// Project card skeleton
export function SkeletonProjectCard() {
  return (
    <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/5 animate-pulse">
      <SkeletonBox className="h-60 w-full rounded-none" />
      <div className="p-8 space-y-4">
        <SkeletonBox className="h-5 w-2/3" />
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <SkeletonBox className="h-5 w-14 rounded-lg" />
          <SkeletonBox className="h-5 w-14 rounded-lg" />
          <SkeletonBox className="h-5 w-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// About / profile skeleton
export function SkeletonAbout() {
  return (
    <div className="space-y-6 animate-pulse">
      <SkeletonBox className="h-32 w-32 rounded-full mx-auto" />
      <SkeletonBox className="h-4 w-40 mx-auto" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-3/4" />
      <div className="grid grid-cols-2 gap-4 pt-4">
        <SkeletonBox className="h-10 rounded-xl" />
        <SkeletonBox className="h-10 rounded-xl" />
        <SkeletonBox className="h-10 rounded-xl" />
        <SkeletonBox className="h-10 rounded-xl" />
      </div>
    </div>
  );
}
