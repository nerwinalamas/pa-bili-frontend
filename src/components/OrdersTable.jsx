import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";

import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import {
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Eye,
    Truck,
    Pencil,
} from "lucide-react";
import { format } from "date-fns";

const OrdersTable = ({ orders, onViewOrderDetails, onUpdateOrder }) => {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () => [
            columnHelper.accessor("_id", {
                header: "Order ID",
                cell: (info) => (
                    <div className="uppercase">
                        ORD-2024-{info.getValue().slice(-4)}
                    </div>
                ),
            }),
            columnHelper.accessor("createdAt", {
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 hover:bg-transparent"
                    >
                        Order Date
                        {column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                ),
                cell: (info) => format(info.getValue(), "MMMM dd, yyyy"),
            }),
            columnHelper.accessor("totalPrice", {
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="p-0 hover:bg-transparent"
                    >
                        Total Price
                        {column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                ),
                cell: (info) => `$${info.getValue().toFixed(2)}`,
            }),
            columnHelper.accessor("orderStatus", {
                header: "Status",
                cell: (info) => {
                    const status = info.getValue();
                    const statusColorMap = {
                        Pending: "text-yellow-600",
                        Processing: "text-blue-600",
                        Shipped: "text-green-600",
                        Delivered: "text-emerald-700",
                        Cancelled: "text-red-600",
                    };
                    return (
                        <span
                            className={`font-medium ${
                                statusColorMap[status] || "text-gray-600"
                            }`}
                        >
                            {status}
                        </span>
                    );
                },
            }),
            columnHelper.accessor("isPaid", {
                header: "Payment",
                cell: (info) => (
                    <span
                        className={`font-medium ${
                            info.getValue() ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {info.getValue() ? "Paid" : "Unpaid"}
                    </span>
                ),
            }),
            columnHelper.display({
                id: "actions",
                header: () => <div className="text-center">Actions</div>,
                cell: ({ row }) => (
                    <div className="flex justify-center items-center space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onViewOrderDetails(row.original._id)}
                            title="view"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateOrder(row.original._id)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        {row.original.orderStatus !== "Delivered" && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                title="track"
                            >
                                <Truck className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ),
            }),
        ],
        [onViewOrderDetails, columnHelper, onUpdateOrder]
    );

    const table = useReactTable({
        data: orders,
        columns,
        state: {
            sorting,
            globalFilter,
            pagination,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // Custom pagination renderer (same as ProductsTable)
    const renderPagination = () => {
        const pageCount = table.getPageCount();
        const currentPage = table.getState().pagination.pageIndex + 1;

        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxPagesToShow / 2)
        );
        let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(i - 1)}
                    className="mx-1"
                >
                    {i}
                </Button>
            );
        }

        return (
            <div className="flex items-center justify-center space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev
                </Button>

                {startPage > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(0)}
                        >
                            1
                        </Button>
                        {startPage > 2 && <span>...</span>}
                    </>
                )}

                {pageNumbers}

                {endPage < pageCount && (
                    <>
                        {endPage < pageCount - 1 && <span>...</span>}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(pageCount - 1)}
                        >
                            {pageCount}
                        </Button>
                    </>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">Order Management</h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage your orders
                    </p>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex-1 md:w-[300px]">
                        <Input
                            placeholder="Search orders..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {renderPagination()}
        </div>
    );
};

OrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
    onViewOrderDetails: PropTypes.func.isRequired,
    onUpdateOrder: PropTypes.func.isRequired,
};

export default OrdersTable;
