import OrderDetails from "../components/order-details";
import OrderProducts from "../components/order-products";
import { useUser } from "../hooks/useUser";
import AdminRootLayout from "../components/admin-layout";
import { useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { Toaster } from "../components/ui/toaster";
const emptyOrder: OrderI = {
  OrderId: 0,
  OrderFName: "",
  OrderLName: "",
  OrderAmount: 0,
  OrderPhone: "",
  OrderWilaya: "",
  OrderCommune: "",
  OrderShippingMode: "",
  OrderDate: "",
  OrderStatus: "",
  createdAt: "",
  updatedAt: "",
  OrderDetails: [],
};

export default function OrderInfoPage() {
  const { token } = useUser();
  const id = parseInt(useParams<{ id: string }>().id as string);
  const { order, loading, error } = useOrder(id, token as string);

  return (
    <AdminRootLayout>
      <div className="flex h-screen w-full flex-col bg-muted/40 ">
        <main className="grid flex-1 items-start gap-4 p-0 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 item-center h-full pt-5">
            {!loading && (
              <>
                <OrderDetails Order={error ? emptyOrder : (order as OrderI)} />
                <OrderProducts
                  OrderDetails={
                    error
                      ? (emptyOrder.OrderDetails as OrderDetailI[])
                      : (order.OrderDetails as OrderDetailI[])
                  }
                />
              </>
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </AdminRootLayout>
  );
}
