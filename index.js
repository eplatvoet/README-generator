const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//FUNCTION CONTAINING THE QUESTIONS USER WILL ANSWER
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
        "None"
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

//FUNCTION THAT WILL SET UP THE README.MD DOCUMENT WITH THE USER'S INPUT ADDED THROUGHOUT
function generateMarkdown(answers) {
  return `
  # ${answers.title}  
  ${answers.badge}

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

//CALLING THE PROMPT FUNCTION WHICH WILL LEAD TO THE GENERATE FUNCTION
promptUser()


  .then(function (answers) {
    if (answers.license === "Apache License") {
      answers.badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
    }
    if (answers.license === "GPL License") {
      answers.badge = '[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)'
    }
    if (answers.license === "MIT License") {
      answers.badge = '[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)'
     }
    if (answers.license === "None") {
      answers.badge = {name: "Unlicensed"}
    }
    const markdown = generateMarkdown(answers);
    return writeFileAsync("README.md", markdown)
  })
  .then(function () {
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) {
    console.log(err);
  });

