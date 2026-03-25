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
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Button from "../ui/Button";
import Select from "../ui/Select";
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

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      a.patient_email.toLowerCase().includes(search.toLowerCase()) ||
      (a.doctor_name || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? a.status === statusFilter : true;
    return matchSearch && matchStatus;
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

  const handleAction = (e, a) => {
    const val = e.target.value;
    if (val === "View") {
      setViewItem(a);
      setIsModalOpen(true);
    } else if (val === "Delete") handleDelete(a.id);
    e.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
        <div className="flex gap-3">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient, doctor..." />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <Table
        headers={["#", "Patient", "Doctor", "Department", "Date", "Time", "Status", "Action"]}
        rows={filtered.map((a, i) => ({
          id: a.id,
          cells: [
            { content: i + 1, className: "text-slate-600" },
            { content: a.patient_name, className: "font-medium text-slate-700" },
            { content: a.doctor_name || "—", className: "text-slate-600" },
            { content: a.department_name || "—", className: "text-slate-600" },
            { content: a.appointment_date, className: "text-slate-600" },
            { content: a.appointment_time, className: "text-slate-600" },
            {
              content: (
                <select
                  value={a.status}
                  onChange={(e) => handleStatusChange(a.id, e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-300 cursor-pointer focus:outline-none bg-white text-slate-700"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
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

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Appointment Details" size="lg">
        {viewItem && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Patient Name", viewItem.patient_name],
                ["Email", viewItem.patient_email],
                ["Phone", viewItem.patient_phone],
                ["Doctor", viewItem.doctor_name],
                ["Department", viewItem.department_name],
                ["Date", viewItem.appointment_date],
                ["Time", viewItem.appointment_time],
                ["Status", viewItem.status],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-slate-800">{val || "—"}</p>
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
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">Close</Button>
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