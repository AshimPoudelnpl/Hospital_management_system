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
import Skeleton from "../shared/Skeleton";
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

  const filtered = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (service) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(service.id);
    setFormData({ title: service.title, description: service.description || "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (service) => {
    setIsViewing(true);
    setViewItem(service);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      if (isAdding) {
        await addService(payload).unwrap();
        toast.success("Service added");
      } else {
        await updateService({ id: editId, body: payload }).unwrap();
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

  const handleAction = (event, row) => {
    const selectedAction = event.target.value;
    const service = filtered.find((item) => item.id === row.id);

    if (!service) return;

    if (selectedAction === "Edit") openEdit(service);
    else if (selectedAction === "View") openView(service);
    else if (selectedAction === "Delete") handleDelete(service.id);

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Services</h1>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search services..."
            className="sm:w-72"
          />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Service
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Title", "Description", "Action"]}
        rows={filtered.map((service, index) => ({
          id: service.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            {
              content: service.image ? (
                <img
                  src={`${IMG_URL}/${service.image}`}
                  alt={service.title}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-teal-100 text-sm font-bold text-teal-600">
                  {service.title[0]}
                </div>
              ),
            },
            { content: service.title, className: "font-medium text-slate-700" },
            { content: service.description || "-", className: "max-w-xs truncate text-slate-500" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No services found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isViewing ? "Service Details" : isAdding ? "Add Service" : "Edit Service"}
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && (
              <img
                src={`${IMG_URL}/${viewItem.image}`}
                alt={viewItem.title}
                className="h-16 w-16 rounded object-cover sm:h-20 sm:w-20"
              />
            )}
            {[
              ["Title", viewItem?.title],
              ["Description", viewItem?.description],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{value || "-"}</p>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Title *"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              required
            />
            <FormTextarea
              placeholder="Description"
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              rows={3}
            />
            <FormImage
              label="Service Image"
              onChange={(event) => setImageFile(event.target.files[0])}
            />
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                {isAdding ? "Add" : "Update"}
              </Button>
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
