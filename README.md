# Exercise: John Doe's Resume

!NOTE! The "Jon Doe" is a placeholder for your first and last names.

## Introduction

In this activity, you will create a basic resume webpage using HTML. This activity will demonstrate that by understanding the fundamentals of HTML, you can construct actual web pages!


Make sure to watch the [INTRO VIDEO](https://www.loom.com/share/7dc80d1a15f74d718dba51ed8490cacd?sid=40bfa1ba-526c-49b2-993f-7822deb6f731) before you start.

## Learning objectives

This assignment should prove that a student is able to:

- Create an index.html file in VSCode.
- Add the HTML Boilerplate to the HTML document.
- Update the document title through the `title` tag content.
- Create the page main heading with the `h1` tag.
- Create an image element with the `img` tag.
- Set the required `src` and important `alt` image attributes.
- Set a relative/absolute image `src` attribute value.
- Create a paragraph of text with the `p` tag.
- Create section headings with the `h2` tags.
- Create an ordered list of items with the `ol` and `li` tags.
- Create an unordered list of items with the `ul` and `li` tags.
- Create a table with the `table` tag.
- Utilize `th` tag to create a table header cell.
- Utilize `td` tag to create a table data cell.
- Set a link with the `a` tag.
- Utilize the anchor `target` attribute to open the destination resource it in a new tab.
- Set the link that starts the default email client by a click with the `mailto:` `href` attribute value.
- Add global attributes to HTML elements.
- Utilize the `link` tag to connect a css file.
- Utilize the `script` tag to connect a js file.

## Standard requirements

- [x] Fork the project to your github account
- [x] Clone the project to your computer
- [x] Open the project in VSCode with `code <cloned_repo_folder_name>`
- [ ] Initialize playwright and install project packages
  - [x] Use `npm i` to install packages
  - [x] Use `npm run browser-install` to install the browser environment for testing 
- [ ] All the tasks of the "Specific requirements" section MUST be solved
- [ ] All the tests MUST pass. Fix any errors before you submit (acceptance criteria).
  - [ ] Use `npm run test` to run all tests in the terminal
  - [ ] Use `npm run test-part1` to run the tests for the first part of specific requirements in the terminal
  - [ ] Use `npm run test-part2` to run the tests for the second part of specific requirements in the terminal
  - [ ] (Optional) Use `npm run test-ui` to run all the tests with GUI
  - [ ] (Optional) Use `npm run show-report` to see the latest report in the browser
- [ ] VSCode IDE MUST have 0 code problems listed (spelling problems are fine)
- [ ] The code MUST be formatted with Prettier
- [ ] Push the changes to the Github repo, when finished.
- [ ] Submit a .txt file with the Github repo url.

## Specific requirements

### Part 1: Setting up HTML elements

All the tasks in the requirements are related to the index.html file! Consider "Jon Doe" to be replaced with your real first and last name.

- [x] Create an html file with the name of "index" in the root of the project
- [x] Add HTML Boilerplate to the document
- [x] Set the document title to be "Jon Doe's resume".
- [x] Set the page heading to be "Jon Doe"
- [x] Add a section heading with the content of "Talented Frontend developer" that represents the desired role.
- [x] Add an image with required and important attributes
  - [x] The image path should be `./assets/avatars/fake_person.jpg`. This image is included into the project already.
  - [x] The image alternative text should match the page title.
- [x] Add a section heading with the content of "About Me".
- [x] Add a paragraph of text (50 words at least) as the John Doe's bio. You can use random text for the paragraph content.
- [x] Add the section heading "My Skills"
- [x] Add the ORDERED list and add 6 random item into it. (Feel free to use the devslopes website to get the real skill names or use some random skill names)
- [x] Add the section heading "My Hobbies"
- [x] Add the UNORDERED list of 4 hobbies
- [x] Add the section heading "Contact Me"
- [x] Add the table of two columns and 4 rows. The first column for every row is the table header with the service name. The second column is for the value.
- [x] Add Discord as a service and your discord's real username as a value to the table.
- [x] Add LinkedIn as a service and your linkedIn's real username as a value to the table. Make the value to be a link to your LinkedIn profile page opened in a new tab.
- [x] Add Email as a service and your real email as the value. Make it to be a link that starts the new email message app.
- [x] Add Github as a service and use your real github username as a value. Make the value to be a link that leads to your github profile in a new browser tab.
- [x] Check the result mockup to make sure your page looks EXACTLY as the mockup (/assets/images/p1-solved-mockup.png).

### Part 2: Testing the magic of id and class attributes

- [x] In the head section connect the CSS file, available by the following path: `./css/styles.css`.
- [x] In the head section connect a JS file, available by the following path: `./js/scripts.js`. Make sure it will be executed after the html is parsed.
- [x] The page heading should have the id of "candidate-name"
- [x] The desired role section heading should the id of "candidate-desired-role"
- [x] The "About me" section heading should have an id of "about-me".
- [x] The image should have the id of "candidate-image"
- [x] The bio paragraph should have a class name of "candidate-bio"
- [x] The skills section heading should have the id of "skills"
- [x] The skills list should have the id of "skills-list"
- [x] The Hobbies section heading should have the id of "hobbies"
- [x] The hobbies list should have the id of "hobbies-list"
- [x] The contacts section heading should have the id of "contacts"
- [x] The contacts table should have a class name of "contacts-table".
- [x] The body should have a class name of "fancy-body".
- [x] Check the result mockup to make sure your page looks EXACTLY as the mockup (/assets/images/p2-solved-mockup.png).
