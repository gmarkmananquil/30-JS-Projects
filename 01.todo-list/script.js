let tasker = () => {

    const _data = {
        tasks: [
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here. dsfdsfdfs dfdsf sdfsd dsfdsf dsfdsfds dsfsdfsfsd.."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 0, date_done: null, date: "11/10/2024", text: "Your task should appear here..."},
            { status: 1, date_done: "11/12/2024", date: "11/12/2024", text: "Yesterdays task"},
            { status: 1, date_done: "11/12/2024", date: "11/11/2024", text: "Haircut"},
        ],
        /* crud */
        add_task: (obj) => {
            _data.tasks.push(obj);
        },
        display: () => {
            _data.tasks.forEach(   e => e.status == 1 ? "" : $_list.innerHTML += _data.list_template(e));
            _data.tasks.forEach( e => e.status == 0 ? "" : $_hist.innerHTML += _data.hist_template(e));
            
            //run things after displaying the list
            afterDisplay();
        },
        task_exist: (task) => {
            //check if there is a pending task
            return _data.tasks.some( t => t.text === task && t.status == 0);
        },
        list_template: (data) => {
            const date = formatDate(data.date);
            return `
            <div class="list-item">
                <span class="icon-wrapper">
                    <input type="checkbox" class="checklist" name="checklist" data-status="${data.status}" data-text="${data.text}" data-date="${data.date}" />
                </span>
                <span class="text">${data.text}</span>
                <span class="date">${date}</span>
            </div>`;
        },
        hist_template: (data) => {  
            const date = formatDate(data.date);
            const done = formatDate(data.date_done);
            const status = isTaskSuccess(data) ? "success" : "missing";
            return `
                <li class="hist-item">
                    <span class="date">${date}</span>
                    <span class="date ${status}">${done}</span>
                    <span class="text">${data.text}</span>
                    <span class="tag ${status}">${status}</span>
                </li>`;  
        }
    };    
        
    const afterDisplay = () => {
        let $_check  = document.querySelectorAll(".checklist");
        if($_check.length > 0){
            $_check.forEach(e => {
                e.addEventListener("click", doneTask)
            });
        } 
    };

    const doneTask = (e) => {
        console.log("done task was clicked");
        //animate the task to remove
        const x = e.target.dataset;
        let f = _data.tasks.find((task) =>  task.status == x.status && task.text == x.text);
        console.log(f)
        if(!f) return;
        f.status = 1;
        f.date_done = formatDate(new Date());

        listTask();
        console.log(_data.tasks)
        
    };

    const addTask = (e) => {
        e.preventDefault();
        const text = $_form.elements['text'].value;
        const date = formatDate($_form.elements['date'].value);
        const status = 0;

        if(!existTask(text)){
            _data.add_task({status, date, text});
            success();
        } 

    };

    const existTask = (t) => {
        return _data.task_exist(t);
    };

    const listTask = () => {
        clearListDisplay();
        clearHistDisplay();
        _data.display();
    };

    const showModal = () => {
        $_modal.classList.add("show");
    };

    const domLoaded = () => {
        console.log("tasker downloaded...");
    }

    const success = () => {
        //do something after successful adding        
        $_modal.classList.remove("show");
        listTask();
        clearForm();
    }

    const clearForm = () => {
        $_form.elements['text'].value = "";        
    }

    const clearListDisplay = () => {
        $_list.innerHTML = "";
    }

    const clearHistDisplay = () => {
        $_hist.innerHTML = "";
    }

    const formatDate = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString('en-US', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});
    }

    const isTaskSuccess = (task) => {
        const d1 = new Date(task.date);
        const d2 = new Date(task.date_done);
        return d2 <= d1;
    }

    const $_new         = document.querySelector("nav a.new");
    const $_modal       = document.querySelector(".modal");
    const $_modal_close = document.querySelector(".modal .close");
    const $_hist        = document.querySelector(".history ul");
    const $_list        = document.querySelector(".list");
    const $_form        = document.querySelector(".modal form");

    addEventListener("DOMContentLoaded", domLoaded);

    //clicking new task
    $_new.addEventListener("click", showModal);

    //clicking modal close
    $_modal_close.addEventListener("click", () => $_modal.classList.remove("show"));

    //after submit form
    $_form.addEventListener("submit", addTask);

    //displaying tasklist
    listTask();
    
}

tasker();