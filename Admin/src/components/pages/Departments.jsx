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
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Select from "../ui/Select";
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
  const [addDepartment, { isLoading: isAddingDept }] =
    useAddDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdatingDept }] =
    useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
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

  const openEdit = (dept) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(dept.id);
    setFormData({
      name: dept.name,
      description: dept.description || "",
      head_doctor: dept.head_doctor || "",
    });
    setServices((dept.services || []).map((s) => s.service_name));
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (dept) => {
    setIsViewing(true);
    setViewItem(dept);
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
    const s = serviceInput.trim();
    if (s && !services.includes(s)) setServices([...services, s]);
    setServiceInput("");
  };

  const removeService = (s) => setServices(services.filter((x) => x !== s));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    fd.append("services", JSON.stringify(services));
    if (imageFile) fd.append("image", imageFile);
    try {
      if (isAdding) {
        await addDepartment(fd).unwrap();
        toast.success("Department added");
      } else {
        await updateDepartment({ id: editId, body: fd }).unwrap();
        toast.success("Department updated");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message ||
          (isAdding ? "Failed to add" : "Failed to update"),
      );
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, row) => {
    const val = e.target.value;
    const dept = filtered.find(d => d.id === row.id);
    if (!dept) return;
    if (val === "Edit") openEdit(dept);
    else if (val === "View") openView(dept);
    else if (val === "Delete") handleDelete(dept.id);
    e.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
        <div className="flex gap-3">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments..."
          />
          <Button onClick={openAdd} variant="primary">
            Add Department
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Name", "Head Doctor", "Services", "Action"]}
        rows={filtered.map((dept, i) => ({
          id: dept.id,
          cells: [
            { content: i + 1, className: "text-slate-600" },
            {
              content: dept.image ? (
                <img
                  src={`${IMG_URL}/${dept.image}`}
                  alt={dept.name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                  {dept.name[0]}
                </div>
              ),
            },
            { content: dept.name, className: "font-medium text-slate-700" },
            { content: dept.head_doctor || "—", className: "text-slate-600" },
            {
              content: dept.services?.length || 0,
              className: "text-slate-600",
            },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No departments found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          isViewing
            ? "Department Details"
            : isAdding
              ? "Add Department"
              : "Edit Department"
        }
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && (
              <img
                src={`${IMG_URL}/${viewItem.image}`}
                alt={viewItem.name}
                className="w-20 h-20 rounded object-cover"
              />
            )}
            {[
              ["Name", viewItem?.name],
              ["Head Doctor", viewItem?.head_doctor],
              ["Description", viewItem?.description],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{val || "—"}</p>
              </div>
            ))}
            <div>
              <p className="text-xs font-medium text-gray-500">Services</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {viewItem?.services?.length ? (
                  viewItem.services.map((s) => (
                    <span
                      key={s.id}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                    >
                      {s.service_name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">None</p>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Department Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <FormInput
              placeholder="Head Doctor"
              value={formData.head_doctor}
              onChange={(e) =>
                setFormData({ ...formData, head_doctor: e.target.value })
              }
            />
            <FormTextarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Services
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add service..."
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addService())
                  }
                  className="flex-1 p-2 border rounded-lg text-sm"
                />
                <Button
                  type="button"
                  onClick={addService}
                  variant="secondary"
                  size="sm"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {services.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeService(s)}
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
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isAddingDept || isUpdatingDept}
                loadingText={isAdding ? "Adding..." : "Updating..."}
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
