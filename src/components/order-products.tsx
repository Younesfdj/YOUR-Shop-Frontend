import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function OrderProducts() {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Glimmer Lamps</TableCell>
              <TableCell>$120.00</TableCell>
              <TableCell>Stylish and energy-efficient lamps</TableCell>
              <TableCell>2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Aqua Filters</TableCell>
              <TableCell>$49.00</TableCell>
              <TableCell>High-quality water filters</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
