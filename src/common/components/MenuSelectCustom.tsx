import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DEFAULT_MENU_SELECT_VALUE, type MenuSelectCustomProps } from "../../constant/common";


/**
 * A custom select component with a menu that contains a list of items.
 * This component is used for selecting a menu item.
 * @param {MenuSelectCustomProps} props - The properties of the component.
 * @returns {JSX.Element} The JSX element of the component.
 */
export function MenuSelectCustom({
  handleChange,
  value,
  itemList,
  sx,
  defaultValue,
}: MenuSelectCustomProps) {
  return (
    <div className="relative">
      <Select
        value={value || DEFAULT_MENU_SELECT_VALUE}
        onChange={handleChange}
        sx={{
          ...sx,
          width: "fit-content",
          maxWidth: "200px",
          height: "32px",
          fontSize: "14px",
          color: "var(--text-color)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main-color)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main-color)",
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, 
              overflowY: "auto",
            },
          },
        }}
      >
        {defaultValue && <MenuItem value={DEFAULT_MENU_SELECT_VALUE}>{defaultValue}</MenuItem>}
        {itemList.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
