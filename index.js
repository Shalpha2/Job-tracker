document.addEventListener("DOMContentLoaded", function () {
    const applicationsList = document.getElementById("applications-list");
    const form = document.querySelector("form#job-form");
 // console.log(form)
    form.addEventListener("submit", handleSubmit);
  
    fetch("http://localhost:3000/applications")
      .then((response) => response.json())
      .then((applications) => {
        renderapplication(applications);
      });
  
    function handleSubmit(event) {
      event.preventDefault();
  
      const newApplication = {
        jobtitle: event.target.jobTitle.value,
        company: event.target.company.value,
        status: event.target.status.value,
        notes: event.target.notes.value,
      };
  
      
      fetch("http://localhost:3000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      })
        .then((response) => response.json())
        .then((app) => {
          renderapplication(app); 
          form.reset(); 
        });
    }
  
    function renderapplication(applications) {
      applications.forEach((app) => {
        const li = document.createElement("li");
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px",
        deleteButton.addEventListener("click", handleDelete)
        li.innerHTML = `
          <strong>${app.jobTitle}</strong> at ${app.company} — <em>${app.status}</em>
        `;
        li.appendChild(deleteButton),
        applicationsList.appendChild(li);
      });
    }
   
    function handleDelete(appId, li) {
        fetch(`http://localhost:3000/applications/${appId}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              li.remove(); // Remove from DOM if delete is successful
            }
          })
          .catch((error) => console.error("Error deleting application:", error));
      }
      
  });

  