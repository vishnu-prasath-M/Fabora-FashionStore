/**
 * Skeleton Loader for Product Cards
 * Displays animated placeholder while products are loading
 */
const SkeletonProductCard = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Image Skeleton */}
            <div className="aspect-[4/5] bg-gray-200 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>

                {/* Category */}
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="flex gap-2">
                        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonProductCard;
