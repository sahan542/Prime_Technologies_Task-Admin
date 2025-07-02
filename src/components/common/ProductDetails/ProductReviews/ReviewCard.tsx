import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TProductReview } from "@/types";
import { Star, Verified } from "lucide-react";

const ReviewCard = ({ review }: { review: TProductReview }) => {
  const formatDate = (date: Date | string): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card key={review._id} className="p-0">
      <CardContent className="py-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {getInitials(review.username)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="md:flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{review.username}</h4>
                  {review.isVerified && (
                    <Badge variant="outline" className="text-xs">
                      <Verified className="w-3 h-3 mr-1" />
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {formatDate(review.createdAt)}
                </p>
              </div>

              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{review.review}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
