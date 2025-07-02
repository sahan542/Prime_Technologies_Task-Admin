"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import MTRating from "@/components/shared/Forms/MTRating";
import MTTextArea from "@/components/shared/Forms/MTTextArea";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  useAddReviewMutation,
  useGetReviewsByProductQuery,
} from "@/redux/api/productReviewApi";
import { TProductReview } from "@/types";
import { Star } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import ReviewSummarySkeleton from "./ReviewSummarySkeleton";

const reviewSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Enter a valid email address"),
  rating: z
    .number({ required_error: "Rating is required" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  review: z.string().min(1, "Review content is required"),
});

const reviewDefaultValues = {
  username: "",
  email: "",
  rating: 0,
  review: "",
};

export default function ProductReviews({ productId }: { productId: string }) {
  const query = { isVerified: true };

  // redux api
  const { data: reviewsData, isLoading: isReviewsLoading } =
    useGetReviewsByProductQuery({
      productId,
      query,
    });
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();

  const reviews: TProductReview[] = reviewsData?.data?.data || [];

  // Calculate review statistics
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
      100,
  }));

  const handleSubmitReview = async (values: FieldValues) => {
    const newReview = { ...values, product: productId };

    const payload = {
      productId,
      reviewData: newReview,
    };

    // Handle form submission logic here
    try {
      const res = await addReview(payload).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        {reviews.length === 0 ? (
          <div className="w-full h-auto flex justify-center items-center mb-6 mt-20">
            <h2 className="text-xl font-medium">No Review Provided Yet!</h2>
          </div>
        ) : (
          <div>
            {/* Reviews Overview */}
            <div>
              {isReviewsLoading ? (
                <ReviewSummarySkeleton />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Customer Reviews</span>
                      <Badge variant="outline">{reviews.length} reviews</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Average Rating */}
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-6 h-6 ${
                                star <= Math.round(averageRating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">
                          Based on {reviews.length} reviews
                        </p>
                      </div>

                      {/* Rating Distribution */}
                      <div className="space-y-[6px]">
                        {ratingDistribution.map(
                          ({ rating, count, percentage }) => (
                            <div
                              key={rating}
                              className="flex items-center space-x-3"
                            >
                              <span className="text-sm font-medium w-8">
                                {rating}★
                              </span>
                              <Progress value={percentage} className="flex-1" />
                              <span className="text-sm text-gray-600 w-8">
                                {count}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">All Reviews</h3>
              {isReviewsLoading ? (
                <div>
                  {[...Array(4)].map((_, index) => (
                    <ReviewCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        {/* Write a Review Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <MTForm
              onSubmit={handleSubmitReview}
              schema={reviewSchema}
              defaultValues={reviewDefaultValues}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1">
                    <label htmlFor="username" className="text-sm font-medium">
                      Name <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput
                      name="username"
                      type="text"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput
                      name="email"
                      type="email"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Rating <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTRating name="rating" />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your review{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTTextArea
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      name="review"
                      rows={10}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>

                <div className="mt-2 w-full flex justify-end">
                  <Button className="h-11 cursor-pointer w-full" type="submit">
                    {isAddReviewLoading ? (
                      <span className="flex gap-2">
                        <LoaderSpinner /> <span>Submitting...</span>
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            </MTForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
