import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { TableCustomProps } from "../../constant/common";
import { useState } from "react";

export default function TableCustom<T extends object>({
  columns,
  rows,
  onSort,
}: TableCustomProps<T>) {
  const [rotatedCols, setRotatedCols] = useState<Record<string, boolean>>({});

  const handleRotate = (id: string) => {
    setRotatedCols((prev) => {
      const currentDirection = prev[id] ? "asc" : "desc";
      const newDirection = currentDirection === "asc" ? "desc" : "asc";

      // Gọi callback
      onSort?.(id, newDirection); // nếu có truyền callback thì gọi

      return {
        ...prev,
        [id]: !prev[id], // Toggle rotate
      };
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: 350,
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="flex flex-row"
                >
                  <div className="flex flex-row items-center gap-1">
                    {column.label}
                    <span
                      onClick={() => handleRotate(String(column.id))}
                      className={`text-[var(--text-color-light)] text-[12px] cursor-pointer inline-block transition-transform duration-300 ${
                        rotatedCols[String(column.id)]
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    >
                      {column.icon}
                    </span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                hover
                tabIndex={-1}
                key={rowIndex}
                className="even:bg-gray-50 hover:bg-[var(--hover-color)] transition-colors duration-200"
              >
                {columns.map((column, colIndex) => {
                  const isLastColumn = colIndex === columns.length - 1;
                  const value = row[column.id as keyof T];
                  return (
                    <TableCell
                      key={String(column.id)}
                      align={column.align}
                      className={`py-3 px-4 text-sm text-[var(--text-color)] ${
                        isLastColumn ? "pr-8" : ""
                      }`}
                    >
                      {column.format ? column.format(value) : String(value)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
