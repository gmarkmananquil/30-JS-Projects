let tasker = ()=>{

    _data = { tasks: [
        { type: "success", date: "Mon, Nov 5", text: "Dashboard project for school"}, 
        { type: "missing", date: "Mon, Nov 5", text: "Dashboard project for school"}, 
        { type: "missing", date: "Mon, Nov 5", text: "Dashboard project for school"} 
    ] };

    $_new = document.querySelector("nav a.new");
    $_modal = document.querySelector(".modal");

    //remove class in classList to show the modal
    document.querySelector(".modal .close").addEventListener("click", () => this.$_modal.classList.remove("show"));

    listTask = () => {
        //list all the task in _data
    }

    newTask = () => {
        console.log("tasker newTask...");
        console.log($_modal);
        $_modal.classList.add("show");
        //show modal
        //clear all fields
        //

    }



    domLoaded = () => {
        console.log("tasker downloaded...");
    }

    function init() {
        console.log("tasker init...");
        addEventListener("DOMContentLoaded", domLoaded);
        $_new.addEventListener("click", newTask);
    }

    init();
}

tasker();