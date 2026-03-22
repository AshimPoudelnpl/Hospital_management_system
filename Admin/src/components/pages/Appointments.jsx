import { useState } from "react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} from "../../Redux/features/appointmentSlice";
import Modal from "../shared/DetailsModal";
import Select from "../shared/Select";
import { toast } from "react-toastify";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: appointments = [], isLoading } = useGetAppointmentsQuery();
  const [updateStatus] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

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
    } catch { toast.error("Failed to update status"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await deleteAppointment(id).unwrap();
      toast.success("Appointment deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const actionOptions = [
    { value: "View", label: "View" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAction = (e, a) => {
    const val = e.target.value;
    if (val === "View") { setViewItem(a); setIsModalOpen(true); }
    else if (val === "Delete") handleDelete(a.id);
    e.target.value = "";
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
        <div className="flex gap-3">
          <input type="text" placeholder="Search patient, doctor..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-56" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Patient", "Doctor", "Department", "Date", "Time", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="8" className="px-4 py-4 text-center text-gray-400">No appointments found</td></tr>
            ) : filtered.map((a, i) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                <td className="px-4 py-3 text-sm text-slate-700 font-medium">{a.patient_name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{a.doctor_name || "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{a.department_name || "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{a.appointment_date}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{a.appointment_time}</td>
                <td className="px-4 py-3">
                  <select
                    value={a.status}
                    onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-300 cursor-pointer focus:outline-none bg-white text-slate-700"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Select options={actionOptions} placeholder="Action" onChange={(e) => handleAction(e, a)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;
