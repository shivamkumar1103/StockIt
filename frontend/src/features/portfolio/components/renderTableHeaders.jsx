import { TableHead, TableRow } from "@/components/ui/table";

const renderTableHeaders = (activeTab) => {
  if (activeTab === "Orders") {
    return (
      <TableRow>
        <TableHead>Asset</TableHead>
        <TableHead className="text-right">Side</TableHead>
        <TableHead className="text-right hidden md:table-cell">Price</TableHead>
        <TableHead className="text-right hidden md:table-cell">
          Quantity
        </TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    );
  }
  if (activeTab === "Trades") {
    return (
      <TableRow>
        <TableHead>Asset</TableHead>
        <TableHead className="text-right">Side</TableHead>
        <TableHead className="text-right hidden md:table-cell">Price</TableHead>
        <TableHead className="text-right hidden md:table-cell">
          Quantity
        </TableHead>
        <TableHead className="text-right">Total</TableHead>
      </TableRow>
    );
  }
  return (
    <TableRow>
      <TableHead>Type</TableHead>
      <TableHead className="text-right">Kind</TableHead>
      <TableHead className="text-right hidden md:table-cell">Amount</TableHead>
      <TableHead className="text-right hidden md:table-cell">Before</TableHead>
      <TableHead className="text-right">After</TableHead>
    </TableRow>
  );
};
export default renderTableHeaders;
