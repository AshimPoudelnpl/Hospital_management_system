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
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-700"
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
                    className={`px-4 py-3 text-sm ${cell.className || "text-slate-600"}`}
                  >
                    {renderCell && renderCell(cell, cellIndex, row)
                      ? renderCell(cell, cellIndex, row)
                      : cell.content}
                  </td>
                ))}
                {actionOptions.length > 0 && (
                  <td className="px-4 py-3 text-sm">
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
  );
};

export default Table;
