import Container from "@/components/shared/Ui/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Phone, Shield, ShoppingBag } from "lucide-react";

const Feature = () => {
  return (
    <Container className="py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Easy Shopping</h3>
            <p className="text-sm text-gray-600">
              Browse thousands of products with easy filtering and search
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Quick and reliable delivery to your doorstep
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">
              Get help whenever you need it from our support team
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Safe and encrypted transactions with multiple payment options
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Feature;
