import { execSync } from "child_process";

try {
  console.log("Adding files to git...");
  execSync("git add .", { stdio: "inherit" });

  console.log("Committing changes...");
  execSync('git commit -m "Update All India Live Test with 100 questions"', { stdio: "inherit" });

  console.log("Pushing to GitHub (origin main)...");
  execSync("git push origin main", { stdio: "inherit" });

  console.log("🎉 Successfully pushed to GitHub!");
} catch (err) {
  console.error("Error during git push:", err.message);
}
