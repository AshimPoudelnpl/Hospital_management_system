import { useState } from "react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} from "../../Redux/features/appointmentSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import SearchBar from "../ui/SearchBar";
import Skeleton from "../shared/Skeleton";
import { toast } from "react-toastify";

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");

  const { data: appointments = [], isLoading } = useGetAppointmentsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment, { isLoading: isDeleting }] = useDeleteAppointmentMutation();

  const filtered = appointments.filter(
    (apt) =>
      apt.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctor_name?.toLowerCase().includes(search.toLowerCase())
  );

  const openView = (apt) => {
    setViewItem(apt);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAppointment(confirmAction.id).unwrap();
      toast.success("Appointment deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const actionOptions = [
    { value: "View", label: "View" },
    { value: "Confirmed", label: "Mark Confirmed" },
    { value: "Completed", label: "Mark Completed" },
    { value: "Cancelled", label: "Mark Cancelled" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAction = (event, row) => {
    const action = event.target.value;
    const apt = filtered.find((item) => item.id === row.id);
    if (!apt) return;

    if (action === "View") openView(apt);
    else if (action === "Delete") handleDelete(apt.id);
    else if (["Confirmed", "Completed", "Cancelled"].includes(action)) {
      handleStatusChange(apt.id, action.toLowerCase());
    }
    event.target.value = "";
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Appointments</h1>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search appointments..." />
      </div>

      <Table
        headers={["#", "Patient", "Doctor", "Department", "Date", "Time", "Status", "Action"]}
        rows={filtered.map((apt, index) => ({
          id: apt.id,
          cells: [
            { content: index + 1 },
            { content: apt.patient_name || "-", className: "font-medium" },
            { content: apt.doctor_name || "-" },
            { content: apt.department_name || "-" },
            { content: apt.appointment_date || "-" },
            { content: apt.appointment_time || "-" },
            { content: getStatusBadge(apt.status) },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No appointments found"
      />

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Appointment Details" size="lg">
        <div className="space-y-3">
          {[
            ["Patient Name", viewItem?.patient_name],
            ["Patient Email", viewItem?.patient_email],
            ["Patient Phone", viewItem?.patient_phone],
            ["Doctor", viewItem?.doctor_name],
            ["Department", viewItem?.department_name],
            ["Date", viewItem?.appointment_date],
            ["Time", viewItem?.appointment_time],
            ["Status", viewItem?.status],
            ["Message", viewItem?.message],
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
      </Modal>

      <ConfirmModal
        show={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment?"
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Appointments;
