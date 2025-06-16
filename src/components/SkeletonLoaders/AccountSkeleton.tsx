import { Card, CardContent, CardHeader } from "../ui/Card/Card";
import { Skeleton } from "../ui/skeleton/skeleton";

export function AccountSkeleton() {
  return (
    <div className="container mx-auto pt-32 pb-10 px-4">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#AA987A] to-[#D4B779] rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-grow">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Profile Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-amber-200 shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="border-amber-200 shadow-md">
                <CardHeader>
                  <Skeleton className="h-6 w-36 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(2)].map((_, j) => (
                    <Skeleton key={j} className="h-10 w-full" />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bookings Tab Content */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4 border-amber-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-56" />
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Favorites Tab Content */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4 border-amber-200">
              <div className="flex justify-between items-center">
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Properties Tab Content */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="p-4 border-amber-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-56" />
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
