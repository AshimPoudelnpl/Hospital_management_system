import { useState } from "react";
import {
  useGetNoticesQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} from "../../Redux/features/noticeSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import FormImage from "../ui/FormImage";
import SearchBar from "../ui/SearchBar";
import Skeleton from "../shared/Skeleton";
import { toast } from "react-toastify";

const IMG_URL = import.meta.env.VITE_IMG_URL;
const EMPTY = { title: "", description: "" };

const Notices = () => {
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

  const { data: notices = [], isLoading } = useGetNoticesQuery();
  const [addNotice, { isLoading: isAdding2 }] = useAddNoticeMutation();
  const [updateNotice, { isLoading: isUpdating }] = useUpdateNoticeMutation();
  const [deleteNotice, { isLoading: isDeleting }] = useDeleteNoticeMutation();

  const isSubmitting = isAdding2 || isUpdating;
  const filtered = notices.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (notice) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(notice.id);
    setFormData({ title: notice.title, description: notice.description || "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openView = (notice) => {
    setIsViewing(true);
    setViewItem(notice);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteNotice(confirmAction.id).unwrap();
      toast.success("Notice deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) payload.append(key, value);
    });
    if (imageFile) payload.append("image", imageFile);

    try {
      if (isAdding) {
        await addNotice(payload).unwrap();
        toast.success("Notice added");
      } else {
        await updateNotice({ id: editId, body: payload }).unwrap();
        toast.success("Notice updated");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed");
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (event, row) => {
    const action = event.target.value;
    const notice = filtered.find((item) => item.id === row.id);
    if (!notice) return;
    if (action === "Edit") openEdit(notice);
    else if (action === "View") openView(notice);
    else if (action === "Delete") handleDelete(notice.id);
    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Notices</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notices..." />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Notice
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Title", "Description", "Date", "Action"]}
        rows={filtered.map((notice, index) => ({
          id: notice.id,
          cells: [
            { content: index + 1 },
            {
              content: notice.image ? (
                <img src={`${IMG_URL}/${notice.image}`} alt={notice.title} className="h-10 w-10 rounded object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-100 text-sm font-bold text-purple-600">
                  {notice.title[0]}
                </div>
              ),
            },
            { content: notice.title, className: "font-medium" },
            { content: notice.description?.substring(0, 50) || "-" },
            { content: new Date(notice.created_at).toLocaleDateString() },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No notices found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isViewing ? "Notice Details" : isAdding ? "Add Notice" : "Edit Notice"}
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {viewItem?.image && (
              <img src={`${IMG_URL}/${viewItem.image}`} alt={viewItem.title} className="h-20 w-20 rounded object-cover" />
            )}
            {[
              ["Title", viewItem?.title],
              ["Description", viewItem?.description],
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Notice Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <FormTextarea
              placeholder="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
            <FormImage label="Notice Image" onChange={(e) => setImageFile(e.target.files[0])} />
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
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
        title="Delete Notice"
        message="Are you sure you want to delete this notice?"
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Notices;
