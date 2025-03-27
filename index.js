document.addEventListener("DOMContentLoaded", function () {
    const applicationsList = document.getElementById("applications-list");
    const form = document.querySelector("form#job-form");
    
    form.addEventListener("submit", handleSubmit);
  
    let allApplications = [];
  
    fetch("https://job-tracker-s9oa.onrender.com/applications")
      .then((response) => response.json())
      .then((applications) => {
        allApplications = applications;
        renderapplication(allApplications);
      });
  
    function handleSubmit(event) {
      event.preventDefault();
  
      const newApplication = {
        jobTitle: event.target.jobTitle.value,
        company: event.target.company.value,
        status: event.target.status.value,
        notes: event.target.notes.value,
      };
  
      fetch("https://job-tracker-s9oa.onrender.com/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      })
        .then((response) => response.json())
        .then((app) => {
          allApplications.push(app); 
          renderapplication([app]);
          form.reset();
        });
    }
  
    function renderapplication(applications) {
      applications.forEach((app) => {
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
  
        deleteButton.addEventListener("click", () => handleDelete(app.id, li));
        li.innerHTML = `
          <strong>${app.jobTitle}</strong> at ${app.company} — <em>${app.status}</em><br/> 
          <small><strong>Notes: </strong> ${app.notes || "None"}</small>
        `;
        li.appendChild(deleteButton);
        applicationsList.appendChild(li);
      });
    }
  
    function handleDelete(appId, li) {
      fetch(`https://job-tracker-s9oa.onrender.com/applications/${appId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            li.remove();
            allApplications = allApplications.filter((app) => app.id !== appId);
          }
        })
        .catch((error) => console.error("Error deleting application:", error));
    }
  
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-options");
  
    searchInput.addEventListener("input", function () {
      const term = searchInput.value.toLowerCase();
    
      const filtered = allApplications.filter(function (app) {
        return (
          app.jobTitle.toLowerCase().includes(term) ||
          app.company.toLowerCase().includes(term)
        );
      });
      applicationsList.innerHTML = "";
      renderapplication(filtered);
    });
  
    sortSelect.addEventListener("change", () => {
      const sortBy = sortSelect.value;
      const sorted = [...allApplications].sort((a, b) =>{
      return  a[sortBy].localeCompare(b[sortBy])
    });
      applicationsList.innerHTML = "";
      renderapplication(sorted);
    });
  
    
    const scrollToFormBtn = document.getElementById("scroll-to-form-btn");
    if (scrollToFormBtn) {
      scrollToFormBtn.addEventListener("click", () => {
        const formSection = document.getElementById("form-section");
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
  
                        