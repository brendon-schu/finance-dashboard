import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";

const Table = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      String(row.name).toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const columns = useMemo(
    () => [
        { header: "Label", accessorKey: "label", },
        { header: "Bid", accessorKey: "bid", 
            cell: ({ row }) => {
                return (
                    <div className="bg-gray-600 rounded-md pl-2">
                    {row.original.bid}
                    </div>
                );
            },
        },
        { header: "Ask", accessorKey: "ask", 
            cell: ({ row }) => {
                return (
                    <div className="bg-gray-600 rounded-md pl-2">
                    {row.original.ask}
                    </div>
                );
            },
        },
        { header: "Net", accessorKey: "net", 
            cell: ({ row }) => {
                const trend = row.original.trend; // Get the "up" or "down" value
                return (
                    <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
                    {row.original.net}
                    </span>
                );
            },
        },
      { header: "% 1D", accessorKey: "oned", },
      { header: "High", accessorKey: "high", },
      { header: "Low", accessorKey: "low", },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div>
      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-500 rounded"
      />

      {/* Table */}
      <table className="w-full border border-gray-500">
        <thead className="bg-gray-900 text-white text-left border-b border-gray-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-2 cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-700 even:bg-gray-800 border-b border-gray-600">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

