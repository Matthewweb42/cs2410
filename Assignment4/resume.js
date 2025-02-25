document.getElementById('contactInfoBtn').addEventListener('click', function() {
    showSection('contactInfoSection');
});

document.getElementById('educationBtn').addEventListener('click', function() {
    showSection('educationSection');
});

document.getElementById('workExperienceBtn').addEventListener('click', function() {
    showSection('workExperienceSection');
});

document.getElementById('skillsBtn').addEventListener('click', function() {
    showSection('skillsSection');
});

createContactInfoForm();
createEducationForm();
createWorkExperienceForm();
createSkillsForm();

document.getElementById('educationEntry').addEventListener('click', function() {
    console.log("HELLOW");
})

function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

function createContactInfoForm(){
    const section = document.getElementById('contactInfoSection');
    section.innerHTML = `
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="address">Address:</label>
            <input type="text" id="" name="address" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required>
        </form>
    `;
}

function createEducationForm(){
    const section = document.getElementById('educationSection');
    section.innerHTML = `
        <form>
            <label for="schoolLogo">School Logo:</label>
            <input type="url" id="schoolLogo" name="schoolLogo">
            <label for="schoolName">School Name:</label>
            <input type="text" id="schoolName" name="schoolName" required>
            <label for="graduationDate">Graduation Date:</label>
            <input type="date" id="graduationDate" name="graduationDate" required>
            <label for="degree">Degree:</label>
            <input type="degree" id="degree" name="degree" required>
            <label for="fieldOfStudy">Field of Study:</label>
            <input type="text" id="fieldOfStudy" name="fieldOfStudy" required>
            <button id="educationEntry" type="newEntry">New Entry</button>
        </form>
    `;
}

function createWorkExperienceForm(){
    const section = document.getElementById('workExperienceSection');
    section.innerHTML = `
        <form>
            <button type="deleteEntry">Delete Last</button>
            <label for="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" required>
            <label for="jobTitle">Job Title:</label>
            <input type="text" id="jobTitle" name="jobTitle" required>
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" required>
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" placeholder="Present">
            <label for="respnsibilities">Responsibilities:</label>
            <textarea id="responsibilities" name="responsibilities" required></textarea>
            <button type="newEntry">New Entry</button>

        </form>
        
    `;
}

function createSkillsForm(){
    const section = document.getElementById(`skillsSection`);
    section.innerHTML = `
        <form>
            <button type="deleteEntry">Delete Last</button>
            <label for="skillName">Skill Name:</label>
            <input type="text" id="jobTitle" name="jobTitle" required>
            <select id="skillDropDown" name="options">
                <option value="novice">Novice</option>
                <option value="novice">Proficient</option>
                <option value="novice">Expert</option>
            </select>
            <button type="newEntry">New Entry</button>
        </form>
    `
    
}   

