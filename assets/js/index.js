
const { fstat } = require('fs');
const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;


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


function writeToFile(data) {
    fstat.writeFile(`./dist${data.filename}.md`, generateREADME(data), (err) =>
        err ? console.error(err) : console.log("ReadMe has been created")
    );
}


const init = () => {
    promptUser()
        .then((data) => {
            console.log(data)
            writeFile('README.md', generateREADME(data))
        })
        .then(() => console.log('Successfully wrote to README.md'))
};


init();


const licenseBadge = (license) => {
    if (license === "MIT") {
        return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    }
    else if (license === "Apache 2.0") {
        return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    }
    else if (license === "BSD 3") {
        return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
    }
    else (license === "None")
    return ``
};


const generateREADME = (data) => {
    return `# ${data.projectName}

## Table of Contents  
1. [Description](#description)
    
2. [GitHub Username](#name)
    
3. [Email](#email) 
    
4. [Licenses](#license)
    
5. [Dependencies](#dependencies)
    
6. [Command](#command)
    
7. [Information](#repo)
    
8. [Contribution](#contribution)
    

## Description
${data.description}

## Github
${data.name}

## Email
${data.email}

## Licenses
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