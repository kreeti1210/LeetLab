import React, { useEffect, useState } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Rocket, Link, Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable.jsx";
import { useAuthStore } from "../store/useAuthStore";
import ProblemPage from "./ProblemPage";
import { Navigate,useNavigate } from "react-router-dom";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading, getProblemById } =
    useProblemStore();
    const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [streak, setStreak] = useState(5); // Simulated streak count
  const [selectedCompany, setSelectedCompany] = useState("");
  const { getSolvedProblemByUser,  totalSolvedProblems } =
    useProblemStore();
  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);
  
  const handleRecommendedproblems = (problemId) => {   
    navigate(`/problem/${problemId}`);
  };
 
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
  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };
  const filteredProblems = selectedCompany.toLowerCase()
    ? problems.filter((problem) =>
        problem.companyTags?.includes(selectedCompany)
      )
    : problems;
  return (
    <div className="min-h-screen flex flex-row-reverse gap-6 mt-10 px-4">
      {/* Sidebar Section - Right Side */}

      {/* Main Content Section */}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-extrabold text-center mb-4">
          Hello, <span className="text-primary">{authUser?.name}</span>
        </h1>
        <h3 className="text-2xl font-semibold text-center">
          Welcome to LeetLab
        </h3>
        <p className="mt-1 text-center text-gray-500">
          A Beginner Friendly Platform Inspired by LeetCode for Interview
          Preparation
        </p>
        <div className="flex flex-row gap-4">
          {problems.length > 0 ? (
            <ProblemTable problems={filteredProblems} />
          ) : (
            (
              <p className="mt-10 text-center text-lg font-semibold text-gray-500 border border-primary px-4 py-2 rounded-sm border-dashed">
                No problems found
              </p>
            ) 
          )}
          <aside className="w-64 bg-primary/20 p-5 rounded-sm mt-10 h-fit shadow-md overflow-y-auto">
            <h2 className="text-xl font-bold text-primary mb-3">Your Stats</h2>
            <div className="p-3 bg-primary/30  rounded-lg shadow-md ">
              <p className=" font-semibold text-white">
                🔥 Coding Streak: <span className="font-bold">{streak}</span>
              </p>
              <p className=" font-semibold text-white">
                ✅ Problems Solved:{" "}
                <span className="font-bold">{totalSolvedProblems}</span>
              </p>
            </div>

            <div className="p-4 rounded-lg shadow-md bg-primary/30 text-white mt-4 flex  ">
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  <span className="mr-1">📌</span>FAANG Recommended
                </h2>
                <ul>
                  {problems.slice(11, 14).map((problem) => (
                    <li key={problem.id}>
                      <span
                        className=" hover:underline cursor-pointer text-sm"
                        onClick={() => handleRecommendedproblems(problem.id)}
                      >
                        📝{problem.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg shadow-md bg-primary/30 text-white mt-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-1">
                🏢 Top Companies Tags
              </h2>
              <div className="space-y-2">
                {[
                  "Amazon",
                  "Meta",
                  "Google",
                  "Microsoft",
                  "Apple",
                  "LinkedIn",
                  "Tesla",
                  "Adobe",
                ].map((company) => (
                  <p
                                 
                    className={`flex items-center gap-2 cursor-pointer hover:text-primary ${
                      selectedCompany === company
                        ? "font-bold text-primary"
                        : ""
                    }`}
                    onClick={() => handleCompanySelect(company.toLowerCase())}
                  >
                    <Rocket className="w-4 h-4" /> {company}
                  </p>
                ))}
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
