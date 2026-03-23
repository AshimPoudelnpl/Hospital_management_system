import { useState } from "react";
import {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../Redux/features/servicesSlice";
import Modal from "../ui/DetailsModal";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import SearchBar from "../ui/SearchBar";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Select from "../ui/Select";
import { toast } from "react-toastify";

const EMPTY = { title: "", description: "" };

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");

  const { data: services = [], isLoading } = useGetServicesQuery();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (svc) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(svc.id);
    setFormData({ title: svc.title, description: svc.description || "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (svc) => {
    setIsViewing(true);
    setViewItem(svc);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id).unwrap();
      toast.success("Service deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    try {
      if (isAdding) {
        await addService(fd).unwrap();
        toast.success("Service added");
      } else {
        await updateService({ id: editId, body: fd }).unwrap();
        toast.success("Service updated");
      }
      setIsModalOpen(false);
    } catch {
      toast.error(isAdding ? "Failed to add" : "Failed to update");
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, svc) => {
    const val = e.target.value;
    if (val === "Edit") openEdit(svc);
    else if (val === "View") openView(svc);
    else if (val === "Delete") handleDelete(svc.id);
    e.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Services</h1>
        <div className="flex gap-3">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." />
          <Button onClick={openAdd} variant="primary">Add Service</Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Image", "Title", "Description", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="5" className="px-4 py-4 text-center text-gray-400">No services found</td></tr>
            ) : filtered.map((svc, i) => (
              <tr key={svc.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                <td className="px-4 py-3">
                  {svc.image
                    ? <img src={`/${svc.image}`} alt={svc.title} className="w-10 h-10 rounded object-cover" />
                    : <div className="w-10 h-10 rounded bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">{svc.title[0]}</div>}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{svc.title}</td>
                <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{svc.description || "—"}</td>
                <td className="px-4 py-3 text-sm">
                  <Select options={actionOptions} placeholder="Action" onChange={(e) => handleAction(e, svc)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewing ? "Service Details" : isAdding ? "Add Service" : "Edit Service"} size="lg">
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && <img src={`/${viewItem.image}`} alt={viewItem.title} className="w-20 h-20 rounded object-cover" />}
            {[["Title", viewItem?.title], ["Description", viewItem?.description]].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{val || "—"}</p>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">Close</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            <FormTextarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Service Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm" />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
              <Button type="submit" variant="primary">{isAdding ? "Add" : "Update"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Services;
