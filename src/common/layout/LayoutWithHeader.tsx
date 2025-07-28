import type { HeaderProps } from "../../constant/common";

export function LayoutWithHeader({
  headerText,
  headerContent,
  children,
}: HeaderProps) {
  return (
    <div className="w-full flex flex-col pb-[20px]">
      <div className="flex flex-row items-center justify-between h-[90px] px-[25px] bg-[var(--light-color)] 
      shadow-sm fixed top-0 w-[83.5%] z-50">
        <p className="text-[25px] font-bold -ml-2 leading-[20px] text-[var(--text-color)]">
          {headerText}
        </p>
        {headerContent}
      </div>
      <div className="mt-[90px] mb-[30px]">
        {children}
      </div>
    </div>
  );
}
