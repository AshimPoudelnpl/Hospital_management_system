import { useState } from "react";
import {
  useGetReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddReviewMutation,
} from "@Redux/features/reviewSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Modal from "../ui/DetailsModal";
import ConfirmModal from "../ui/ConfirmModal";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";
import FormSelect from "../ui/FormSelect";
import StatsCard from "../ui/StatsCard";
import SearchBar from "../ui/SearchBar";
import Select from "../ui/Select";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const matchesRating =
      filterRating === "all" || review.rating === parseInt(filterRating);
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.text || review.review_text)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const actionOptions = [
    { value: "Edit", label: "Edit" },
    { value: "Delete", label: "Delete" },
    { value: "View", label: "View" },
  ];

  const handleAction = (e, review) => {
    const val = e.target.value;
    if (val === "Edit") openEdit(review);
    else if (val === "View") openView(review);
    else if (val === "Delete") handleDelete(review.id);
    e.target.value = "";
  };

  if (isLoading) return <Skeleton variant="table" count={5} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Reviews</h1>
        <div className="flex gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or review..."
          />
          <Button onClick={openAdd} variant="primary">
            Add Review
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatsCard label="Total Reviews" value={reviews.length} color="blue" />
        <StatsCard
          label="Average Rating"
          value={avgRating}
          icon={FaStar}
          color="blue"
        />
        <StatsCard
          label="5 Star Reviews"
          value={reviews.filter((r) => r.rating === 5).length}
          color="green"
        />
        <StatsCard
          label="1 Star Reviews"
          value={reviews.filter((r) => r.rating === 1).length}
          color="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {["#", "Name", "Rating", "Review", "Date", "Action"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-400">
                  No reviews found
                </td>
              </tr>
            ) : (
              filtered.map((review, i) => (
                <tr key={review.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-700">
                    {review.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }
                          size={12}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">
                    {review.text || review.review_text}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleAction(e, review)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          isViewing ? "Review Details" : isAdding ? "Add Review" : "Edit Review"
        }
        size="lg"
      >
        {isViewing ? (
          <div className="space-y-3">
            {[
              ["Name", viewItem?.name],
              ["Rating", `${viewItem?.rating} Stars`],
              ["Review", viewItem?.text || viewItem?.review_text],
              ["Date", new Date(viewItem?.created_at).toLocaleDateString()],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-slate-800">{val || "—"}</p>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              placeholder="Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <FormSelect
              placeholder="Select Rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: parseInt(e.target.value) })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              rows={4}
              required
            />
            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
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