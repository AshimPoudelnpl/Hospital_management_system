import { useState } from "react";
import {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../../Redux/features/departmentSlice";
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

const EMPTY = { name: "", description: "", head_doctor: "" };

const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [serviceInput, setServiceInput] = useState("");
  const [services, setServices] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");

  const { data: departments = [], isLoading } = useGetDepartmentsQuery();
  const [addDepartment, { isLoading: isAddingDept }] = useAddDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdatingDept }] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const filtered = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setServices([]);
    setServiceInput("");
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (department) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(department.id);
    setFormData({
      name: department.name,
      description: department.description || "",
      head_doctor: department.head_doctor || "",
    });
    setServices((department.services || []).map((service) => service.service_name));
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (department) => {
    setIsViewing(true);
    setViewItem(department);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDepartment(confirmAction.id).unwrap();
      toast.success("Department deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const addService = () => {
    const value = serviceInput.trim();
    if (value && !services.includes(value)) {
      setServices([...services, value]);
    }
    setServiceInput("");
  };

  const removeService = (service) => {
    setServices(services.filter((item) => item !== service));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    payload.append("services", JSON.stringify(services));

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      if (isAdding) {
        await addDepartment(payload).unwrap();
        toast.success("Department added");
      } else {
        await updateDepartment({ id: editId, body: payload }).unwrap();
        toast.success("Department updated");
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
    const department = filtered.find((item) => item.id === row.id);

    if (!department) return;

    if (selectedAction === "Edit") openEdit(department);
    else if (selectedAction === "View") openView(department);
    else if (selectedAction === "Delete") handleDelete(department.id);

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search departments..."
            className="sm:w-72"
          />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Department
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Name", "Head Doctor", "Services", "Action"]}
        rows={filtered.map((department, index) => ({
          id: department.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            {
              content: department.image ? (
                <img
                  src={`${IMG_URL}/${department.image}`}
                  alt={department.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-100 text-sm font-bold text-purple-600">
                  {department.name[0]}
                </div>
              ),
            },
            { content: department.name, className: "font-medium text-slate-700" },
            { content: department.head_doctor || "-", className: "text-slate-600" },
            { content: department.services?.length || 0, className: "text-slate-600" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No departments found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isViewing ? "Department Details" : isAdding ? "Add Department" : "Edit Department"}
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && (
              <img
                src={`${IMG_URL}/${viewItem.image}`}
                alt={viewItem.name}
                className="h-16 w-16 rounded object-cover sm:h-20 sm:w-20"
              />
            )}
            {[
              ["Name", viewItem?.name],
              ["Head Doctor", viewItem?.head_doctor],
              ["Description", viewItem?.description],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{value || "-"}</p>
              </div>
            ))}
            <div>
              <p className="text-xs font-medium text-gray-500">Services</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {viewItem?.services?.length ? (
                  viewItem.services.map((service) => (
                    <span
                      key={service.id}
                      className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
                    >
                      {service.service_name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">None</p>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Department Name *"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
            <FormInput
              placeholder="Head Doctor"
              value={formData.head_doctor}
              onChange={(event) => setFormData({ ...formData, head_doctor: event.target.value })}
            />
            <FormTextarea
              placeholder="Description"
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              rows={3}
            />
            <div>
              <label className="mb-1 block text-xs text-gray-500">Services</label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  placeholder="Add service..."
                  value={serviceInput}
                  onChange={(event) => setServiceInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addService())}
                  className="w-full flex-1 rounded-lg border p-2 text-sm"
                />
                <Button
                  type="button"
                  onClick={addService}
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {services.map((service) => (
                  <span
                    key={service}
                    className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="text-blue-400 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <FormImage
              label="Department Image"
              onChange={(event) => setImageFile(event.target.files[0])}
            />
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isAddingDept || isUpdatingDept}
                loadingText={isAdding ? "Adding..." : "Updating..."}
                className="w-full sm:w-auto"
              >
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
        title="Delete Department"
        message="Are you sure you want to delete this department? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Departments;
