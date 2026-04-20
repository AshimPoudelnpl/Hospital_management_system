import { useState } from "react";
import { useGetContactsQuery, useDeleteContactMutation } from "../../Redux/features/contactSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import SearchBar from "../ui/SearchBar";
import Skeleton from "../shared/Skeleton";
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
    (c) => c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openView = (contact) => {
    setViewItem(contact);
    setIsModalOpen(true);
  };

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
    const action = event.target.value;
    const contact = filtered.find((item) => item.id === row.id);
    if (!contact) return;
    if (action === "View") openView(contact);
    else if (action === "Delete") handleDelete(contact.id);
    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Contact Messages</h1>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." />
      </div>

      <Table
        headers={["#", "Name", "Email", "Phone", "Message", "Date", "Action"]}
        rows={filtered.map((contact, index) => ({
          id: contact.id,
          cells: [
            { content: index + 1 },
            { content: contact.name || "-", className: "font-medium" },
            { content: contact.email || "-" },
            { content: contact.phone || "-" },
            { content: contact.message?.substring(0, 40) + "..." || "-" },
            { content: new Date(contact.created_at).toLocaleDateString() },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No contact messages found"
      />

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Contact Details" size="lg">
        <div className="space-y-3">
          {[
            ["Name", viewItem?.name],
            ["Email", viewItem?.email],
            ["Phone", viewItem?.phone],
            ["Message", viewItem?.message],
            ["Date", new Date(viewItem?.created_at).toLocaleDateString()],
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
        title="Delete Contact"
        message="Are you sure you want to delete this contact message?"
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Contacts;
