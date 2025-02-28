/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Ensure the output directory exists
const apiRefDir = path.join(__dirname, "../content/api-reference");
if (!fs.existsSync(apiRefDir)) {
  fs.mkdirSync(apiRefDir, { recursive: true });
}

// Generate the API reference docs using TypeDoc
console.log("Generating API reference documentation...");
try {
  execSync("npx typedoc", { stdio: "inherit" });
  console.log("Post-processing complete.");
} catch (error) {
  console.error("Error generating API reference documentation:", error);
}
