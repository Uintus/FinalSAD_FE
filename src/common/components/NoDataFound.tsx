/**
 * A component that displays a message when no data is found.
 *
 * @returns A JSX element that displays the message.
 */
export function NoDataFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src="/no_data.jpg" alt="" className="w-[200px]" />
      <p className="text-center text-[var(--text-color)] font-[700] text-[20px]">No data found</p>
    </div>
  );
}
