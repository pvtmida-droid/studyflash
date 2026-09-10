import { execSync } from "child_process";

try {
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Persist Public Result Date permanently in Supabase database for all public visitors"', { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });
  console.log("SUCCESSFULLY PUSHED TO GITHUB!");
} catch (e) {
  console.error("Error:", e.message);
}
