document.addEventListener("DOMContentLoaded", function(){
    const form =document.querySelector("form#job-form")
    console.log(form)
    form.addEventListener("submit", handleclick);
     
    function handleclick(event){
        event.preventDefault()
        const jobForm ={
jobtitle:event.target.jobtitle,value
        }
    }
    
})