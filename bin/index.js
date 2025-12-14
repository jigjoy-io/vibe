#!/usr/bin/env node

import prompts from "prompts"
import degit from "degit"
import kleur from "kleur"
import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const TEMPLATES = {
  next: {
    title: "Website (Next.js)",
    repo: "Lotus015/vibecode-next-template",
  },
  spa: {
    title: "Web App (SPA + Database)",
    repo: "Lotus015/vibecode-spa-template",
  },
}

async function main() {
  console.log(kleur.cyan("\n✨ Vibecode\n"))

  // 1. Choose template
  const { template } = await prompts({
    type: "select",
    name: "template",
    message: "What do you want to build?",
    choices: Object.entries(TEMPLATES).map(([key, t]) => ({
      title: t.title,
      value: key,
    })),
  })

  if (!template) {
    console.log(kleur.red("Aborted."))
    process.exit(1)
  }

  // 2. Project name
  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: "Project name:",
    validate: name =>
      name && !fs.existsSync(name)
        ? true
        : "Directory already exists or name is empty",
  })

  if (!projectName) {
    console.log(kleur.red("Aborted."))
    process.exit(1)
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  console.log(kleur.green(`\nCreating "${projectName}"...\n`))

  // 3. Clone template
  const emitter = degit(TEMPLATES[template].repo, {
    cache: false,
    force: true,
    verbose: false,
  })

  try {
    await emitter.clone(targetDir)
  } catch (err) {
    console.error(kleur.red("Failed to clone template"))
    console.error(err)
    process.exit(1)
  }

  // 4. Install deps
  console.log(kleur.green("Installing dependencies...\n"))
  try {
    execSync("pnpm install", {
      cwd: targetDir,
      stdio: "inherit",
    })
  } catch {
    console.error(kleur.red("Dependency installation failed"))
    process.exit(1)
  }

  // 5. Done
  console.log(kleur.green("\n✅ Done!\n"))
  console.log("Next steps:")
  console.log(kleur.cyan(`  cd ${projectName}`))
  console.log(kleur.cyan("  pnpm dev\n"))
  console.log("IMPORTANT:")
  console.log("  Read CLAUDE.md before using any AI coding tool.\n")

  process.exit(0)
}

main().catch((err) => {
  console.error(kleur.red("Unexpected error:"))
  console.error(err)
  process.exit(1)
})
