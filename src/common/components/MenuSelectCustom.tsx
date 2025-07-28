import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { MenuSelectCustomProps } from "../../constant/common";

export function MenuSelectCustom({
  handleChange,
  value,
  itemList,
  sx,
}: MenuSelectCustomProps) {
  return (
    <div className="relative">
      <Select
        value={value || "-1"}
        onChange={handleChange}
        sx={{
          ...sx,
          width: "150px",
          height: "38px",
          fontSize: "14px",
          color: "var(--text-color)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main-color)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main-color)",
          },
        }}
      >
        <MenuItem value={"-1"}>All categoris</MenuItem>
        {itemList.map((item) => (
          <MenuItem value={item.id}>{item.name}</MenuItem>
        ))}
      </Select>
    </div>
  );
}
