import { useState } from "react";
import {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../../Redux/features/doctorSlice";
import { useGetDepartmentsQuery } from "../../Redux/features/departmentSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import FormSelect from "../ui/FormSelect";
import FormImage from "../ui/FormImage";
import SearchBar from "../ui/SearchBar";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Select from "../ui/Select";
import { toast } from "react-toastify";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const EMPTY = {
  name: "",
  specialty: "",
  experience: "",
  description: "",
  display_order: "",
  department_id: "",
};

const Doctors = () => {
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

  const { data: doctors = [], isLoading } = useGetDoctorsQuery();
  const { data: departments = [] } = useGetDepartmentsQuery();
  const [addDoctor, { isLoading: isAddingDoctor }] = useAddDoctorMutation();
  const [updateDoctor, { isLoading: isUpdatingDoctor }] = useUpdateDoctorMutation();
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

  const isSubmitting = isAddingDoctor || isUpdatingDoctor;

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (doc) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(doc.id);
    setFormData({
      name: doc.name,
      specialty: doc.specialty,
      experience: doc.experience || "",
      description: doc.description || "",
      display_order: doc.display_order || "",
      department_id: doc.department_id || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (doc) => {
    setIsViewing(true);
    setViewItem(doc);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoctor(confirmAction.id).unwrap();
      toast.success("Doctor deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== null && v !== undefined) fd.append(k, v);
    });
    if (imageFile) fd.append("image", imageFile);
    try {
      if (isAdding) {
        await addDoctor(fd).unwrap();
        toast.success("Doctor added");
      } else {
        await updateDoctor({ id: editId, body: fd }).unwrap();
        toast.success("Doctor updated");
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
    const doc = filtered.find(d => d.id === row.id);
    if (!doc) return;
    if (val === "Edit") openEdit(doc);
    else if (val === "View") openView(doc);
    else if (val === "Delete") handleDelete(doc.id);
    e.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>
        <div className="flex gap-3">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
          />
          <Button onClick={openAdd} variant="primary">
            Add Doctor
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Name", "Specialty", "Experience", "Department", "Display Order", "Action"]}
        rows={filtered.map((doc, i) => ({
          id: doc.id,
          cells: [
            { content: i + 1, className: "text-slate-600" },
            {
              content: doc.image ? (
                <img src={`${IMG_URL}/${doc.image}`} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {doc.name[0]}
                </div>
              ),
            },
            { content: doc.name, className: "font-medium text-slate-700" },
            { content: doc.specialty, className: "text-slate-600" },
            { content: doc.experience || "—", className: "text-slate-600" },
            { content: doc.department_name || "—", className: "text-slate-600" },
            { content: doc.display_order || "—", className: "font-medium text-slate-600" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No doctors found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          isViewing ? "Doctor Details" : isAdding ? "Add Doctor" : "Edit Doctor"
        }
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && (
              <img
                src={`${IMG_URL}/${viewItem.image}`}
                alt={viewItem.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            {[
              ["Name", viewItem?.name],
              ["Specialty", viewItem?.specialty],
              ["Experience", viewItem?.experience],
              ["Department", viewItem?.department_name],
              ["Display Order", viewItem?.display_order],
              ["Description", viewItem?.description],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{val || "—"}</p>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <FormInput
              placeholder="Specialty *"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              required
            />
            <FormInput
              placeholder="Experience (e.g. 5 years)"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
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
            <FormInput
              type="number"
              placeholder="Display Order"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({ ...formData, display_order: e.target.value })
              }
            />
            <FormSelect
              placeholder="Select Department"
              value={formData.department_id}
              onChange={(e) =>
                setFormData({ ...formData, department_id: e.target.value })
              }
              options={departments.map((d) => ({ id: d.id, name: d.name }))}
            />
            <FormImage
              label="Doctor Image"
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
              <Button type="submit" variant="primary" isLoading={isSubmitting} loadingText={isAdding ? "Adding..." : "Updating..."}>
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
        title="Delete Doctor"
        message="Are you sure you want to delete this doctor? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Doctors;
