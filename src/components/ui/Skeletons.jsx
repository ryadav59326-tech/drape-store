export const ProductCardSkeleton = () => (
  <div>
    <div className="skeleton aspect-[3/4] mb-3" />
    <div className="skeleton h-3 w-16 mb-2" />
    <div className="skeleton h-4 w-32 mb-2" />
    <div className="skeleton h-4 w-20" />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="skeleton aspect-[3/4]" />
      <div className="space-y-4 pt-4">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-8 w-64" />
        <div className="skeleton h-6 w-20 mt-2" />
        <div className="skeleton h-24 w-full mt-4" />
        <div className="skeleton h-12 w-full mt-6" />
      </div>
    </div>
  </div>
);
