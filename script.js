
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Coimbatore",
        category: "Development",
        type: "Full Time",
        salary: "₹3 - 5 LPA",
        skills: "HTML CSS JavaScript React"
    },
    {
        id: 2,
        title: "Python Developer",
        company: "Innovate Technologies",
        location: "Chennai",
        category: "Development",
        type: "Full Time",
        salary: "₹3 - 4 LPA",
        skills: "Python Django SQL"
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Bangalore",
        category: "Design",
        type: "Internship",
        salary: "₹15,000/month",
        skills: "Figma UI UX Design"
    },
    {
        id: 4,
        title: "Data Analyst",
        company: "DataTech",
        location: "Coimbatore",
        category: "Data",
        type: "Full Time",
        salary: "₹3 - 4 LPA",
        skills: "Python SQL Excel Power BI"
    },
    {
        id: 5,
        title: "Digital Marketing Executive",
        company: "Growth Media",
        location: "Remote",
        category: "Marketing",
        type: "Full Time",
        salary: "₹2 - 3 LPA",
        skills: "SEO Social Media Marketing"
    },
    {
        id: 6,
        title: "React Developer",
        company: "WebCraft",
        location: "Bangalore",
        category: "Development",
        type: "Internship",
        salary: "₹12,000/month",
        skills: "React JavaScript CSS"
    }
];

const jobContainer = document.getElementById("jobContainer");
const jobCount = document.getElementById("jobCount");

let savedJobs = JSON.parse(
    localStorage.getItem("savedJobs") || "[]"
);

let selectedJob = null;

// Display jobs
function displayJobs(jobList) {

    jobContainer.innerHTML = "";

    jobCount.textContent = `${jobList.length} jobs found`;

    if (jobList.length === 0) {
        jobContainer.innerHTML =
            '<p class="no-jobs">No jobs found. Try another search.</p>';
        return;
    }

    jobList.forEach(job => {

        const isSaved = savedJobs.includes(job.id);

        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <span class="job-type">${job.type}</span>

            <h3>${job.title}</h3>

            <p class="company">${job.company}</p>

            <div class="job-info">
                <p>📍 ${job.location}</p>
                <p>💰 ${job.salary}</p>
                <p>💻 ${job.skills}</p>
            </div>

            <div class="card-actions">
                <button class="apply-btn">Apply Now</button>

                <button class="save-btn">
                    ${isSaved ? "♥ Saved" : "♡ Save"}
                </button>
            </div>
        `;

        card.querySelector(".apply-btn").addEventListener(
            "click", () => openModal(job)
        );

        card.querySelector(".save-btn").addEventListener(
            "click", () => toggleSave(job.id)
        );

        jobContainer.appendChild(card);
    });
}

// Search and filter jobs
function filterJobs() {

    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase().trim();

    const locationValue = document
        .getElementById("locationFilter")
        .value;

    const categoryValue = document
        .getElementById("categoryFilter")
        .value;

    const filteredJobs = jobs.filter(job => {

        const searchableText = (
            job.title + " " +
            job.company + " " +
            job.skills
        ).toLowerCase();

        const matchesSearch =
            searchableText.includes(searchValue);

        const matchesLocation =
            !locationValue ||
            job.location === locationValue;

        const matchesCategory =
            !categoryValue ||
            job.category === categoryValue;

        return matchesSearch &&
            matchesLocation &&
            matchesCategory;
    });

    displayJobs(filteredJobs);
}

// Save and remove favourite jobs
function toggleSave(id) {

    if (savedJobs.includes(id)) {
        savedJobs = savedJobs.filter(jobId => jobId !== id);
    } else {
        savedJobs.push(id);
    }

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );

    filterJobs();
}

// Open application form
function openModal(job) {

    selectedJob = job;

    document.getElementById("selectedJob").textContent =
        `Position: ${job.title} at ${job.company}`;

    document.getElementById("applyModal").style.display =
        "flex";
}

// Close application form
function closeModal() {

    document.getElementById("applyModal").style.display =
        "none";
}

// Handle application form
document.getElementById("applicationForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document
            .getElementById("applicantName").value;

        const email = document
            .getElementById("applicantEmail").value;

        alert(
            `Thank you, ${name}!\n` +
            `Your demo application for ${selectedJob.title} ` +
            `has been submitted successfully.\n` +
            `Email: ${email}`
        );

        this.reset();
        closeModal();
    });

// Search automatically when typing
document.getElementById("searchInput")
    .addEventListener("input", filterJobs);

document.getElementById("locationFilter")
    .addEventListener("change", filterJobs);

document.getElementById("categoryFilter")
    .addEventListener("change", filterJobs);

// Initial display
displayJobs(jobs);
