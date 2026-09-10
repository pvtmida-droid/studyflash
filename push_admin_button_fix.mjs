import { execSync } from "child_process";

try {
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Add Save & Sync Live button in Admin Panel and ensure direct Supabase date persistence"', { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });
  console.log("SUCCESSFULLY PUSHED TO GITHUB!");
} catch (e) {
  console.error("Error:", e.message);
}
