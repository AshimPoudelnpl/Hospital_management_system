import { useState } from "react";
import {
  useGetReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddReviewMutation,
} from "@Redux/features/reviewSlice.js";
import Skeleton from "../shared/Skeleton";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import FormSelect from "../ui/FormSelect";
import StatsCard from "../ui/StatsCard";
import SearchBar from "../ui/SearchBar";
import Table from "../ui/Table";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const EMPTY = { name: "", rating: 5, text: "" };

const Reviews = () => {
  const { data: reviews = [], isLoading } = useGetReviewsQuery();
  const [addReview] = useAddReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY);
  const [filterRating, setFilterRating] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
      rating: review.rating,
      text: review.text || review.review_text,
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
        await updateReview({ id: editId, data: formData }).unwrap();
        toast.success("Review updated");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || (isAdding ? "Failed to add" : "Failed to update"));
    }
  };

  const filtered = reviews.filter((review) => {
    const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating, 10);
    const reviewText = review.text || review.review_text || "";
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reviewText.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRating && matchesSearch;
  });

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (event, row) => {
    const selectedAction = event.target.value;
    const review = filtered.find((item) => item.id === row.id);

    if (!review) return;

    if (selectedAction === "Edit") openEdit(review);
    else if (selectedAction === "View") openView(review);
    else if (selectedAction === "Delete") handleDelete(review.id);

    event.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Reviews</h1>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchBar
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name or review..."
            className="sm:w-72"
          />
          <Button onClick={openAdd} variant="primary" className="w-full sm:w-auto">
            Add Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Reviews" value={reviews.length} color="blue" />
        <StatsCard label="Average Rating" value={avgRating} icon={FaStar} color="blue" />
        <StatsCard
          label="5 Star Reviews"
          value={reviews.filter((review) => review.rating === 5).length}
          color="green"
        />
        <StatsCard
          label="1 Star Reviews"
          value={reviews.filter((review) => review.rating === 1).length}
          color="red"
        />
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <select
          value={filterRating}
          onChange={(event) => setFilterRating(event.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm sm:w-52"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <Table
        headers={["#", "Name", "Rating", "Review", "Date", "Action"]}
        rows={filtered.map((review, index) => ({
          id: review.id,
          cells: [
            { content: index + 1, className: "text-slate-600" },
            { content: review.name, className: "font-medium text-slate-700" },
            {
              content: (
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={starIndex < review.rating ? "text-yellow-400" : "text-gray-200"}
                      size={12}
                    />
                  ))}
                </div>
              ),
            },
            { content: review.text || review.review_text || "-", className: "max-w-xs truncate text-slate-600" },
            {
              content: review.created_at ? new Date(review.created_at).toLocaleDateString() : "-",
              className: "text-slate-600",
            },
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
              ["Rating", viewItem?.rating ? `${viewItem.rating} Stars` : "-"],
              ["Review", viewItem?.text || viewItem?.review_text],
              ["Date", viewItem?.created_at ? new Date(viewItem.created_at).toLocaleDateString() : "-"],
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
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
            <FormSelect
              placeholder="Select Rating"
              value={formData.rating}
              onChange={(event) => setFormData({ ...formData, rating: parseInt(event.target.value, 10) })}
              options={[
                { value: 5, label: "5 Stars" },
                { value: 4, label: "4 Stars" },
                { value: 3, label: "3 Stars" },
                { value: 2, label: "2 Stars" },
                { value: 1, label: "1 Star" },
              ]}
            />
            <FormTextarea
              placeholder="Review Text *"
              value={formData.text}
              onChange={(event) => setFormData({ ...formData, text: event.target.value })}
              rows={4}
              required
            />
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                className="w-full sm:w-auto"
              >
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
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default Reviews;
