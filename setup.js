#!/usr/bin/env node

import { execSync } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import { Command } from "commander";

const program = new Command();

program
    .version("1.0.0")
    .description("CLI to set up a Next.js project from a custom template")
    .argument("<project-name>", "Name of your new project")
    .action(async (projectName) => {
        console.log(chalk.blue(`🚀 Setting up Next.js project: ${projectName}`));

        // Clone the template
        try {
            execSync(
                `git clone https://github.com/Eysteix/my-next-template.git ${projectName}`,
                { stdio: "inherit" }
            );

            console.log(chalk.green("✅ Template cloned successfully!"));

            // Change directory
            process.chdir(projectName);

            // Install dependencies
            console.log(chalk.blue("📦 Installing dependencies..."));
            execSync("npm install --force", { stdio: "inherit" });

            console.log(chalk.green("✅ Dependencies installed!"));

            // Ask user for environment variables
            const answers = await inquirer.prompt([
                { name: "databaseURL", message: "Enter your DATABASE_Name:" },
                { name: "authSecret", message: "Enter your AUTH_SECRET:" },
                {name:"githubClient",message:"Enter Your Github Client ID"}
            ]);

            // Create .env file
            const envLocal = `AUTH_SECRET=${answers.authSecret} GITHUB_CLIENT_ID=${answers.githubClient}`
            const envContent = `DATABASE_URL=postgresql://marvel:marvel0607@localhost:5432/${answers.databaseURL}?schema=public

`;
            fs.writeFileSync(".env", envContent);
            console.log(chalk.green("✅ .env file created!"));
            fs.writeFileSync(".env.local", envLocal);
            console.log(chalk.green("✅ .env.local file created!"));

            // Run Prisma migrations
            console.log(chalk.blue("🔄 Running Prisma migrations..."));
            execSync("npx prisma migrate dev --name init", { stdio: "inherit" });

            console.log(chalk.green("✅ Prisma setup complete!"));

            console.log(chalk.yellow("🚀 Starting development server..."));
            execSync("npm run dev", { stdio: "inherit" });

            console.log(chalk.green("🎉 Your project is ready!"));
        } catch (error) {
            console.error(chalk.red("❌ Error setting up the project:"), error);
        }
    });

program.parse(process.argv);
