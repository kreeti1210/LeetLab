import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isSubmissionLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isSubmissionLoading: true });
      const res = await axiosInstance.get("/submissions/get-all-submissions");
      set({ submissions: res.data.submissions });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting all submissions", error);
      toast.error("Error getting all submissions");
    } finally {
      set({ isSubmissionLoading: false });
    }
  },

  getSubmissionsForProblem: async (problemId) => {
    try {
      set({ isSubmissionLoading: true });
      const res = await axiosInstance.get(
        `/submissions/get-submissions/${problemId}`
      );
      set({ submission: res.data.submissions });
    } catch (error) {
      console.log("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
    } finally {
      set({ isSubmissionLoading: false });
    }
  },
  getSubmissionCount: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submissions/get-submissions-count/${problemId}`
      );
      set({ submissionCount: res.data.count });
    } catch (error) {
      console.log("Error getting submission count for problem", error);
      toast.error("Error getting submission count for problem");
    }
  },
}));
