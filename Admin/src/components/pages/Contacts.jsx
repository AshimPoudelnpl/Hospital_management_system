import { useState } from "react";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../../Redux/features/contactSlice";
import Modal from "../shared/DetailsModal";
import Select from "../shared/Select";
import { toast } from "react-toastify";

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");

  const { data: contacts = [], isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await deleteContact(id).unwrap();
      toast.success("Contact deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const actionOptions = [
    { value: "View", label: "View" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAction = (e, c) => {
    const val = e.target.value;
    if (val === "View") { setViewItem(c); setIsModalOpen(true); }
    else if (val === "Delete") handleDelete(c.id);
    e.target.value = "";
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
        <input type="text" placeholder="Search by name, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-72" />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Name", "Email", "Phone", "Message", "Date", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className="px-4 py-4 text-center text-gray-400">No contacts found</td></tr>
            ) : filtered.map((c, i) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{c.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.email}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{c.phone}</td>
                <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{c.message}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">
                  <Select options={actionOptions} placeholder="Action" onChange={(e) => handleAction(e, c)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Contact Details" size="lg">
        {viewItem && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[["Name", viewItem.name], ["Email", viewItem.email], ["Phone", viewItem.phone], ["Date", new Date(viewItem.created_at).toLocaleString()]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Message</p>
              <p className="text-sm text-slate-800 whitespace-pre-wrap">{viewItem.message}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Contacts;
