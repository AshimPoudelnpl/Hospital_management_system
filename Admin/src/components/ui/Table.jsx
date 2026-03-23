import Select from "./Select";

const Table = ({ headers, data, renderRow, actionOptions, onAction, emptyMessage = "No data found" }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-4 py-4 text-center text-gray-400">{emptyMessage}</td></tr>
          ) : data.map((item, i) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
              {renderRow(item)}
              {actionOptions && (
                <td className="px-4 py-3 text-sm">
                  <Select options={actionOptions} placeholder="Action" onChange={(e) => onAction(e, item)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
