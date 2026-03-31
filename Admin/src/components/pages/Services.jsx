import { useState } from "react";
import {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../Redux/features/servicesSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import FormImage from "../ui/FormImage";
import SearchBar from "../ui/SearchBar";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Select from "../ui/Select";
import { toast } from "react-toastify";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const EMPTY = { title: "", description: "" };

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
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
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

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
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteService(confirmAction.id).unwrap();
      toast.success("Service deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
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
    } catch (error) {
      toast.error(error?.data?.message || (isAdding ? "Failed to add" : "Failed to update"));
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, row) => {
    const val = e.target.value;
    const svc = filtered.find(s => s.id === row.id);
    if (!svc) return;
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

      <Table
        headers={["#", "Image", "Title", "Description", "Action"]}
        rows={filtered.map((svc, i) => ({
          id: svc.id,
          cells: [
            { content: i + 1, className: "text-slate-600" },
            {
              content: svc.image ? (
                <img src={`${IMG_URL}/${svc.image}`} alt={svc.title} className="w-10 h-10 rounded object-cover" />
              ) : (
                <div className="w-10 h-10 rounded bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">
                  {svc.title[0]}
                </div>
              ),
            },
            { content: svc.title, className: "font-medium text-slate-700" },
            { content: svc.description || "—", className: "text-slate-500 max-w-xs truncate" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No services found"
      />

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewing ? "Service Details" : isAdding ? "Add Service" : "Edit Service"} size="lg">
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && <img src={`${IMG_URL}/${viewItem.image}`} alt={viewItem.title} className="w-20 h-20 rounded object-cover" />}
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
            <FormImage
              label="Service Image"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
              <Button type="submit" variant="primary">{isAdding ? "Add" : "Update"}</Button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmModal
        show={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Services;