import type { HeaderProps } from "../../constant/common";

/**
 * LayoutWithHeader component
 *
 * This component renders a layout with a fixed header at the top.
 * The header displays a title and optional additional content.
 * Below the header, children components are rendered.
 *
 * @param {HeaderProps} props - The properties for the layout with header component.
 * @param {string} props.headerText - The text to be displayed as the header title.
 * @param {ReactNode} [props.headerContent] - Optional additional content to be displayed in the header.
 * @param {ReactNode} [props.children] - The content to be displayed below the header.
 * @returns {JSX.Element} The JSX element of the layout with header component.
 */
export function LayoutWithHeader({
  headerText,
  headerContent,
  children,
}: HeaderProps) {
  return (
    <div className="w-full flex flex-col pb-[20px]">
      {/* Header section */}
      <div className="flex flex-row items-center justify-between h-[90px] px-[25px] bg-[var(--light-color)] 
      shadow-sm fixed top-0 w-[83.5%] z-50">
        <p className="text-[25px] font-bold -ml-2 leading-[20px] text-[var(--text-color)]">
          {headerText}
        </p>
        {headerContent}
      </div>
      
      {/* Content section */}
      <div className="mt-[90px] mb-[30px]">
        {children}
      </div>
    </div>
  );
}
