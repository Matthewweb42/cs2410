# Input Section Requirements

## Menu Bar
- Fixed at the top of the screen. Should appear even when scrolling down the page.
- Has a title
- Has four buttons:
  - Contact Info
  - Education
  - Work Experience
  - Skills
- When one of the four buttons is clicked, an appropriate edit/add section appears at the top of the screen (above the resume).
- Only one entry section should appear at a time. For example, if contact info was being added and then the education button is hit, the contact info fields should all disappear and only the education fields should be there.

### Tips on Hiding Elements
- There is an attribute called `hidden` that is true by default. You can set it to false to prevent it from showing.
  ```javascript
  myDiv.hidden = true;
  myDiv.hidden = false;
  ```
- When hiding a Flexbox it doesn't work the same. In this case you'll need to change the display value, which is part of the style (since you defined it in CSS)
  ```javascript
  myDiv.style.display = "none";
  myDiv.style.display = "flex";
  ```
- We will be covering this more next Unit, so it's ok if this doesn't make complete sense yet.

## Contact Info
- Edits the contact info
- Existing values should appear in text fields that can be edited
- Resume values should be updated with each click on the keyboard

### Info
- Name
- Address (street, city, state, zip code)
- Email Address
- Phone Number

## Education
- Empty fields to add:
  - School logo (add a url to an existing image online)
  - School Name
  - Graduation Date
  - Degree
  - Field of Study
- Add button to create the new entry in the Education section of the resume

## Work Experience
- Delete button to remove the last entry in the resume's Work Experience section.
- Empty fields to add:
  - Company Name
  - Job Title
  - Start Date
  - End Date (leave empty if still working there)
  - Responsibilities (A few sentences describing your work)
- Add button to create the new entry in the Work Experience section of the resume

## Skills
- Delete button to remove the last entry in the resume's Skills section.
- Empty fields to add:
  - Name of skill
  - Dropdown Options: Novice, Proficient, Expert
- Add button to create the new entry in the Skills section of the resume

## Contact Info
- Include a profile picture. Does not have to be editable (can include the image file in your program)
- Appropriate sizing and organization
- Remember, this should update on-the-fly as the contact info is edited
- You should have information in here by default when your program starts

## Education
- Your Jr. High and High School information should be present (can be fake).
- Each entry should be on a card
- All cards should be the exact same size
- Card should include:
  - School logo (add a url to an existing image online)
  - Use original aspect ratio, but fit inside a specific area on the card
  - School Name
  - Graduation Date
  - Degree
  - Field of Study
- Cards should be organized in a row and should wrap to the next row if there are too many to fit on the screen
- When a card is clicked it should be removed

## Work Experience
- Should start with three entries
- Each entry should include:
  - Company Name
  - Job Title
  - Start Date
  - End Date (leave empty if still working there)
  - Responsibilities (A few sentences describing your work)
- Work Experience entries should each fill a row (the description should be able to reach the end of the row and wrap.
- New entries should just be added to the bottom of the section

## Skills
- Start with at least 6 skills
- A skill can be anything. Ex: programming languages, martial arts, spoken languages, talents, etc.
- Each entry should include:
  - Name of skill
  - Level: Novice, Proficient, Expert
- Example entries:
  - Python (Proficient)
  - Knitting (Expert)

## Organization
- Each row should have up to four entries spaced nicely
- The entries should like up vertically as well like a grid
- Do not use an html table, but instead use something you learned this unit!

## Styling
- Your resume should be styled and look good. I recognize that looking good is an entirely subjective measurement and I won't be too picky. Every element should have formatting (don't use defaults). Here are things to remember:
  - Spacing
  - Color (fonts and backgrounds)
  - Use coolors.co to find things that match!
  - However, you will not be graded on your color picks
  - Don't have plain white backgrounds!
  - Images
  - Font Family
  - Display & Position
  - Flexbox
  - Boxes in Boxes!!!
  - You should have a bunch of Flexboxes
    - The whole page
    - The input section
    - Each resume section
    - Each card in the resume section
    - Etc.

## Hints
- This is one of those assignments where you get out what you put into it. Spend some time with as many different CSS properties as you can so that you can understand how they work.

## Demo
- Coming

## Penalties
- Formatting
  - CSS and HTML should be clean and easy to read like in previous assignments. A 1-10% penalty will be assessed if code has formatting issues.
- Hacks
  - With CSS there are a lot of ways to do certain things but many of them wrong: for example a CSS property of `margin-left: 478px` will probably make something look pretty close to center of the screen (until you resize the screen). You should be using the correct property for what you want to accomplish (using the flex system is a much better way of centering something). A 5% penalty will be assessed for each hack.

## Submit
- You should zip up your ENTIRE project folder. Please make sure to zip the entire folder and not just the contents of the folder. Upload your submission to Canvas. Keep in mind, it might take a minute to upload and submit so if you are submitting right at the due time you will be in trouble.