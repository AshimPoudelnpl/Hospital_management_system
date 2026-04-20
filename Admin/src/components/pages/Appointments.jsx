import { useState } from "react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} from "../../Redux/features/appointmentSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import SearchBar from "../ui/SearchBar";
import Skeleton from "../shared/Skeleton";
import Button from "../ui/Button";
import { toast } from "react-toastify";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: appointments = [], isLoading } = useGetAppointmentsQuery();
  const [updateStatus] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment, { isLoading: isDeleting }] = useDeleteAppointmentMutation();

  const filtered = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      appointment.patient_email.toLowerCase().includes(search.toLowerCase()) ||
      (appointment.doctor_name || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? appointment.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
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

  const actionOptions = [
    { value: "View", label: "View" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAction = (event, row) => {
    const selectedAction = event.target.value;
    const appointment = filtered.find((item) => item.id === row.id);

    if (!appointment) return;

    if (selectedAction === "View") {
      setViewItem(appointment);
      setIsModalOpen(true);
    } else if (selectedAction === "Delete") {
      handleDelete(appointment.id);
    }

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search patient, doctor..."
            className="sm:w-72"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:w-44"
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table
        headers={["#", "Patient", "Doctor", "Department", "Date", "Time", "Status", "Action"]}
        rows={filtered.map((appointment, index) => ({
          id: appointment.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            { content: appointment.patient_name, className: "font-medium text-slate-700" },
            { content: appointment.doctor_name || "-", className: "text-slate-600" },
            { content: appointment.department_name || "-", className: "text-slate-600" },
            { content: appointment.appointment_date, className: "text-slate-600" },
            { content: appointment.appointment_time, className: "text-slate-600" },
            {
              content: (
                <select
                  value={appointment.status}
                  onChange={(event) => handleStatusChange(appointment.id, event.target.value)}
                  className="min-w-[135px] rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              ),
            },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No appointments found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Appointment Details"
        size="lg"
      >
        {viewItem && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Patient Name", viewItem.patient_name],
                ["Email", viewItem.patient_email],
                ["Phone", viewItem.patient_phone],
                ["Doctor", viewItem.doctor_name],
                ["Department", viewItem.department_name],
                ["Date", viewItem.appointment_date],
                ["Time", viewItem.appointment_time],
                ["Status", viewItem.status],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-slate-800">{value || "-"}</p>
                </div>
              ))}
            </div>
            {viewItem.message && (
              <div>
                <p className="text-xs font-medium text-gray-500">Message</p>
                <p className="text-sm text-slate-800">{viewItem.message}</p>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        show={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Appointments;
