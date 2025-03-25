document.addEventListener("DOMContentLoaded", function(){
    const applicationsList=document.getElementById("#applications-list")
    console.log(applicationsList)
    const form =document.querySelector("form#job-form")
   // console.log(form)
    form.addEventListener("submit", handleclick);
     
    function handleclick(event){
        event.preventDefault()
        const jobForm ={
jobtitle:event.target.jobtitle.value,
company:event.target.copmany.value,
status:event.target.status.value,

        }
    }
    
})