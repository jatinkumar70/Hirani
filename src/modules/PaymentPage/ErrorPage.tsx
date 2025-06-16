import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card/Card";

export default function ErrorPage() {
  const [bookingUrl, setBookingUrl] = useState("/booking"); // Default URL

  useEffect(() => {
    const storedUrl = localStorage.getItem("previousBookingUrl");
    if (storedUrl) {
      setBookingUrl(storedUrl);
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border border-black/20 rounded-xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Failed</CardTitle>
          <CardDescription>
            We couldn&apos;t process your payment. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600">
              Your payment was not successful. This could be due to insufficient
              funds, an expired card, or incorrect card details.
            </p>
          </div>
          <div className="text-sm space-y-2">
            <p>
              If you continue to experience issues, please contact our support
              team or try a different payment method.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full bg-black shadow-lg">
            <Link href={bookingUrl}>Try Again</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border border-black/20 shadow-lg ">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
