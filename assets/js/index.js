// TODO: Include packages needed for this application
const { fstat } = require('fs');
const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;

// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your GitHub username?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter your email address',
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'What is your projects name?',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Please write a short description of your project',
            },
            {
                type: 'list',
                name: 'license',
                message: 'What kind of license should your project have?',
                choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
            },
            {
                type: 'input',
                name: 'dependencies',
                message: 'What command should be ran to install dependencies?',
            },
            {
                type: 'input',
                name: 'command',
                message: 'What command should be ran to run tests?',
            },
            {
                type: 'input',
                name: 'repo',
                message: 'What does the user need to know about using the repo?',
            },
            {
                type: 'input',
                name: 'contribution',
                message: 'What does the user need to know about contributing to the repo?',
            },
        ])
};

// TODO: Create a function to write README file
function writeToFile(data) {
    fstat.writeFile(`./dist${data.filename}.md`, generateREADME(data), (err) =>
        err ? console.error(err) : console.log("ReadMe has been created")
    );
}

// TODO: Create a function to initialize app
const init = () => {
    promptUser()
        .then((data) => {
            console.log(data)
            writeFile('README.md', generateREADME(data))
        })
        .then(() => console.log('Successfully wrote to README.md'))
};

// Function call to initialize app
init();
// promptUser();
const licenseBadge = (license) => {
    if (license === "MIT") {
        return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    }
    else if (license === "Apache 2.0") {
        return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    }
    else if (license === "GPL 3.0") {
        return ``
    }
    else if (license === "BSD 3") {
        return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
    }
    else (license === "None")
    return ``
};


const generateREADME = (data) => {
    return `# ${data.projectName}


<br>
    # Table of Contents
    <br>
    1. [Description](#description)
    <br>
    2. [GitHub Username](#name)
    <br>
    3. [Email](#email)
    <br>
    4. [Description](#description)
    <br>
    5. [Licenses](#license)
    <br>
    6. [Dependencies](#dependencies)
    <br>
    7. [Command](#command)
    <br>
    8. [Information](#repo)
    <br>
    9. [Contribution](#contribution)
    <br>

## Description
${data.description}

## Github
${data.name}

## Email
${data.email}

## Description
${data.description}

## Licenses
${data.license}
${licenseBadge(data.license)}

## Dependencies
${data.dependencies}

## Command
${data.command}

## Information
${data.repo}

## Contribution
${data.contribution}
`
}