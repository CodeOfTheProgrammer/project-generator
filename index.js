#!/usr/bin/env node

const replace = require('replace-in-file');
const emailValidator = require('email-validator');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');

async function getTemplateChoices() {
    return await fs.readdir(path.join(__dirname, 'templates'));
}

async function copyDir(src, dest) {
    await fs.ensureDir(dest);
    await fs.copy(src, dest);
    await fs.chmod(dest, '0755');
}

async function replaceTemplateStrings(projectPath, projectName, emailAddress) {
    const options = {
        files: `${projectPath}/**/*`,
    };

    const replacements = [
        {from: /{{ NAME }}/g, to: projectName},
        {from: /{{ EMAIL }}/g, to: emailAddress},
    ];

    for (const replacement of replacements) {
        await replace({...options, ...replacement});
    }
}

async function createProject ({projectChoice, projectName, emailAddress}) {
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const projectPath = projectName;
    await copyDir(templatePath, projectPath);
    await replaceTemplateStrings(projectPath, projectName, emailAddress);
}

async function generate() {
    const choices = await getTemplateChoices();

    const questions = [
        {
            name: 'projectChoice',
            type: 'list',
            message: 'What project template would you like to generate?',
            choices,
        },
        {
            name: 'projectName',
            type: 'input',
            message: 'Project name:',
            validate: function (input) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'Project name may only include letters, numbers, underscores and hashes.';
            },
        },
        {
            name: 'emailAddress',
            type: 'input',
            message: 'Email:',
            validate: function (input) {
                if (emailValidator.validate(input)) return true;
                else return 'Must be a valid email address format.';
            },
        }
    ];

    const answers = await inquirer.prompt(questions);

    await createProject(answers);
}

generate().catch(error => console.log(error));



