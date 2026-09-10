import { execSync } from "child_process";

try {
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Fix Public Result Date server sync, date formatting, and countdown timer"', { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });
  console.log("SUCCESSFULLY PUSHED TO GITHUB!");
} catch (e) {
  console.error("Error:", e.message);
}
