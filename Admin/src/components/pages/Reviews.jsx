import { useState } from "react";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "../../Redux/features/reviewSlice";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import SearchBar from "../ui/SearchBar";
import Skeleton from "../shared/Skeleton";
import { toast } from "react-toastify";

const EMPTY = { name: "", role: "", rating: 5, text: "" };

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [search, setSearch] = useState("");

  const { data: reviews = [], isLoading } = useGetReviewsQuery();
  const [addReview, { isLoading: isAdding2 }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const isSubmitting = isAdding2 || isUpdating;
  const filtered = reviews.filter((r) => r.name?.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setIsAdding(true);
    setIsViewing(false);
    setFormData(EMPTY);
    setIsModalOpen(true);
  };

  const openEdit = (review) => {
    setIsAdding(false);
    setIsViewing(false);
    setEditId(review.id);
    setFormData({
      name: review.name,
      role: review.role || "",
      rating: review.rating || 5,
      text: review.text || "",
    });
    setIsModalOpen(true);
  };

  const openView = (review) => {
    setIsViewing(true);
    setViewItem(review);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setConfirmAction({ type: "delete", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteReview(confirmAction.id).unwrap();
      toast.success("Review deleted");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isAdding) {
        await addReview(formData).unwrap();
        toast.success("Review added");
      } else {
        await updateReview({ id: editId, body: formData }).unwrap();
        toast.success("Review updated");
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
    const review = filtered.find((item) => item.id === row.id);
    if (!review) return;
    if (action === "Edit") openEdit(review);
    else if (action === "View") openView(review);
    else if (action === "Delete") handleDelete(review.id);
    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 mb-4 sm:mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Reviews</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reviews..." />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Review
          </Button>
        </div>
      </div>

      <Table
        headers={["#", "Name", "Role", "Rating", "Review", "Action"]}
        rows={filtered.map((review, index) => ({
          id: review.id,
          cells: [
            { content: index + 1 },
            { content: review.name || "-", className: "font-medium" },
            { content: review.role || "-" },
            { content: `${review.rating || 0} ⭐` },
            { content: review.text?.substring(0, 50) + "..." || "-" },
          ],
        }))}
        actionOptions={actionOptions}
        onAction={handleAction}
        emptyMessage="No reviews found"
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isViewing ? "Review Details" : isAdding ? "Add Review" : "Edit Review"}
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {[
              ["Name", viewItem?.name],
              ["Role", viewItem?.role],
              ["Rating", `${viewItem?.rating} ⭐`],
              ["Review", viewItem?.text],
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
              placeholder="Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FormInput
              placeholder="Role (e.g. Patient)"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <FormInput
              type="number"
              placeholder="Rating (1-5) *"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              min="1"
              max="5"
              required
            />
            <FormTextarea
              placeholder="Review Text *"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows={4}
              required
            />
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
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Reviews;
