document.getElementById('contactInfoBtn').addEventListener('click', function() {
    showSection('contactInfoSection');
    createContactInfoForm();

});

document.getElementById('educationBtn').addEventListener('click', function() {
    showSection('educationSection');
    createEducationForm();

});

document.getElementById('workExperienceBtn').addEventListener('click', function() {
    showSection('workExperienceSection');
    createWorkExperienceForm();
});

document.getElementById('skillsBtn').addEventListener('click', function() {
    showSection('skillsSection');
    createSkillsForm();
});






function showSection(sectionId) {
    const sections = document.querySelectorAll('#inputSection > section');
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
            <input type="text" id="name" name="name" value="Matthew Webecke" required>
            <label for="address">Address:</label>
            <input type="text" id="address" name="address" value="447 Tough Luck Lane" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="Notanemail@haha.com" required>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value="801-867-5309" required>
        </form>
    `;

      document.getElementById("name").addEventListener("input", function() {
        document.getElementById("nameOutput").textContent = this.value;
      });
      document.getElementById("address").addEventListener("input", function() {
        document.getElementById("addressOutput").textContent = this.value;
      });
      document.getElementById("email").addEventListener("input", function() {
        document.getElementById("emailOutput").textContent = this.value;
      });
      document.getElementById("phone").addEventListener("input", function() {
        document.getElementById("phoneOutput").textContent = this.value;
      });
}
    

function createEducationForm(){
    const section = document.getElementById('educationSection');
    section.innerHTML = `
        <form>
            <label for="schoolLogo">School Logo:</label>
            <input type="url" id="schoolLogoInput" name="schoolLogo">
            <label for="schoolName">School Name:</label>
            <input type="text" id="schoolName" name="schoolName" required>
            <label for="graduationDate">Graduation Date:</label>
            <input type="date" id="graduationDate" name="graduationDate" required>
            <label for="degree">Degree:</label>
            <input type="degree" id="degree" name="degree" required>
            <label for="fieldOfStudy">Field of Study:</label>
            <input type="text" id="fieldOfStudy" name="fieldOfStudy" required>
            <button id="educationEntry" class="nested-button" type="newEntry">New Entry</button>
        </form>
    `;

      document.querySelector('.nested-button').addEventListener('click', function(event) {
        event.preventDefault();
        const schoolLogo = document.getElementById('schoolLogoInput').value;
        const schoolName = document.getElementById('schoolName').value;
        const graduationDate = document.getElementById('graduationDate').value;
        const degree = document.getElementById('degree').value;
        const fieldOfStudy = document.getElementById('fieldOfStudy').value;

        const educationContainer = document.getElementById('educationContainer');
        const newEducation = document.createElement('div');
        newEducation.classList.add('education-card');
        newEducation.innerHTML = `
            <div class="info-group">
                <img id="schoolLogo" src="${schoolLogo}" alt="School Logo" required/>
            </div>
            <div class="info-group">
                <p required id="schoolNameOutput">${schoolName} </p>
            </div>
            <div class="info-group">
                <label for="graduationDateOutput">Graduation Date:</label>
                <p id="graduationDateOutput">${graduationDate}</p>
            </div>
            <div class="info-group">
                <p id="degreeOutput">${degree}</p>
            </div>
            <div class="info-group">
                <p id="fieldOfStudyOutput">${fieldOfStudy}</p>
            </div>
        `;
        newEducation.addEventListener('click', function() {
            educationContainer.removeChild(newEducation);
        });
        educationContainer.appendChild(newEducation);
    });
    
}

const existingCards = document.querySelectorAll('.education-card');
existingCards.forEach(card => {
    card.addEventListener('click', function() {
        card.parentElement.removeChild(card);
    });
});
function createWorkExperienceForm(){
    const section = document.getElementById('workExperienceSection');
    section.innerHTML = `
        <form>
            <button type="deleteEntry" class="nested-button1" >Delete Last</button>
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
            <button type="jobEntry" class="nested-button2" >New Entry</button>

        </form>
        
    `;

    document.getElementById("companyName").addEventListener("input", function() {
        document.getElementById("companyOutput").textContent = this.value;
    });
    document.getElementById("jobTitle").addEventListener("input", function() {
        document.getElementById("positionOutput").textContent = this.value;
    });
    document.getElementById("startDate").addEventListener("input", function() {
        document.getElementById("startOutput").textContent = this.value;
    });
    document.getElementById("endDate").addEventListener("input", function() {
        document.getElementById("endOutput").textContent = this.value;
    });
    document.getElementById("responsibilities").addEventListener("input", function() {
        document.getElementById("tasksOutput").textContent = this.value;
    });

    document.querySelector('.nested-button1').addEventListener('click', function() {
        console.log("Job Deletion");
        
        const workExperienceInfo = document.getElementById('workExperienceInfo');
        if (workExperienceInfo.lastElementChild) {
            workExperienceInfo.removeChild(workExperienceInfo.lastElementChild);
        }
    });

    document.querySelector('.nested-button2').addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Job Entry");

        const companyName = document.getElementById('companyName').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const responsibilities = document.getElementById('responsibilities').value;

        const workExperienceInfo = document.getElementById('workExperienceInfo');
        const newWorkExperience = document.createElement('div');
        newWorkExperience.classList.add('info-group');
        newWorkExperience.innerHTML = `
            <p>${companyName}</p>
            <p>${jobTitle}</p>
            <p>${startDate}</p>
            <p>${endDate}</p>
            <p>${responsibilities}</p>
        `;
        workExperienceInfo.appendChild(newWorkExperience);
    });
}

function createSkillsForm(){
    const section = document.getElementById(`skillsSection`);
    section.innerHTML = `
        <form>
            <button type="button" class="nested-button1">Delete Last</button>
            <div class="form-group">
                <label for="skillName">Skill Name:</label>
                <input type="text" id="skillName" name="skillName" required>
            </div>
            <div class="form-group">
                <label for="skillDropDown">Proficiency:</label>
                <select id="skillDropDown" name="options">
                    <option value="novice">Novice</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Expert">Expert</option>
                </select>
            </div>
            <button type="button" class="nested-button2">Insert Skill</button>
        </form>
    `;

    document.querySelector('.nested-button1').addEventListener('click', function(event) {
        event.preventDefault();
        const skillsInfo = document.getElementById('skillsContainer');
        if (skillsInfo.lastElementChild) {
            skillsInfo.removeChild(skillsInfo.lastElementChild);
        }
    });
    document.querySelector('.nested-button2').addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Skill Entry");
        const skillName = document.getElementById('skillName').value;
        const skillProficiency = document.getElementById('skillDropDown').value;

        const skillsContainer = document.getElementById('skillsContainer');
        const newSkill = document.createElement('div');
        newSkill.classList.add('info-group');
        newSkill.innerHTML = `
            <p>${skillName}</p>
            <p>${skillProficiency}</p>
        `;
        skillsContainer.appendChild(newSkill);

    });

    
}
