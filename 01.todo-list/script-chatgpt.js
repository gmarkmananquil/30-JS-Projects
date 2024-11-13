let tasker = () => {

    // Declare _data at the top to make it accessible to all functions, including hoisted ones.
    const _data = {
        tasks: [
            { status: "success", date: "Mon, Nov 5", text: "Your task should appear here..." },
            { status: "success", date: "Mon, Nov 5", text: "Lorem test test" },
            { status: "success", date: "Mon, Nov 5", text: "Moiyot daw" }
        ],
        history: [
            { status: "success", date: "Mon, Nov 5", text: "Dashboard project for school" },
            { status: "missing", date: "Mon, Nov 5", text: "Dashboard project for school" },
            { status: "missing", date: "Mon, Nov 5", text: "Dashboard project for school" }
        ],
        add_task: function (data) {
            _data.tasks.push(data);
        },
        add_hist: function (data) {
            _data.history.push(data);
        },
        display: function () {
            _data.tasks.forEach(e => {
                $_list.innerHTML += _data.list_template(e);
            });
            _data.history.forEach(e => {
                $_hist.innerHTML += _data.hist_template(e);
            });

            //run things after displaying the list
            afterDisplay();
        },
        task_exist: function (task) {
            //check if there is a pending task
            return _data.tasks.some(t => t.text === task && t.status !== "success");
        },
        list_template: function (data) {
            return `
            <div class="list-item">
                <span class="icon-wrapper">
                    <input type="checkbox" class="checklist" name="checklist" />
                </span>
                <span class="text">
                    ${data.text}
                </span>
            </div>`;
        },
        hist_template: function (data) {
            return `
                <li class="hist-item">
                    <span class="date">${data.date}</span>
                    <span class="text">${data.text}</span>
                    <span class="tag ${data.status}">${data.status}</span>
                </li>`;
        }
    };

    // Function declarations (hoisted)
    function afterDisplay() {
        let $_check = document.querySelectorAll(".checklist");
        if ($_check.length > 0) {
            $_check.forEach(e => {
                e.addEventListener("click", doneTask);
            });
        }
    }

    function doneTask(e) {
        console.log("done task was clicked");
        //animate the task to remove
        //remove the task from the list
    }

    function addTask(e) {
        e.preventDefault();
        const text = $_form.elements['text'].value;
        const date = $_form.elements['date'].value;
        const status = $_form.elements['status'].value;

        if (!existTask(text)) {
            _data.add_task({ status, date, text });
            success();
        }
    }

    function existTask(t) {
        return _data.task_exist(t);
    }

    function listTask() {
        clearListDisplay();
        clearHistDisplay();
        _data.display();
    }

    function showModal() {
        $_modal.classList.add("show");
    }

    function domLoaded() {
        console.log("tasker downloaded...");
    }

    function success() {
        //do something after successfully adding        
        $_modal.classList.remove("show");
        listTask();
        clearForm();
    }

    function clearForm() {
        $_form.elements['text'].value = "";
        $_form.elements['date'].value = "";
        $_form.elements['status'].value = "success";
    }

    function clearListDisplay() {
        $_list.innerHTML = "";
    }

    function clearHistDisplay() {
        $_hist.innerHTML = "";
    }

    // DOM elements
    const $_new = document.querySelector("nav a.new");
    const $_modal = document.querySelector(".modal");
    const $_modal_close = document.querySelector(".modal .close");
    const $_hist = document.querySelector(".history ul");
    const $_list = document.querySelector(".list");
    const $_form = document.querySelector(".modal form");

    // Initialize the application
    function init() {
        addEventListener("DOMContentLoaded", domLoaded);

        // Clicking new task
        $_new.addEventListener("click", showModal);

        // Clicking modal close
        $_modal_close.addEventListener("click", () => $_modal.classList.remove("show"));

        // After submit form
        $_form.addEventListener("submit", addTask);

        // Displaying task list
        listTask();
    }

    init();
}

tasker();
