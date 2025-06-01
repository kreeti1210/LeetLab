import React, { useEffect } from "react";

import { useProblemStore } from "../store/useProblemStore";
import { Heading1, Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable.jsx";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const {authUser} = useAuthStore();
  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4">
      <div className="absolute top-16 left-0 w-1/3 h-1/3  rounded-md bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 text-center mb-4">
        Hello, <span className="text-primary">{authUser?.name}</span>
      </h1>
      <h3 className="text-2xl font-semibold z-10 text-center">
        Welcome to LeetLab
      </h3>

      <p className="mt-1 text-center  font text-gray-500 dark:text-gray-400 z-10">
        A Beginner Friendly Platform Inspired by Leetcode for interview preparation
      </p>

      {problems.length > 0 ? (
        <ProblemTable problems={problems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
      )}
    </div>
  );
};

export default HomePage;
