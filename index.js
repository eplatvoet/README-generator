const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email associated to your GitHub profile?"
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of the project:"
    },
    //   {
    //     type: "checkbox",
    //     message: "Check which areas will be a part of your README so a 'Table of Contents' can be generated.",
    //     name: "tableOfContents",
    //     choices: [
    //       "Installation",
    //       "Usage",
    //       "License",
    //       "Contributing",
    //       "Tests",
    //       "Questions"
    //     ]
    //   },
    {
      type: "list",
      message: "What type of licensing should this repo have?",
      name: "license",
      choices: [
        "BSD",
        "GPL",
        "MIT",
        "NONE"
      ]
    },
    {
      type: "input",
      name: "installation",
      message: "What commands need to be entered to install dependencies?"
    },
    {
      type: "input",
      name: "tests",
      message: "What commands need to be entered to run tests?"
    },
    {
      type: "input",
      name: "question",
      message: "What does the user need to know about using this repository?"
    },
    {
      type: "input",
      name: "contribute",
      message: "What does the user need to know about contributing to this repository?"
    }
  ]);
}


function generateMarkdown(answers) {
  return `
  # ${answers.title}
  ##TABLE OF CONTENTS
  -DESCRIPTION
  -LICENSE
  -INSTALLATION
  -TESTS
  -QUESTIONS
  -CONTRIBUTIONS
  ##DESCRIPTION
  ${answers.description}
  ##LICENSE
  ${answers.license}
  ##INSTALLATION
  ${answers.installation}
  ##TESTING
  ${answers.tests}
  ##QUESTIONS
  ${answers.question}
  ##CONTRIBUTION
  ${answers.contribute}`;
}

promptUser()
  .then(function(answers) {
    const markdown = generateMarkdown(answers);
    return writeFileAsync("README.md", markdown)
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
.catch(function(err) {
  console.log(err);
});

