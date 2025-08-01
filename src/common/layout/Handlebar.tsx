import { barItemList } from "../../constant/common";
import logo from "../../assets/logo.png";
import layout from "./layout.module.css";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";

export function Handlebar() {
  return (
    <div className="flex flex-col justify-between h-screen z-50">
      <div className="flex flex-col">
        <div className="flex gap-3 items-center border-b border-[var(--light-border-color)]">
          <img src={logo} alt="" className="w-[50px] ml-2" />
          <p className="text-[19px] font-bold py-[25px] -ml-2 leading-[20px] text-[var(--main-color)]">
            ClickShop Management
          </p>
        </div>

        {barItemList.map((item) => (
          <NavLink
            key={item.label}
            to={item.url}
            className={({ isActive }) =>
              `
              flex gap-2 items-center ml-[4px] py-[15px] px-[12px] text-[16px] 
              cursor-pointer text-[var(--text-color-light)] font-[500] border-b border-[var(--light-border-color)]
              ${layout.handleBar_item} ${isActive ? layout.active : ""}
              `
            }
          >
            <i className="text-[20px]">{item.icon}</i>
            <p>{item.label}</p>
          </NavLink>
        ))}
      </div>

      <div className="p-[20px]">
        <Link to="/create-fake-order">
          <Button variant="outlined" className="">
            Create a FAKE order
          </Button>
        </Link>
      </div>
    </div>
  );
}
