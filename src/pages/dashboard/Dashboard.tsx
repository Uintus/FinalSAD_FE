import Button from "@mui/material/Button";
import { LayoutWithHeader } from "../../common/layout/LayoutWithHeader";
import { CardCustom } from "../../common/components/CardCustom";
import { TbDownload } from "react-icons/tb";
import { MenuSelectCustom } from "../../common/components/MenuSelectCustom";
import {
  DATA_STATUS_CHANGE,
  DATA_DATE_CHANGE,
  FILTER_OPTIONS,
  DATA_TYPE,
} from "../../constant/dashboard";
import type { SelectChangeEvent } from "@mui/material/Select";
import { TbArrowDown } from "react-icons/tb";
import { TbArrowUp } from "react-icons/tb";
import { FiArrowDown } from "react-icons/fi";
import LineChartCustom from "../../common/components/LineChartCustom";
import PieChartCustom from "../../common/components/PieChartCustom";
import BarChartCustom from "../../common/components/BarChartCustom";
import TableCustom from "../../common/components/TableCustom";
import type { Column, ProductRow } from "../../constant/common";
import { useState, type JSX } from "react";
import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const DataNumberAnalysis = [
    {
      name: "Units Sold",
      data: 34456,
      changeNumber: 14,
      statusChange: "1",
      dateChange: "01",
      type: "money",
    },
    {
      name: "Total Orders",
      data: 3456,
      changeNumber: 17,
      statusChange: "-1",
      dateChange: "01",
      type: "money",
    },
    {
      name: "Total Revenue",
      data: 1456,
      changeNumber: 14,
      statusChange: "1",
      dateChange: "01",
      type: "money",
    },
    {
      name: "Order Fulfillment Rate",
      data: 80,
      changeNumber: 14,
      statusChange: "-1",
      dateChange: "01",
      type: "rate",
    },
  ];

  const dataLineChart = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  const dataPieChart = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const dataBarChart = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 2390,
    },
    {
      name: "Page G",
      uv: 3490,
    },
  ];

  const columns: Column<ProductRow>[] = [
    {
      id: "name",
      label: "Production name",
      minWidth: 160,
      icon: <FiArrowDown />,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      align: "right",
      icon: <FiArrowDown />,
    },
    { id: "category", label: "Category", minWidth: 120 },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 100,
      align: "right",
      icon: <FiArrowDown />,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
      align: "right",
      format: (value: string | number) =>
        typeof value === "number"
          ? value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : value,
    },
  ];

  const rows: ProductRow[] = [
    {
      name: "T-shirt",
      price: 20,
      category: "Clothing",
      quantity: 5,
      amount: 100,
    },
    {
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      quantity: 2,
      amount: 2400,
    },
    {
      name: "Coffee Mug",
      price: 8,
      category: "Kitchen",
      quantity: 10,
      amount: 80,
    },
    {
      name: "Backpack",
      price: 50,
      category: "Accessories",
      quantity: 3,
      amount: 150,
    },
    {
      name: "Sneakers",
      price: 90,
      category: "Footwear",
      quantity: 4,
      amount: 360,
    },
    {
      name: "Sneakers1",
      price: 90,
      category: "Footwear",
      quantity: 4,
      amount: 360,
    },
    {
      name: "Sneakers2",
      price: 90,
      category: "Footwear",
      quantity: 4,
      amount: 360,
    },
    {
      name: "Sneakers3",
      price: 90,
      category: "Footwear",
      quantity: 4,
      amount: 360,
    },
    {
      name: "Sneakers4",
      price: 90,
      category: "Footwear",
      quantity: 4,
      amount: 360,
    },
    {
      name: "Sneakers5",
      price: 90,
      category: "Footwear",
      quantity: 4,
      amount: 360,
    },
  ];

  const categories = [
    { id: "1", name: "Clothing" },
    { id: "2", name: "Electronics" },
    { id: "3", name: "Kitchen" },
    { id: "4", name: "Accessories" },
    { id: "5", name: "Footwear" },
  ];

  const [selectedRangeDate, setSelectedRangeDate] = useState<string>(
    FILTER_OPTIONS[0].id
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // _____________________________________________FUNCTIONS____________________________________________________

  /**
   * A function that handles the change event of the select element in the menu.
   * It updates the selectedValue state with the selected value from the select element.
   * @param {React.ChangeEvent<{value: unknown}>} event - The change event of the select element.
   */
  function handleChangeSelectRangeDate(event: SelectChangeEvent<string>): void {
    setSelectedRangeDate(event.target.value as string);
  }

  /**
   * A function that handles the change event of the select element for categories.
   * It updates the selectedCategory state with the selected value from the select element.
   * @param {React.ChangeEvent<{value: unknown}>} event - The change event of the select element.
   */
  function handleChangeSelectCategory(event: SelectChangeEvent<string>): void {
    setSelectedCategory(event.target.value as string);
  }

  /**
   * A function that handles the sorting of the table data.
   * It takes two parameters: column and direction.
   * The column parameter is the id of the column to sort.
   * The direction parameter is the direction of the sort, either "asc" or "desc".
   * The function logs the column and direction to the console for debugging purposes.
   * @param {string} column - The id of the column to sort.
   * @param {"asc" | "desc"} direction - The direction of the sort.
   */

  function handleSort(column: string, direction: "asc" | "desc"): void {
    console.log(`${column}-${direction}`);
  }

  /**
   * A function that returns JSX elements for the header content of the Dashboard page.
   * The content includes two buttons: one for exporting the data and one for selecting a menu.
   * @returns {JSX.Element} The JSX element for the header content.
   */
  function headerContent(): JSX.Element {
    return (
      <div className="flex flex-row gap-2 items-center">
        {/* Button for exporting data */}
        <Button
          variant="contained"
          startIcon={<TbDownload />}
          sx={{
            backgroundColor: "var(--main-color)",
            color: "var(--light-color)",
            height: "35px",
            textTransform: "none",
          }}
        >
          Export
        </Button>

        {/* Menu select for filtering */}
        <MenuSelectCustom
          itemList={FILTER_OPTIONS}
          handleChange={handleChangeSelectRangeDate}
          value={selectedRangeDate}
        />
      </div>
    );
  }

  return (
    <LayoutWithHeader headerText="Dashboard" headerContent={headerContent()}>
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {DataNumberAnalysis && DataNumberAnalysis.length > 0
            ? DataNumberAnalysis.map((item, index) => (
                <CardCustom key={index}>
                  <div className="w-full h-full flex flex-col justify-evenly gap-2">
                    <p className="text-[var(--text-color-light)] font-[500]">
                      {item.name}
                    </p>
                    <p className="text-[25px] font-bold">
                      {item.type === DATA_TYPE.MONEY
                        ? `$${item.data}`
                        : item.data + "%"}
                    </p>
                    <div className="flex flex-row gap-3 mt-1">
                      <div
                        className={`px-[4px] rounded flex justify-center items-center gap-1 ${
                          item.statusChange === DATA_STATUS_CHANGE.INCREASE
                            ? "bg-[var(--light-blue-color)]"
                            : "bg-[var(--light-red-color)]"
                        }`}
                      >
                        {item.statusChange === DATA_STATUS_CHANGE.INCREASE ? (
                          <TbArrowUp className="text-[var(--success-color)] text-[15px] font-[500]" />
                        ) : (
                          <TbArrowDown className="text-[var(--error-color)] text-[15px] font-[500]" />
                        )}

                        <p
                          className={`${
                            item.statusChange === DATA_STATUS_CHANGE.INCREASE
                              ? "text-[var(--success-color)]"
                              : "text-[var(--error-color)]"
                          } text-[14px] font-[500]`}
                        >
                          {item.changeNumber}%
                        </p>
                      </div>
                      <p>
                        {item.dateChange === DATA_DATE_CHANGE.MONTH
                          ? "in the last month"
                          : "in the last week"}
                      </p>
                    </div>
                  </div>
                </CardCustom>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <CardCustom key={index}>
                  <div className="w-full h-full flex flex-col gap-2 p-2">
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="50%" height={30} />
                    <div className="flex flex-row gap-3 mt-1">
                      <Skeleton variant="rectangular" width={60} height={25} />
                      <Skeleton variant="text" width={80} height={25} />
                    </div>
                  </div>
                </CardCustom>
              ))}
        </div>

        {/* Row 1: Line chart + Pie chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 min-h-[350px]">
          <CardCustom className="flex items-center justify-center p-4">
            {dataLineChart.length === 0 ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <LineChartCustom data={dataLineChart} />
            )}
          </CardCustom>

          <CardCustom className="flex items-center justify-center p-4">
            {dataPieChart.length === 0 ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <PieChartCustom data={dataPieChart} />
            )}
          </CardCustom>
        </div>

        {/* Row 2: Table + Bar chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 min-h-[400px]">
          <CardCustom className="p-4">
            <div className="flex flex-col h-full">
              {columns.length === 0 ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[20px] font-bold">
                      Top 20 Selling Products
                    </p>
                    <MenuSelectCustom
                      label="Category"
                      itemList={categories}
                      handleChange={handleChangeSelectCategory}
                      value={selectedCategory}
                    />
                  </div>
                  <TableCustom
                    columns={columns}
                    rows={rows}
                    onSort={handleSort}
                  />
                </>
              )}
            </div>
          </CardCustom>

          <CardCustom className="flex items-center justify-center p-4">
            {dataBarChart.length === 0 ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <BarChartCustom data={dataBarChart} />
            )}
          </CardCustom>
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Dashboard;
