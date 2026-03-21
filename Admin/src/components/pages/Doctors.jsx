import { useState } from "react";
import {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../../Redux/features/doctorSlice";
import { useGetDepartmentsQuery } from "../../Redux/features/departmentSlice";
import Modal from "../shared/DetailsModal";
import Select from "../shared/Select";
import { toast } from "react-toastify";

const EMPTY = { name: "", specialty: "", experience: "", description: "", display_order: "", department_id: "" };

const Doctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");

  const { data: doctors = [], isLoading } = useGetDoctorsQuery();
  const { data: departments = [] } = useGetDepartmentsQuery();
  const [addDoctor] = useAddDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setIsAdding(true); setIsViewing(false);
    setFormData(EMPTY); setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (doc) => {
    setIsAdding(false); setIsViewing(false);
    setEditId(doc.id);
    setFormData({ name: doc.name, specialty: doc.specialty, experience: doc.experience || "", description: doc.description || "", display_order: doc.display_order || "", department_id: doc.department_id || "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (doc) => { setIsViewing(true); setViewItem(doc); setIsModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    try {
      await deleteDoctor(id).unwrap();
      toast.success("Doctor deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    try {
      if (isAdding) { await addDoctor(fd).unwrap(); toast.success("Doctor added"); }
      else { await updateDoctor({ id: editId, body: fd }).unwrap(); toast.success("Doctor updated"); }
      setIsModalOpen(false);
    } catch { toast.error(isAdding ? "Failed to add" : "Failed to update"); }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, doc) => {
    const val = e.target.value;
    if (val === "Edit") openEdit(doc);
    else if (val === "View") openView(doc);
    else if (val === "Delete") handleDelete(doc.id);
    e.target.value = "";
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>
        <div className="flex gap-3">
          <input type="text" placeholder="Search by name or specialty..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-60" />
          <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add Doctor</button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Image", "Name", "Specialty", "Experience", "Department", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className="px-4 py-4 text-center text-gray-400">No doctors found</td></tr>
            ) : filtered.map((doc, i) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                <td className="px-4 py-3">
                  {doc.image
                    ? <img src={`/${doc.image}`} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
                    : <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">{doc.name[0]}</div>}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{doc.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{doc.specialty}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{doc.experience || "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{doc.department_name || "—"}</td>
                <td className="px-4 py-3 text-sm">
                    <Select options={actionOptions} placeholder="Action" onChange={(e) => handleAction(e, doc)} />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewing ? "Doctor Details" : isAdding ? "Add Doctor" : "Edit Doctor"} size="lg">
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && <img src={`/${viewItem.image}`} alt={viewItem.name} className="w-20 h-20 rounded-full object-cover" />}
            {[["Name", viewItem?.name], ["Specialty", viewItem?.specialty], ["Experience", viewItem?.experience], ["Department", viewItem?.department_name], ["Description", viewItem?.description]].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{val || "—"}</p>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded-lg text-sm" required />
            <input type="text" placeholder="Specialty *" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full p-2 border rounded-lg text-sm" required />
            <input type="text" placeholder="Experience (e.g. 5 years)" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full p-2 border rounded-lg text-sm" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded-lg text-sm" rows={3} />
            <input type="number" placeholder="Display Order" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: e.target.value })} className="w-full p-2 border rounded-lg text-sm" />
            <select value={formData.department_id} onChange={(e) => setFormData({ ...formData, department_id: e.target.value })} className="w-full p-2 border rounded-lg text-sm">
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Doctor Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm" />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">{isAdding ? "Add" : "Update"}</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Doctors;
