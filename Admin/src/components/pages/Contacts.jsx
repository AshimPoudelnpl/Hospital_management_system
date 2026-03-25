import { useState } from "react";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../../Redux/features/contactSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Select from "../ui/Select";
import SearchBar from "../ui/SearchBar";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Button from "../ui/Button";
import { toast } from "react-toastify";

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");

  const { data: contacts = [], isLoading } = useGetContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleDelete = async (id) => {
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteContact(confirmAction.id).unwrap();
      toast.success("Contact deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const actionOptions = [
    { value: "View", label: "View" },
    { value: "Delete", label: "Delete" },
  ];

  const handleAction = (e, c) => {
    const val = e.target.value;
    if (val === "View") {
      setViewItem(c);
      setIsModalOpen(true);
    } else if (val === "Delete") handleDelete(c.id);
    e.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, phone..." />
      </div>

      <Table
        headers={["#", "Name", "Email", "Phone", "Message", "Date", "Action"]}
        rows={filtered.map((c, i) => ({
          id: c.id,
          cells: [
            { content: i + 1, className: "text-slate-600" },
            { content: c.name, className: "font-medium text-slate-700" },
            { content: c.email, className: "text-slate-600" },
            { content: c.phone, className: "text-slate-600" },
            { content: c.message, className: "text-slate-500 max-w-xs truncate" },
            { content: new Date(c.created_at).toLocaleDateString(), className: "text-slate-600" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No contacts found"
      />

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Contact Details" size="lg">
        {viewItem && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[["Name", viewItem.name], ["Email", viewItem.email], ["Phone", viewItem.phone], ["Date", new Date(viewItem.created_at).toLocaleString()]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Message</p>
              <p className="text-sm text-slate-800 whitespace-pre-wrap">{viewItem.message}</p>
            </div>
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
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Contacts;