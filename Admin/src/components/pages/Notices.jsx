import { useState } from "react";
import {
  useGetNoticesQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} from "../../Redux/features/noticeSlice";
import Modal from "../shared/DetailsModal";
import Select from "../shared/Select";
import { toast } from "react-toastify";

const EMPTY = { title: "", content: "" };

const Notices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [search, setSearch] = useState("");

  const { data: notices = [], isLoading } = useGetNoticesQuery();
  const [addNotice] = useAddNoticeMutation();
  const [updateNotice] = useUpdateNoticeMutation();
  const [deleteNotice] = useDeleteNoticeMutation();

  const filtered = notices.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setIsAdding(true); setIsViewing(false);
    setFormData(EMPTY);
    setIsModalOpen(true);
  };

  const openEdit = (notice) => {
    setIsAdding(false); setIsViewing(false);
    setEditId(notice.id);
    setFormData({ title: notice.title, content: notice.content });
    setIsModalOpen(true);
  };

  const openView = (notice) => { setIsViewing(true); setViewItem(notice); setIsModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await deleteNotice(id).unwrap();
      toast.success("Notice deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAdding) { await addNotice(formData).unwrap(); toast.success("Notice added"); }
      else { await updateNotice({ id: editId, ...formData }).unwrap(); toast.success("Notice updated"); }
      setIsModalOpen(false);
    } catch { toast.error(isAdding ? "Failed to add" : "Failed to update"); }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, notice) => {
    const val = e.target.value;
    if (val === "Edit") openEdit(notice);
    else if (val === "View") openView(notice);
    else if (val === "Delete") handleDelete(notice.id);
    e.target.value = "";
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Notices</h1>
        <div className="flex gap-3">
          <input type="text" placeholder="Search notices..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-60" />
          <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add Notice</button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Title", "Content", "Created By", "Date", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" className="px-4 py-4 text-center text-gray-400">No notices found</td></tr>
            ) : filtered.map((notice, i) => (
              <tr key={notice.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{notice.title}</td>
                <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{notice.content}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{notice.created_by_name || "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{new Date(notice.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm">
                  <Select options={actionOptions} placeholder="Action" onChange={(e) => handleAction(e, notice)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewing ? "Notice Details" : isAdding ? "Add Notice" : "Edit Notice"} size="lg">
        {isViewing ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-500">Title</p>
              <p className="text-sm font-semibold text-slate-800">{viewItem?.title}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Content</p>
              <p className="text-sm text-slate-800 whitespace-pre-wrap">{viewItem?.content}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Created By</p>
              <p className="text-sm text-slate-800">{viewItem?.created_by_name || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Date</p>
              <p className="text-sm text-slate-800">{viewItem?.created_at ? new Date(viewItem.created_at).toLocaleString() : "—"}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded-lg text-sm" required />
            <textarea placeholder="Content *" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full p-2 border rounded-lg text-sm" rows={5} required />
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">{isAdding ? "Add" : "Update"}</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Notices;
