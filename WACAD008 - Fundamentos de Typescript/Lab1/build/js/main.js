class FullList {
    constructor() {
        this.items = [];
        this.nextID = 1;
    }
    addItem(title, description, dueDate) {
        const newItem = {
            id: this.nextID,
            title: title,
            description: description,
            created: new Date(),
            dueDate: dueDate,
            checked: false,
        };
        this.items.push(newItem);
        this.nextID++;
    }
    toggleChecked(id) {
        const item = this.items.find((l) => l.id === id);
        if (item) {
            item.checked = !item.checked;
            return true;
        }
        else {
            return false;
        }
    }
    listItems() {
        return [...this.items];
    }
    editItem(id, updates) {
        const i = this.items.findIndex((item) => item.id === id);
        if (i === -1) {
            console.error("Lembrete não encontrado!");
            return false;
        }
        this.items[i] = Object.assign(Object.assign({}, this.items[i]), updates);
        return true;
    }
    removeItem(id) {
        const oLenght = this.items.length;
        this.items = this.items.filter((item) => item.id !== id);
        return this.items.length < oLenght;
    }
    clearList() {
        this.items = [];
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const manager = new FullList();
    const form = document.getElementById("itemEntryForm");
    const titleInput = document.getElementById("newItem");
    const descriptionInput = document.getElementById("description");
    const dueDateInput = document.getElementById("dueDate");
    const listItems = document.getElementById("listItems");
    const reminderRender = () => {
        listItems.innerHTML = "";
        const reminders = manager.listItems();
        if (reminders.length === 0) {
            listItems.innerHTML = "<p>Nenhum lembrete cadastrado ainda.</p>";
            return;
        }
        reminders.forEach((reminder) => {
            const itemElement = document.createElement("div");
            itemElement.className = "item";
            itemElement.setAttribute("id", reminder.id.toString());
            itemElement.innerHTML = `
                  <div class="reminder-header">
                    <div style="display: flex; align-items: center;">
                      <input type="checkbox" class="chk-concluido" ${reminder.checked ? "checked" : ""}>
                      <h3 style="margin-left: 10px;">${reminder.title}</h3>
                    </div>
                    <p>${reminder.description}</p>
                    <small>
                      Criado em: ${reminder.created.toLocaleDateString()} |
                      <strong>Limite: ${new Date(reminder.dueDate).toLocaleDateString()}</strong>
                    </small>
                  </div>
                  <div class="reminder-actions">
                    <button class="btn-editar button">EDIT</button>
                    <button class="btn-apagar button">X</button>
                  </div>
            `;
            listItems.appendChild(itemElement);
        });
    };
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = new Date(dueDateInput.value + "T00:00:00");
        if (title && description && dueDate) {
            manager.addItem(title, description, dueDate);
            reminderRender();
            form.reset();
        }
    });
    listItems.addEventListener("click", (event) => {
        const target = event.target;
        const itemElement = target.closest(".item");
        if (!itemElement)
            return;
        const id = Number(itemElement.getAttribute("id"));
        if (target.classList.contains("chk-concluido")) {
            manager.toggleChecked(id);
            reminderRender();
        }
        if (target.classList.contains("btn-apagar")) {
            if (confirm("Tem certeza que deseja apagar este lembrete?")) {
                manager.removeItem(id);
                reminderRender();
            }
        }
        if (target.classList.contains("btn-editar")) {
            const currentItem = manager.listItems().find((l) => l.id === id);
            if (!currentItem)
                return;
            const newTitle = prompt("Novo título:", currentItem.title);
            const newDescription = prompt("Nova descrição:", currentItem.description);
            if (newTitle !== null && newDescription !== null) {
                manager.editItem(id, { title: newTitle, description: newDescription });
                reminderRender();
            }
        }
    });
    const clearItems = document.getElementById("clearItemsButton");
    clearItems.addEventListener("click", () => {
        manager.clearList();
        listItems.innerHTML = "";
        reminderRender();
    });
    reminderRender();
});
