"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/productKey";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { TProduct } from "@/types";
import {
  ArrowRight,
  Calendar,
  Info,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NoOrderFound from "./NoOrdersFound";

type TOrderItem = {
  _id: string;
  product: TProduct;
  quantity: number;
};

export default function OrderConfirmation({ orderId }: { orderId: string }) {
  // redux api
  const { data: order, isLoading: isOrderLoading } =
    useGetSingleOrderQuery(orderId);

  if (isOrderLoading) {
    return <MyLoader />;
  }

  const subtotal = order?.data?.orderItems?.reduce(
    (acc: number, item: TOrderItem) => {
      return acc + item.product.price * item.quantity;
    },
    0
  );

  const shipping = order?.data?.insideDhaka
    ? insideDhakaShippingCost
    : outsideDhakaShippingCost;

  const total = subtotal + shipping;

  console.log("order data", order);
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-primary/10">
        <div className="w-full max-w-4xl mx-auto py-4 mt-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-1 lg:space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Cart</span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-primary"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Checkout</span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-primary"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-primary">
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!orderId || !order || order?.data?.length === 0 ? (
        <NoOrderFound />
      ) : (
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-24">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-semibold">{order.data.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold">
                        {order.data.createdAt.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold ">{order.data.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold">
                        {order.data.paymentMethod || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="md:flex justify-between gap-3 space-y-4 ">
                    <div className="w-full md:w-1/2 flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-semibold">{order.data.fullName}</p>
                        <p className="text-gray-600">
                          {order.data.fullAddress}
                        </p>
                        <p className="text-gray-600">{order.data.country}</p>
                        <p className="text-gray-600">{order.data.phoneNo}</p>
                      </div>
                    </div>
                    {order.data?.orderNotes && (
                      <div className="w-full md:w-1/2 flex items-start gap-3">
                        <Info className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Additional Notes:</p>
                          <p className="text-gray-600">
                            {order.data.orderNotes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Estimated Delivery
                      </p>
                      <p className="text-sm text-blue-700">2-3 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.data.orderItems?.map(
                      (item: TOrderItem, index: number) => (
                        <div key={item._id}>
                          <div className="flex gap-4">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name.slice(0, 5)}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">
                                {item.product.name}
                              </h3>

                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-600">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-semibold">
                                  ৳{" "}
                                  {(item.product.price * item.quantity).toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          {index < order.data.orderItems.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>৳ {shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>৳ {total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                {/* <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button> */}
                <Button className="w-full" asChild>
                  <Link href="/">
                    Continue Shopping
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Support */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact our customer support team for any questions about
                      your order.
                    </p>
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
