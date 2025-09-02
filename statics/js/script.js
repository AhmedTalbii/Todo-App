const Tasks = document.querySelector(".Tasks")
const AddTask = document.querySelector(".add-task");

const modal = `
<div class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <form>
      <input class="userInputTitle" type="text" placeholder="Title" />
      <textarea class="userInputDesc" placeholder="Description"></textarea>
      <button class="submit" type="button"></button>
    </form>
  </div>
</div>
`
const task = `
<div class="Task">
    <div class="TitleDescription">
        <div class="Title"></div>
        <hr>
        <div class="Description">
            <p class="Description-p"></p>
        </div>
    </div>
    <div class="Actions">
        <button type="button"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button"><i class="fa-solid fa-trash"></i></button>
    </div>
</div>
`

class Task {
    constructor(title, description, parent, children) {
        this.title = title;
        this.description = description;
        this.parent = parent;
        this.children = children;
    }

    addTask = () => {
        const template = document.createElement("template");
        template.innerHTML = this.children.trim();
        const newTask = template.content.firstChild;
        newTask.querySelector(".Title").textContent = this.title;
        newTask.querySelector(".Description-p").textContent = this.description;
        this.parent.appendChild(newTask);
    };

    deleteTask = () => {
        this.parent.removeChild(this.children);
    };
}

const Modal = {
    showModal: (buttonText, title="", description="", taskEl=null) => {
        const body = document.querySelector("body");

        const template = document.createElement("template");
        template.innerHTML = modal.trim();
        const modalEl = template.content.firstChild;
        let btnSubmit = modalEl.querySelector(".submit");
        btnSubmit.textContent = buttonText;
        body.appendChild(modalEl);

        modalEl.querySelector(".close").onclick = () => Modal.hideModal();
        modalEl.querySelector(".userInputTitle").value = title;
        modalEl.querySelector(".userInputDesc").value = description;
        btnSubmit.onclick = () => {
            if (buttonText === "Add") {
                let nt = new Task(modalEl.querySelector(".userInputTitle").value,
                    modalEl.querySelector(".userInputDesc").value,
                    document.querySelector(".Tasks"), task);
                nt.addTask();
            } else if (buttonText === "Update") {
                taskEl.querySelector(".Title").textContent =
                    modalEl.querySelector(".userInputTitle").value;
                taskEl.querySelector(".Description-p").textContent =
                    modalEl.querySelector(".userInputDesc").value;
            }
            Modal.hideModal();
        };
    },

    hideModal: () => {
        const modalEl = document.querySelector(".modal");
        if (modalEl) modalEl.remove();
    }
};

AddTask.addEventListener("click", () => {
    Modal.showModal("Add");
});

document.querySelector(".Tasks").addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pen-to-square")) {
        const taskEl = e.target.closest(".Task");
        let title = taskEl.querySelector(".Title").textContent;
        let description = taskEl.querySelector(".Description-p").textContent;
        Modal.showModal("Update", title, description, taskEl);
    }
    if (e.target.classList.contains("fa-trash")) {
        const taskEl = e.target.closest(".Task");
        if (taskEl) taskEl.remove();
    }
});