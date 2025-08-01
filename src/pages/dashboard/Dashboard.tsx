import Button from "@mui/material/Button";
import { LayoutWithHeader } from "../../common/layout/LayoutWithHeader";
import { CardCustom } from "../../common/components/CardCustom";
import { TbDownload } from "react-icons/tb";
import { MenuSelectCustom } from "../../common/components/MenuSelectCustom";
import {
  DATA_DATE_CHANGE,
  FILTER_OPTIONS,
  DATA_TYPE,
  ORDER_STATUS_MAP,
  TOP_PRODUCTS_QUERY,
} from "../../constant/dashboard";
import type { SelectChangeEvent } from "@mui/material/Select";
import { TbArrowDown } from "react-icons/tb";
import { TbArrowUp } from "react-icons/tb";
import { FiArrowDown } from "react-icons/fi";
import LineChartCustom from "../../common/components/LineChartCustom";
import PieChartCustom from "../../common/components/PieChartCustom";
import BarChartCustom from "../../common/components/BarChartCustom";
import TableCustom from "../../common/components/TableCustom";
import {
  DEFAULT_MENU_SELECT_VALUE,
  type Column,
  type ProductRow,
} from "../../constant/common";
import { useMemo, useState, type JSX } from "react";
import { Skeleton } from "@mui/material";
import {
  useGetDashboardQuery,
  useGetTopProductsQuery,
} from "../../services/api/dashboardApi";
import { useGetCategoryQuery } from "../../services/api/categoryApi";
import { NoDataFound } from "../../common/components/NoDataFound";

const Dashboard = () => {
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
      icon: <FiArrowDown />,
    },
  ];

  // ________________________________________________HOOK_______________________________________________________
  // Set selected range date to filter
  const [selectedRangeDate, setSelectedRangeDate] = useState<string>(
    DATA_DATE_CHANGE.LAST_7_DAYS
  );

  // Set filter for top products
  const [getTopProductsQuery, setGetTopProductsQuery] = useState({
    range: TOP_PRODUCTS_QUERY.RANGE,
    sort: TOP_PRODUCTS_QUERY.SORT,
    category_id: TOP_PRODUCTS_QUERY.CATEGORY_ID,
  });

  // ________________________________________________API_______________________________________________________
  // Call API get dashboard data
  const { data: { data: dashboardData } = {}, isLoading: isLoadingDashboard } =
    useGetDashboardQuery(
      { range: selectedRangeDate },
      { pollingInterval: 120000 }
    );

  // Call API get top products
  const {
    data: { data: topProductsData } = {},
    isLoading: isLoadingTopProducts,
  } = useGetTopProductsQuery(getTopProductsQuery);

  // Call API get category
  const {
    data: { data: categoryData } = { data: [] },
    isLoading: isLoadingCategory,
  } = useGetCategoryQuery();

  // Format data number analysis
  const dataNumberAnalysis = useMemo(() => {
    const summary = dashboardData?.summaryTotal;
    if (!summary) return [];

    return [
      {
        name: "Total Sales",
        data: summary.totalSales,
        changeNumber: summary.comparisons.salesChange,
        type: "number",
      },
      {
        name: "Total Orders",
        data: summary.totalOrders,
        changeNumber: summary.comparisons.ordersChange,
        type: "number",
      },
      {
        name: "Total Revenue",
        data: summary.totalRevenue,
        changeNumber: summary.comparisons.revenueChange,
        type: "money",
      },
      {
        name: "Order Fulfillment Rate",
        data: summary.fulfillmentRate,
        changeNumber: summary.comparisons.fulfillmentRateChange,
        type: "rate",
      },
    ];
  }, [dashboardData]);

  // Format data pie chart
  const dataPieChart = useMemo(() => {
    return (dashboardData?.pieChartData ?? []).map((item) => ({
      name: ORDER_STATUS_MAP[item.label] ?? item.label,
      value: item.value,
    }));
  }, [dashboardData]);

  // _____________________________________________FUNCTIONS____________________________________________________

  /**
   * A function that handles the change event of the select element in the menu.
   * It updates the selectedValue state with the selected value from the select element.
   * @param {React.ChangeEvent<{value: unknown}>} event - The change event of the select element.
   */
  function handleChangeSelectRangeDate(event: SelectChangeEvent<string>): void {
    setSelectedRangeDate(event.target.value as string);
    setGetTopProductsQuery({
      ...getTopProductsQuery,
      range: event.target.value as string,
    });
  }

  /**
   * A function that handles the change event of the select element for categories.
   * It updates the selectedCategory state with the selected value from the select element.
   * @param {React.ChangeEvent<{value: unknown}>} event - The change event of the select element.
   */
  function handleChangeSelectCategory(event: SelectChangeEvent<string>): void {
    if (event.target.value === DEFAULT_MENU_SELECT_VALUE) {
      setGetTopProductsQuery({
        ...getTopProductsQuery,
        category_id: "",
      });
    } else
      setGetTopProductsQuery({
        ...getTopProductsQuery,
        category_id: event.target.value as string,
      });
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
    setGetTopProductsQuery({
      ...getTopProductsQuery,
      sort: `${column}-${direction}`,
    });
  }

  /**
   * A function that returns JSX elements for the header content of the Dashboard page.
   * The content includes two buttons: one for exporting the data and one for selecting a menu.
   * @returns {JSX.Element} The JSX element for the header content.
   */
  function headerContent(): JSX.Element {
    return (
      <div className="flex flex-row gap-2 items-center">
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
          {!isLoadingDashboard &&
          dataNumberAnalysis &&
          dataNumberAnalysis.length > 0
            ? dataNumberAnalysis.map((item, index) => (
                <CardCustom key={index}>
                  <div className="w-full h-full flex flex-col justify-evenly gap-2">
                    <p className="text-[var(--text-color-light)] font-[500]">
                      {item.name}
                    </p>
                    <p className="text-[25px] font-bold">
                      {item.type === DATA_TYPE.MONEY
                        ? `$${item.data}`
                        : item.type === DATA_TYPE.RATE
                        ? `${item.data}%`
                        : item.data}
                    </p>
                    <div className="flex flex-row gap-3 mt-1">
                      <div
                        className={`px-[4px] rounded flex justify-center items-center gap-1 ${
                          item.changeNumber >= 0
                            ? "bg-[var(--light-blue-color)]"
                            : "bg-[var(--light-red-color)]"
                        }`}
                      >
                        {item.changeNumber >= 0 ? (
                          <TbArrowUp className="text-[var(--success-color)] text-[15px] font-[500]" />
                        ) : (
                          <TbArrowDown className="text-[var(--error-color)] text-[15px] font-[500]" />
                        )}

                        <p
                          className={`${
                            item.changeNumber >= 0
                              ? "text-[var(--success-color)]"
                              : "text-[var(--error-color)]"
                          } text-[14px] font-[500]`}
                        >
                          {Math.round(item.changeNumber)}%
                        </p>
                      </div>
                      <p>
                        {selectedRangeDate === DATA_DATE_CHANGE.YEAR_TO_DATE
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
            {isLoadingDashboard ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : !dashboardData?.lineChartData?.length ? (
              <NoDataFound />
            ) : (
              <LineChartCustom
                data={dashboardData.lineChartData}
                title="Revenue"
                name_avg="Avg.Revenue"
                name_total="Revenue"
              />
            )}
          </CardCustom>

          <CardCustom className="flex items-center justify-center p-4">
            {isLoadingDashboard ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : !dashboardData?.pieChartData?.length ? (
              <NoDataFound />
            ) : (
              <PieChartCustom data={dataPieChart} title="Order Status Ratio" />
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

                    {!(
                      (
                        !isLoadingTopProducts &&
                        (!Array.isArray(topProductsData) ||
                          topProductsData.length === 0)
                      )
                    ) && (
                      <div className="flex flex-row gap-3">
                        {/* Button for exporting data */}
                        <Button
                          variant="contained"
                          startIcon={<TbDownload />}
                          sx={{
                            backgroundColor: "var(--main-color)",
                            color: "var(--light-color)",
                            height: "32px",
                            textTransform: "none",
                          }}
                        >
                          Export
                        </Button>

                        {!isLoadingCategory &&
                        Array.isArray(categoryData) &&
                        categoryData.length > 0 ? (
                          <MenuSelectCustom
                            label="Category"
                            itemList={categoryData}
                            handleChange={handleChangeSelectCategory}
                            value={getTopProductsQuery.category_id}
                            defaultValue="All Categories"
                          />
                        ) : null}
                      </div>
                    )}
                  </div>

                  {isLoadingTopProducts ? (
                    <Skeleton variant="rectangular" width="100%" height={300} />
                  ) : !topProductsData?.length ? (
                    <NoDataFound />
                  ) : (
                    <TableCustom
                      columns={columns}
                      rows={topProductsData}
                      onSort={handleSort}
                    />
                  )}
                </>
              )}
            </div>
          </CardCustom>

          <CardCustom className="flex items-center justify-center p-4">
            {isLoadingDashboard ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : !dashboardData?.barChartData?.length ? (
              <NoDataFound />
            ) : (
              <BarChartCustom
                data={dashboardData.barChartData}
                title="Revenue by Product Category"
              />
            )}
          </CardCustom>
        </div>
      </div>
    </LayoutWithHeader>
  );
};

export default Dashboard;
