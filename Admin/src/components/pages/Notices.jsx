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

const EMPTY = { title: "", content: "", image: null };

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
  const [addNotice] = useAddNoticeMutation();
  const [updateNotice] = useUpdateNoticeMutation();
  const [deleteNotice, { isLoading: isDeleting }] = useDeleteNoticeMutation();

  const filtered = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase()),
  );

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
    setFormData({ title: notice.title, content: notice.content, image: notice.image });
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
    payload.append("title", formData.title);
    payload.append("content", formData.content);
    if (imageFile) {
      payload.append("image", imageFile);
    }

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
      toast.error(error?.data?.message || (isAdding ? "Failed to add" : "Failed to update"));
    }
  };

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (event, row) => {
    const selectedAction = event.target.value;
    const notice = filtered.find((item) => item.id === row.id);

    if (!notice) return;

    if (selectedAction === "Edit") openEdit(notice);
    else if (selectedAction === "View") openView(notice);
    else if (selectedAction === "Delete") handleDelete(notice.id);

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Notices</h1>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchBar
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notices..."
            className="sm:w-72"
          />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Notice
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Image", "Title", "Content", "Created By", "Date", "Action"]}
        rows={filtered.map((notice, index) => ({
          id: notice.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            {
              content: notice.image ? (
                <img
                  src={`${IMG_URL}/${notice.image}`}
                  alt={notice.title}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200 text-xs text-gray-400">
                  No image
                </div>
              ),
            },
            { content: notice.title, className: "font-medium text-slate-700" },
            { content: notice.content, className: "max-w-xs truncate text-slate-500" },
            { content: notice.created_by_name || "-", className: "text-slate-600" },
            { content: new Date(notice.created_at).toLocaleDateString(), className: "text-slate-600" },
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
              <div>
                <img
                  src={`${IMG_URL}/${viewItem.image}`}
                  alt={viewItem.title}
                  className="h-40 w-full rounded object-cover sm:h-48"
                />
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-gray-500">Title</p>
              <p className="text-sm font-semibold text-slate-800">{viewItem?.title}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Content</p>
              <p className="whitespace-pre-wrap text-sm text-slate-800">{viewItem?.content}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Created By</p>
              <p className="text-sm text-slate-800">{viewItem?.created_by_name || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Date</p>
              <p className="text-sm text-slate-800">
                {viewItem?.created_at ? new Date(viewItem.created_at).toLocaleString() : "-"}
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Title *"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              required
            />
            <FormTextarea
              placeholder="Content *"
              value={formData.content}
              onChange={(event) => setFormData({ ...formData, content: event.target.value })}
              rows={5}
              required
            />
            <FormImage
              label="Notice Image"
              onChange={(event) => setImageFile(event.target.files[0])}
              currentImage={formData.image && !imageFile ? formData.image : null}
            />
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
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
        message="Are you sure you want to delete this notice? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Notices;
