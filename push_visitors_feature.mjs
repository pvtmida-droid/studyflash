import { execSync } from "child_process";

try {
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Add Real-Time Live Online Visitor Counter & Analytics badge in Admin Panel"', { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });
  console.log("SUCCESSFULLY PUSHED TO GITHUB!");
} catch (e) {
  console.error("Error:", e.message);
}
