import Select from "./Select";

const Table = ({ 
  headers = [], 
  rows = [], 
  onAction = null, 
  actionOptions = [],
  emptyMessage = "No data found",
  renderCell = null 
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead className="bg-slate-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-slate-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-4 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row.id || i} className="border-b hover:bg-gray-50">
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-3 md:px-4 py-3 text-xs md:text-sm ${cell.className || "text-slate-600"}`}
                    >
                      {renderCell && renderCell(cell, cellIndex, row)
                        ? renderCell(cell, cellIndex, row)
                        : cell.content}
                    </td>
                  ))}
                  {actionOptions.length > 0 && (
                    <td className="px-3 md:px-4 py-3 text-xs md:text-sm">
                      <Select
                        options={actionOptions}
                        placeholder="Action"
                        onChange={(e) => onAction && onAction(e, row)}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
