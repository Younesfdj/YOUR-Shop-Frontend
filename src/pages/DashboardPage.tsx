import { Toaster } from "../components/ui/toaster";
import AdminRootLayout from "../components/admin-layout";
import { DataTable } from "../components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { useOrders } from "../hooks/useOrders";
import { useNavigate } from "react-router-dom";
const columns: ColumnDef<OrderI>[] = [
  {
    accessorKey: "OrderId",
    header: () => <div className="font-bold text-gray-600">Order ID</div>,
  },
  {
    accessorKey: "OrderFName",
    header: () => <div className="font-bold text-gray-600">First Name</div>,
  },
  {
    accessorKey: "OrderLName",
    header: () => <div className="font-bold text-gray-600">Last Name</div>,
  },
  {
    accessorKey: "OrderAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold text-gray-600"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = row.getValue("OrderAmount");
      return (
        <div>
          {amount.toLocaleString("fr-FR", {
            style: "currency",
            currency: "DZD",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "OrderWilaya",
    header: () => <div className="font-bold text-gray-600">Wilaya</div>,
  },
  {
    accessorKey: "OrderCommune",
    header: () => <div className="font-bold text-gray-600">Commune</div>,
  },
  {
    accessorKey: "OrderShippingMode",
    header: () => <div className="font-bold text-gray-600">Shipping Mode</div>,
  },
  {
    accessorKey: "OrderStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            return column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="font-bold text-gray-600"
        >
          Order Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("OrderStatus");
      return (
        <div
          className={`px-2 py-1 w-20 text-center text-xs font-semibold rounded-full ${
            status === "PENDING"
              ? "bg-yellow-200 text-yellow-800"
              : status === "DELIVERED"
              ? "bg-green-200 text-green-800"
              : status === "SHIPPING"
              ? "bg-blue-200 text-blue-800"
              : status === "CANCELLED"
              ? "bg-red-200 text-red-800"
              : ""
          }`}
        >
          {status}
        </div>
      );
    },
    // @ts-expect-error not used variable
    sortingFn: (a, b, columnId) => { // eslint-disable-line
      if (
        a.original.OrderStatus === "PENDING" &&
        b.original.OrderStatus !== "PENDING"
      ) {
        return 1;
      } else if (
        a.original.OrderStatus === "SHIPPING" &&
        b.original.OrderStatus !== "SHIPPING" &&
        b.original.OrderStatus !== "PENDING"
      ) {
        return 1;
      }
      return -1;
    },
  },
];

export default function DashboardPage() {
  const { orders, loading } = useOrders();
  const navigate = useNavigate();
  const rowAction = (row: any) => { // eslint-disable-line
    const OrderId = row.getValue("OrderId");
    navigate(`/admin/orders/${OrderId}`);
  };
  return (
    <div>
      <AdminRootLayout>
        <div>
          <div className="container mx-auto my-4">
            <h1 className="text-3xl font-bold">Orders</h1>
          </div>
          <div className=" w-[90%] mx-auto">
            <DataTable
              columns={columns}
              data={loading ? [] : orders}
              rowAction={rowAction}
            />
          </div>
        </div>
      </AdminRootLayout>
      <Toaster />
    </div>
  );
}
