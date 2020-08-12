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
    {
      type: "checkbox",
      message: "What type of licensing should this repo have?",
      name: "license",
      choices: [
        "Apache License",
        "GPL License",
        "MIT License",
        "Public Domain (Unlicensed)"
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

  ## TABLE OF CONTENTS
  -[DESCRIPTION](#DESCRIPTION)  
  -[LICENSE](#LICENSE)  
  -[INSTALLATION](#INSTALLATION)  
  -[TESTS](#TESTS)  
  -[QUESTIONS](#QUESTIONS)  
  -[CONTRIBUTIONS](#CONTRIBUTIONS)

  ## DESCRIPTION
  ${answers.description}

  ## LICENSE
  ${answers.license}
  
  ## INSTALLATION
  ${answers.installation}
  
  ## TESTING
  ${answers.tests}
  
  ## QUESTIONS
  ${answers.question}  
  My GitHub username is *${answers.username}* & my profile can be found [here](https://github.com/${answers.username}) 
  
  ## CONTRIBUTIONS
  ${answers.contribute}  
  I can be readed at ${answers.email} if you have any other questions about this repository.
  `;
  
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

