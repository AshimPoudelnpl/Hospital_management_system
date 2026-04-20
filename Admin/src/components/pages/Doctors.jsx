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
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (doctor) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(doctor.id);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience || "",
      description: doctor.description || "",
      display_order: doctor.display_order || "",
      department_id: doctor.department_id || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (doctor) => {
    setIsViewing(true);
    setViewItem(doctor);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      if (isAdding) {
        await addDoctor(payload).unwrap();
        toast.success("Doctor added");
      } else {
        await updateDoctor({ id: editId, body: payload }).unwrap();
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

  const handleAction = (event, row) => {
    const selectedAction = event.target.value;
    const doctor = filtered.find((item) => item.id === row.id);

    if (!doctor) return;

    if (selectedAction === "Edit") openEdit(doctor);
    else if (selectedAction === "View") openView(doctor);
    else if (selectedAction === "Delete") handleDelete(doctor.id);

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Doctors</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or specialty..."
          />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Doctor
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Name", "Specialty", "Experience", "Department", "Display Order", "Action"]}
        rows={filtered.map((doctor, index) => ({
          id: doctor.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            {
              content: doctor.image ? (
                <img
                  src={`${IMG_URL}/${doctor.image}`}
                  alt={doctor.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {doctor.name[0]}
                </div>
              ),
            },
            { content: doctor.name, className: "font-medium text-slate-700" },
            { content: doctor.specialty, className: "text-slate-600" },
            { content: doctor.experience || "-", className: "text-slate-600" },
            { content: doctor.department_name || "-", className: "text-slate-600" },
            { content: doctor.display_order || "-", className: "font-medium text-slate-600" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No doctors found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isViewing ? "Doctor Details" : isAdding ? "Add Doctor" : "Edit Doctor"}
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && (
              <img
                src={`${IMG_URL}/${viewItem.image}`}
                alt={viewItem.name}
                className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
              />
            )}
            {[
              ["Name", viewItem?.name],
              ["Specialty", viewItem?.specialty],
              ["Experience", viewItem?.experience],
              ["Department", viewItem?.department_name],
              ["Display Order", viewItem?.display_order],
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
              placeholder="Name *"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
            <FormInput
              placeholder="Specialty *"
              value={formData.specialty}
              onChange={(event) => setFormData({ ...formData, specialty: event.target.value })}
              required
            />
            <FormInput
              placeholder="Experience (e.g. 5 years)"
              value={formData.experience}
              onChange={(event) => setFormData({ ...formData, experience: event.target.value })}
            />
            <FormTextarea
              placeholder="Description"
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              rows={3}
            />
            <FormInput
              type="number"
              placeholder="Display Order"
              value={formData.display_order}
              onChange={(event) => setFormData({ ...formData, display_order: event.target.value })}
            />
            <FormSelect
              placeholder="Select Department"
              value={formData.department_id}
              onChange={(event) => setFormData({ ...formData, department_id: event.target.value })}
              options={departments.map((department) => ({ id: department.id, name: department.name }))}
            />
            <FormImage
              label="Doctor Image"
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
