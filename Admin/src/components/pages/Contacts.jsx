import { useState } from "react";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../../Redux/features/contactSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import SearchBar from "../ui/SearchBar";
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

  const filtered = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search),
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

  const handleAction = (event, row) => {
    const selectedAction = event.target.value;
    const contact = filtered.find((item) => item.id === row.id);

    if (!contact) return;

    if (selectedAction === "View") {
      setViewItem(contact);
      setIsModalOpen(true);
    } else if (selectedAction === "Delete") {
      handleDelete(contact.id);
    }

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, phone..."
          className="w-full sm:w-80"
        />
      </div>

      <Table
        headers={["#", "Name", "Email", "Phone", "Message", "Date", "Action"]}
        rows={filtered.map((contact, index) => ({
          id: contact.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            { content: contact.name, className: "font-medium text-slate-700" },
            { content: contact.email, className: "text-slate-600" },
            { content: contact.phone, className: "text-slate-600" },
            { content: contact.message, className: "max-w-xs truncate text-slate-500" },
            { content: new Date(contact.created_at).toLocaleDateString(), className: "text-slate-600" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No contacts found"
      />

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Contact Details" size="lg">
        {viewItem && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Name", viewItem.name],
                ["Email", viewItem.email],
                ["Phone", viewItem.phone],
                ["Date", new Date(viewItem.created_at).toLocaleString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Message</p>
              <p className="whitespace-pre-wrap text-sm text-slate-800">{viewItem.message}</p>
            </div>
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
