function refreshJobsLocalStorage(){
    localStorage.setItem("saved-jobs", JSON.stringify(selectedJobs));
}

function catchSavedJobs(){
    const savedJobs = localStorage.getItem("saved-jobs");
    const jobs = JSON.parse(savedJobs);

    if(jobs.lenght != 0){
        selectedJobs = [...jobs];
        refreshSelectedJobs();
       
        selectedJobs.forEach((jobs) => {
            purpleBtn = document.getElementById(jobs.id);
            purpleBtn.innerText = "Remover Candidatura";
        })
    }
}

catchSavedJobs();