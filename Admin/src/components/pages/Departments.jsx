import { useState } from "react";
import {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../../Redux/features/departmentSlice";
import Modal from "../shared/DetailsModal";
import Select from "../shared/Select";
import { toast } from "react-toastify";

const EMPTY = { name: "", description: "", head_doctor: "" };

const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [addDepartment] = useAddDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setIsAdding(true); setIsViewing(false);
    setFormData(EMPTY); setServices([]); setServiceInput(""); setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (dept) => {
    setIsAdding(false); setIsViewing(false);
    setEditId(dept.id);
    setFormData({ name: dept.name, description: dept.description || "", head_doctor: dept.head_doctor || "" });
    setServices((dept.services || []).map((s) => s.service_name));
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (dept) => { setIsViewing(true); setViewItem(dept); setIsModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await deleteDepartment(id).unwrap();
      toast.success("Department deleted");
    } catch { toast.error("Failed to delete"); }
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
      if (isAdding) { await addDepartment(fd).unwrap(); toast.success("Department added"); }
      else { await updateDepartment({ id: editId, body: fd }).unwrap(); toast.success("Department updated"); }
      setIsModalOpen(false);
    } catch { toast.error(isAdding ? "Failed to add" : "Failed to update"); }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, dept) => {
    const val = e.target.value;
    if (val === "Edit") openEdit(dept);
    else if (val === "View") openView(dept);
    else if (val === "Delete") handleDelete(dept.id);
    e.target.value = "";
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
        <div className="flex gap-3">
          <input type="text" placeholder="Search departments..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-60" />
          <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add Department</button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Image", "Name", "Head Doctor", "Services", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" className="px-4 py-4 text-center text-gray-400">No departments found</td></tr>
            ) : filtered.map((dept, i) => (
              <tr key={dept.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                <td className="px-4 py-3">
                  {dept.image
                    ? <img src={`/${dept.image}`} alt={dept.name} className="w-10 h-10 rounded object-cover" />
                    : <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">{dept.name[0]}</div>}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{dept.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{dept.head_doctor || "—"}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{dept.services?.length || 0}</td>
                <td className="px-4 py-3 text-sm">
                  <Select options={actionOptions} placeholder="Action" onChange={(e) => handleAction(e, dept)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewing ? "Department Details" : isAdding ? "Add Department" : "Edit Department"} size="lg">
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && <img src={`/${viewItem.image}`} alt={viewItem.name} className="w-20 h-20 rounded object-cover" />}
            {[["Name", viewItem?.name], ["Head Doctor", viewItem?.head_doctor], ["Description", viewItem?.description]].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{val || "—"}</p>
              </div>
            ))}
            <div>
              <p className="text-xs font-medium text-gray-500">Services</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {viewItem?.services?.length ? viewItem.services.map((s) => (
                  <span key={s.id} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{s.service_name}</span>
                )) : <p className="text-sm text-slate-400">None</p>}
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Close</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Department Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded-lg text-sm" required />
            <input type="text" placeholder="Head Doctor" value={formData.head_doctor} onChange={(e) => setFormData({ ...formData, head_doctor: e.target.value })} className="w-full p-2 border rounded-lg text-sm" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded-lg text-sm" rows={3} />
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Services</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Add service..." value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())} className="flex-1 p-2 border rounded-lg text-sm" />
                <button type="button" onClick={addService} className="px-3 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200">Add</button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {services.map((s) => (
                  <span key={s} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {s}
                    <button type="button" onClick={() => removeService(s)} className="text-blue-400 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Department Image</label>
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

export default Departments;
