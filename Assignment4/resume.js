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
            <input type="url" id="schoolLogo" name="schoolLogo">
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
    document.getElementById("schoolLogo").addEventListener("input", function() {
        document.getElementById("schoolLogoOutput").textContent = this.value;
      });
      document.getElementById("schoolName").addEventListener("input", function() {
        document.getElementById("schoolNameOutput").textContent = this.value;
      });
      document.getElementById("graduationDate").addEventListener("input", function() {
        document.getElementById("graduationDateOutput").textContent = this.value;
      });
      document.getElementById("degree").addEventListener("input", function() {
        document.getElementById("degreeOutput").textContent = this.value;
      });
      document.getElementById("fieldOfStudy").addEventListener("input", function() {
        document.getElementById("fieldOfStudyOutput").textContent = this.value;
      });
      document.querySelector('.nested-button').addEventListener('click', function() {
        console.log("education Entry");
    })
}

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

    });
    document.querySelector('.nested-button2').addEventListener('click', function() {
        console.log("Job Entry");

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
        console.log(skillsInfo.lastElementChild);
        if (skillsInfo.lastElementChild) {
            skillsInfo.removeChild(skillsInfo.lastElementChild);
        }
    });
    document.querySelector('.nested-button2').addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Skill Entry");
        const skillName = document.getElementById('skillName').value;
        const skillProficiency = document.getElementById('skillDropDown').value;

        const skillsInfo = document.getElementById('skillsInfo');
        const newSkill = document.createElement('div');
        newSkill.classList.add('info-group');
        newSkill.innerHTML = `
            <p>${skillName}</p>
            <p>${skillProficiency}</p>
        `;
        skillsInfo.appendChild(newSkill);

    });

    
}
