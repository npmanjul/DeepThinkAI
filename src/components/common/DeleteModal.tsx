"use client";

import { BlogAPI } from "@/src/services/api";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface DeleteModalProps {
  slug: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  router: AppRouterInstance;
  redirectPath?: string;
}

const DeleteModal = ({
  slug,
  title,
  isOpen,
  onClose,
  router,
  redirectPath = "/blog",
}: DeleteModalProps) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const resp = await BlogAPI.deleteBlog(slug);

      if (resp.status === 200) {
        toast.success("Article deleted successfully");
        onClose();
        router.push(redirectPath);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete article");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-950">
          Delete Article?
        </h3>

        <p className="mb-6 text-slate-600">
          Are you sure you want to delete "{title}"? This action cannot be
          undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
