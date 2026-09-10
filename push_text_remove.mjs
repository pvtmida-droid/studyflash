import { execSync } from "child_process";

try {
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Remove Designed for SSC... text paragraph from All India Mega Test card"', { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });
  console.log("SUCCESSFULLY PUSHED TO GITHUB!");
} catch (e) {
  console.error("Error:", e.message);
}
