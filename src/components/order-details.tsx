import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import dateFormatter from "../utils/date";
export default function OrderDetails({ Order }: { Order: OrderI }) {
  const [status, setStatus] = useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="orderId">Order ID</Label>
            <Input id="orderId" value={Order.OrderId} readOnly />
          </div>
          <div>
            <Label htmlFor="orderAmount">Order Amount</Label>
            <Input
              id="orderAmount"
              value={Order.OrderAmount.toLocaleString("fr-Fr", {
                style: "currency",
                currency: "DZD",
              })}
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="orderWilaya">Wilaya</Label>
            <Input id="orderWilaya" value={Order.OrderWilaya} readOnly />
          </div>
          <div>
            <Label htmlFor="orderPhone">Phone</Label>
            <Input id="orderPhone" value={Order.OrderPhone} readOnly />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <Label htmlFor="orderCommune">Commune</Label>
            <Input id="orderCommune" value={Order.OrderCommune} readOnly />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="orderStatus">Status</Label>
            <div className="flex items-center gap-2 flex-col md:flex-row">
              <Select
                defaultValue={Order.OrderStatus}
                onValueChange={(value) => {
                  setStatus(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SHIPPING">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                Change Status
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="orderFName">First Name</Label>
            <Input id="orderFName" value={Order.OrderFName} readOnly />
          </div>
          <div>
            <Label htmlFor="orderLName">Last Name</Label>
            <Input id="orderLName" value={Order.OrderLName} readOnly />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="orderDate">Order Date</Label>
            <Input
              id="orderDate"
              value={dateFormatter(Order.OrderDate as string)}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="orderShippingMode">Shipping Mode</Label>
            <Input
              id="orderShippingMode"
              value={Order.OrderShippingMode}
              readOnly
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
