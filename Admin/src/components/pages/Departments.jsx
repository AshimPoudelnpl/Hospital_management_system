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

const EMPTY = { name: "", description: "", display_order: "" };

const Departments = () => {
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

  const { data: departments = [], isLoading } = useGetDepartmentsQuery();
  const [addDepartment, { isLoading: isAdding2 }] = useAddDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const isSubmitting = isAdding2 || isUpdating;

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
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
      display_order: dept.display_order || "",
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) payload.append(key, value);
    });
    if (imageFile) payload.append("image", imageFile);

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
      toast.error(error?.data?.message || "Failed");
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (event, row) => {
    const action = event.target.value;
    const dept = filtered.find((item) => item.id === row.id);
    if (!dept) return;
    if (action === "Edit") openEdit(dept);
    else if (action === "View") openView(dept);
    else if (action === "Delete") handleDelete(dept.id);
    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Departments</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments..."
          />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Department
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Name", "Description", "Display Order", "Action"]}
        rows={filtered.map((dept, index) => ({
          id: dept.id,
          cells: [
            { content: index + 1 },
            {
              content: dept.image ? (
                <img
                  src={`${IMG_URL}/${dept.image}`}
                  alt={dept.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 text-sm font-bold text-blue-600">
                  {dept.name[0]}
                </div>
              ),
            },
            { content: dept.name, className: "font-medium" },
            { content: dept.description?.substring(0, 50) || "-" },
            { content: dept.display_order || "-" },
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
              <img src={`${IMG_URL}/${viewItem.image}`} alt={viewItem.name} className="h-20 w-20 rounded object-cover" />
            )}
            {[
              ["Name", viewItem?.name],
              ["Description", viewItem?.description],
              ["Display Order", viewItem?.display_order],
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
              placeholder="Department Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FormTextarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <FormInput
              type="number"
              placeholder="Display Order"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
            />
            <FormImage label="Department Image" onChange={(e) => setImageFile(e.target.files[0])} />
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
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
        message="Are you sure you want to delete this department?"
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Departments;
