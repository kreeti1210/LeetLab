import { db } from "../libs/db.js";
import { submitBatch, pollBatchResults } from "../libs/judge0.lib.js";
export const createProblem = async (req, res) => {
  // going to all data from req body - title, desc,etc
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  //going to checck user role again for admin
  if (req.user.role !== "ADMIN") {
    return req.status(403).json({
      error: "You are allowed to create problem",
    });
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      //taking language and solution code from refernce sol
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return req.status(403).json({
          error: "Language not allowed",
        });
      }
      //loop through each reference solution for different language

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        message: "Problem created successfully",
        success: true,
        problem: newProblem,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creating problem",
    });
  }
 
  //judge0 se get language id  eg 63 for js
};

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany(

        );
        if(!problems){
            return res.status(404).json({
                message: "No problems found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Problems fetched successfully",
            success: true,
            problems
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching problems",
            success: false
        })
    }
};
export const getProblemById = async (req, res) => {
    try {
        const {id}= req.params;
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        });
        if(!problem){
            return res.status(404).json({
                message: "No problem found by this id",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Problem fetched successfully by their id",
            success: true,
            problem
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching problem by their id",
            success: false
        })
        
    }
};
export const updateProblem = async (req, res) => {
    //id nikalo
    const {id} = req.params;
    try {
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        });
     if(!problem){  
        return res.status(404).json({
            message: "No problem found for updation",
        })
    }
    await db.problem.update({
        where: {
            problemId: id
        },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });
    return res.status(200).json({
        message: "Problem updated successfully",
        success: true,
    })
        
    } catch (error) {
        return res.status(500).json({
                message: "Error updating problem",
        })
        
    }
};
export const deleteProblem = async (req, res) => {
    const {id} = req.params;
    try {
        await db.problem.delete({
            where: {
                id
            }
        });
        return res.status(200).json({
            message: "Problem deleted successfully",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting problem",
        })
    }
};
export const getSolvedProblemsSolvedByUser = async (req, res) => {};
