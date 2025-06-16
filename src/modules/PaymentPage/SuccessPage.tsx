import Link from "next/link";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card/Card";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { Button } from "../../components/ui/Button/Button";
import { PaymentData } from "../../types/payment";

interface ISuccessProps {
  paymentData?: PaymentData;
}
export default function SuccessPage({ paymentData }: ISuccessProps) {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-3">
      {paymentData && (
        <Card className="w-full max-w-md  shadow-xl border border-black/10 rounded-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your booking has been confirmed and payment has been processed
              successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address with
                all the details of your booking.
              </p>
            </div>
            <div className="text-sm space-y-2">
              {/* <p>
              Booking Reference:{" "}
              <span className="font-medium">
                #{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </span>
            </p> */}
              <p>If you have any questions, please contact our support team.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {user ? (
              <Button
                asChild
                variant="outline"
                className="w-full shadow-md border border-black/20 hover:bg-primary-gold hover:text-white">
                <Link href="/my-bookings">View Booking Details</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="w-full shadow-md border border-black/20 hover:bg-primary-gold hover:text-white">
                <Link href="/login">Login to View Booking Details</Link>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              className="w-full shadow-md bg-black text-gray-200">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
