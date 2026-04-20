import Select from "./Select";

const Table = ({
  headers = [],
  rows = [],
  onAction = null,
  actionOptions = [],
  emptyMessage = "No data found",
  renderCell = null,
}) => {
  const resolveCellContent = (cell, cellIndex, row) => {
    if (!renderCell) {
      return cell.content;
    }

    const renderedCell = renderCell(cell, cellIndex, row);
    return renderedCell ?? cell.content;
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {rows.length === 0 ? (
        <div className="px-4 py-8 text-center text-gray-400">{emptyMessage}</div>
      ) : (
        <>
          <div className="space-y-3 p-4 sm:hidden">
            {rows.map((row, rowIndex) => (
              <article
                key={row.id || rowIndex}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm"
              >
                <div className="space-y-3">
                  {row.cells.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="border-b border-slate-200/80 pb-3 last:border-b-0 last:pb-0"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {headers[cellIndex] || `Field ${cellIndex + 1}`}
                      </p>
                      <div className="mt-1 break-words text-sm text-slate-700">
                        {resolveCellContent(cell, cellIndex, row)}
                      </div>
                    </div>
                  ))}

                  {actionOptions.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Action
                      </p>
                      <Select
                        options={actionOptions}
                        placeholder="Action"
                        onChange={(e) => onAction && onAction(e, row)}
                        className="mt-2 w-full"
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[720px] border-collapse">
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
                {rows.map((row, i) => (
                  <tr key={row.id || i} className="border-b hover:bg-gray-50">
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-3 text-sm ${cell.className || "text-slate-600"}`}
                      >
                        {resolveCellContent(cell, cellIndex, row)}
                      </td>
                    ))}
                    {actionOptions.length > 0 && (
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <Select
                          options={actionOptions}
                          placeholder="Action"
                          onChange={(e) => onAction && onAction(e, row)}
                          className="min-w-[120px]"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
