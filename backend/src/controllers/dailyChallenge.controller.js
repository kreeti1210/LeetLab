import { db } from "../libs/db.js";
import { redisClient } from "../libs/redis.js";

export const getDailyChallenge = async (req, res) => {
  try {
    const cachedChallenge = await redisClient.get("daily_challenge");

    if (cachedChallenge) {
      console.log("Serving daily challenge from Redis");
      return res.status(200).json(JSON.parse(cachedChallenge));
    }

    console.log("Generating new daily challenge");

    const problems = await db.problem.findMany();

    const randomProblem = problems[Math.floor(Math.random() * problems.length)];

    await redisClient.set("daily_challenge", JSON.stringify(randomProblem), {
      EX: 60 * 60 * 24, // 24 hours
    });

    return res.status(200).json(randomProblem);
  } catch (error) {
    console.error("Daily challenge error:", error);
    res.status(500).json({ message: "Error generating daily challenge" });
  }
};
