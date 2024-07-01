import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function OrderProducts({
  OrderDetails,
}: {
  OrderDetails: OrderDetailI[];
}) {
  return (
    <Card className="min-h-auto">
      <CardHeader>
        <CardTitle>Order Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OrderDetails.map((orderDetail) => (
              <TableRow key={orderDetail.DetailId}>
                <TableCell className="font-medium">
                  {orderDetail.DetailProductName}
                </TableCell>
                <TableCell>${orderDetail.DetailProductPrice}</TableCell>
                <TableCell>{orderDetail.DetailQuantity}</TableCell>
                <TableCell>{orderDetail.OrderSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
