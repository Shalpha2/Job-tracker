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
        li.innerHTML = `
          <strong>${app.jobtitle}</strong> at ${app.company} — <em>${app.status}</em>
        `;
        li.appendChild(deleteButton),
        applicationsList.appendChild(li);
      });
    }
   
  });

  