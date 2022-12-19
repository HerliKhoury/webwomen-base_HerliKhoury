let selectedJobs = [];

function createHeadder(){
    let main = [...document.getElementsByTagName("main")];
    let headder = document.createElement("header");
    let headderDiv = document.createElement("div");
    let summaryDiv = document.createElement("div");
    let logoImg = document.createElement("img");
    let h1 = document.createElement("h1");
    let summaryContent = document.createElement("p");
    let summaryFooter = document.createElement("p");
    let scrolPageBtn = document.createElement("button");

    logoImg.src = "./assets/img/logo.svg";
    logoImg.alt = "women_togheter";
    h1.innerText = "Lugar de mulher é onde ela quiser!";
    summaryContent.innerText = "Está procurando oportunidades de estágio, emprego ou bolsas de estudo? Ou até mesmo oportunidades para atender eventos de tecnologia no Brasil e ao redor do mundo?";
    summaryFooter.innerText = "Confere aqui embaixo o que temos pra você!";
    scrolPageBtn.innerText = "Ir para seção das vagas";

    headder.classList.add("header-image", "flex");
    headderDiv.classList.add("container", "headder-div", "flex-column");
    logoImg.classList.add("logo");
    summaryDiv.classList.add("flex-column", "summary-div");
    h1.classList.add("title-1", "grey-3_c");
    summaryContent.classList.add("text-1", "grey-5_c");
    summaryFooter.classList.add("text-1", "grey-5_c");
    scrolPageBtn.classList.add("to-section_Button");

    summaryDiv.append(h1, summaryContent, summaryFooter);
    headderDiv.append(logoImg, summaryDiv, scrolPageBtn);
    headder.appendChild(headderDiv);
    main[0].appendChild(headder);
}   

function createJobCard(job){
    let jobCardWrap = document.createElement("div");
    let infoDiv = document.createElement("div");
    let companyLocationDiv = document.createElement("div");
    let bottomBtnDiv = document.createElement("div");
    let modalityDiv = document.createElement("div");
    let cardTitle = document.createElement("h4");
    let companyName = document.createElement("p");
    let jobLocation = document.createElement("p");
    let jobDescription = document.createElement("p");
    let applyBtn = document.createElement("button");

    cardTitle.innerText = job.title;
    companyName.innerText = job.enterprise;
    jobLocation.innerText = job.location;
    jobDescription.innerText = job.descrition;
    applyBtn.innerText = "Candidatar";
    applyBtn.id = job.id;

    jobCardWrap.classList.add("grey-6_bg", "flex-column","job-card-wrap-div");
    applyBtn.classList.add("add-remove_Button");
    cardTitle.classList.add("title-4", "grey-1_c");
    companyLocationDiv.classList.add("flex", "company-location-div");
    companyName.classList.add("text-3", "grey-2_c", "job-info_div");
    jobLocation.classList.add("text-3", "grey-2_c", "job-info_div");
    jobDescription.classList.add("text-2", "grey-2_c");
    modalityDiv.classList.add("flex");
    bottomBtnDiv.classList.add("flex", "bottom-btn-div"); 

    applyBtn.addEventListener("click", () => {

        if(applyBtn.innerText === "Candidatar"){
            applyBtn.innerText = "Remover Candidatura";
            selectedJobs.push(job);
            refreshSelectedJobs();

        }else if(applyBtn.innerText === "Remover Candidatura"){
            applyBtn.innerText = "Candidatar";

            selectedJobs.forEach((jobSelected) => {
                if(jobSelected.id === Number(applyBtn.id)){
                    selectedJobs.splice(selectedJobs.indexOf(jobSelected), 1);
                }
            })

            refreshSelectedJobs();
        }
        
        refreshJobsLocalStorage();
    })
  

    job.modalities.forEach((modality) => {
        let jobModality = document.createElement("p");
        jobModality.innerText = modality;
        jobModality.classList.add("job-modality", "grey-3_bg", "grey-2_c", "flex");
        modalityDiv.appendChild(jobModality);
    })

    companyLocationDiv.append(companyName, jobLocation)
    bottomBtnDiv.append( modalityDiv ,applyBtn);
    infoDiv.append(cardTitle, companyLocationDiv)
    jobCardWrap.append(infoDiv, jobDescription,bottomBtnDiv);

    return jobCardWrap;
}

function createShadowDiv(){
    let shadowsDiv = document.createElement("div");
    let shadowOne = document.createElement("div");
    let shadowTwo = document.createElement("div");
    let shadowThree = document.createElement("div");
    let shadowFour = document.createElement("div");
    let shadowsFive = document.createElement("div");
    let shadowsWrap = document.createElement("div");

    shadowOne.classList.add("shadow", "grey-5_bg");
    shadowTwo.classList.add("shadow", "grey-5_bg");
    shadowThree.classList.add("shadow", "grey-5_bg");
    shadowFour.classList.add("shadow", "grey-5_bg");
    shadowsFive.classList.add("shadow", "grey-5_bg");
    shadowsDiv.classList.add("flex-column", "shadows-div");
    shadowsWrap.classList.add("flex", "shadows-wrap");

    shadowOne.style.width = "60%";
    shadowThree.style.width = "40%";
    shadowFour.style.width = "40%";
    shadowsFive.style.width = "20%";

    shadowsWrap.append(shadowThree, shadowFour, shadowsFive);
    shadowsDiv.append(shadowOne, shadowTwo, shadowsWrap);

    return shadowsDiv;
}

function createNoneSelected(){
    let bottomDiv = document.createElement("div");
    let instructions = document.createElement("p");

    instructions.innerText = "Você ainda não aplicou para nenhuma vaga";

    bottomDiv.classList.add("flex-column", "bottom-div");
    instructions.classList.add("text-2", "grey-2_c");

    bottomDiv.append(instructions, createShadowDiv());

    return bottomDiv;
}

function createSelectedDiv(){
    let wrapSelectedDiv = document.createElement("div");
    let topDiv = document.createElement("div");
    let title = document.createElement("h4");
    
    title.innerText = "Vagas Selecionadas";
    
    wrapSelectedDiv.classList.add("flex-column", "grey-6_bg", "wrap-selected-div");
    title.classList.add("title-4", "grey-1_c");

    topDiv.appendChild(title);
    wrapSelectedDiv.append(topDiv,createNoneSelected());

    return wrapSelectedDiv;
}

function createJobsContent(){
    let main = [...document.getElementsByTagName("main")];
    let jobWrapDiv = document.createElement("div");
    let jobOpportunities = document.createElement("div");
    let listDiv = document.createElement("div");
    let selectedOpportunities = document.createElement("div");
    let jobDivTitle = document.createElement("h4");

    jobDivTitle.innerText = "Vagas";
    jobOpportunities.append(jobDivTitle, listDiv);

    jobsData.forEach((jobOfer) => {
        listDiv.append(createJobCard(jobOfer));
    })

    /* adicionar classes */
    jobWrapDiv.classList.add("flex", "container", "job-wrap-div");
    jobDivTitle.classList.add("job-div-title", "title-4", "grey-1_c");
    jobOpportunities.classList.add("job-opportunities-div");
    listDiv.classList.add("flex-column", "list-div");
    selectedOpportunities.classList.add("selected-opportunities");

    /* devidos appends */
    selectedOpportunities.append(createSelectedDiv());
    jobWrapDiv.append(jobOpportunities, selectedOpportunities);
    main[0].appendChild(jobWrapDiv);
}

function createSelectedJobCard(selectedJob){
    let cardJobSelectedDiv = document.createElement("div");
    let jobSelectedTopDiv = document.createElement("div");
    let jobSelectedbottomDiv = document.createElement("div");
    let title = document.createElement("h5");
    let excludeBtn = document.createElement("button");
    let companyName = document.createElement("p");
    let companyLocation = document.createElement("p");

    title.innerText = selectedJob.title;
    companyName.innerText = selectedJob.enterprise;
    companyLocation.innerText = selectedJob.location;
    

    title.classList.add("title-5", "grey-1_c");
    excludeBtn.classList.add("delete-vacant_job-button");
    companyName.classList.add("text-3", "grey-2_c");
    companyLocation.classList.add("text-3", "grey-2_c");
    jobSelectedTopDiv.classList.add("flex", "job-selected-bottom_div");
    jobSelectedbottomDiv.classList.add("flex", "job-selected-bootm");

    excludeBtn.addEventListener("click", () => {
        selectedJobs.indexOf(selectedJob);
        selectedJobs.splice(selectedJobs.indexOf(selectedJob), 1);
        refreshSelectedJobs();

        let applyBtn = document.getElementById(`${selectedJob.id}`);
        applyBtn.innerText = "Candidatar";
        refreshJobsLocalStorage();      
    })

    jobSelectedTopDiv.append(title, excludeBtn);
    jobSelectedbottomDiv.append(companyName, companyLocation);
    cardJobSelectedDiv.append(jobSelectedTopDiv, jobSelectedbottomDiv);

    return cardJobSelectedDiv;
}

function refreshSelectedJobs(){
    let bottomDiv = [...document.getElementsByClassName("bottom-div")]; 
    bottomDiv[0].innerHTML = " ";
    selectedJobs.forEach((element) => {
        bottomDiv[0].appendChild(createSelectedJobCard(element));
    })

    if(selectedJobs.length === 0){
        bottomDiv[0].appendChild(createNoneSelected());
    }

}

createHeadder();
createJobsContent();