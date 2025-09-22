// Modelo dos tipos de dados da aplicação
interface Item {
  id: number;
  title: string;
  description: string;
  created: Date;
  dueDate: Date;
  checked: boolean;
}

// Uma classe que funciona como gerenciadora da lista
class ListManager {
  private items: Item[] = [];
  private nextID: number = 1;

  //Adiciona novo item na lista
  addItem(title: string, description: string, dueDate: Date): void {
    const newItem: Item = {
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

  // ALternar o estado de um item
  toggleChecked(id: number): boolean {
    const item = this.items.find((l) => l.id === id);
    if (item) {
      item.checked = !item.checked;
      return true;
    } else {
      return false;
    }
  }

  // Get da lista
  listItems(): Item[] {
    return [...this.items];
  }

  // Editar um item
  editItem(
    id: number,
    updates: Partial<Omit<Item, "id" | "dueDate">>
  ): boolean {
    const i = this.items.findIndex((item) => item.id === id);

    if (i === -1) {
      console.error("Lembrete não encontrado!");
      return false;
    }

    this.items[i] = { ...this.items[i], ...updates };
    return true;
  }

  // Remove um item
  removeItem(id: number): boolean {
    const oLenght = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);

    return this.items.length < oLenght;
  }

  // Limpa a lista
  clearList(): void {
    this.items = [];
  }
}

// Bloco carregado após conteúdo DOM ser carregado
document.addEventListener("DOMContentLoaded", () => {
  const manager = new ListManager(); // Instância do gerenciador da lista

  // Referência dos campos HTML
  const form = document.getElementById("itemEntryForm") as HTMLFormElement;
  const titleInput = document.getElementById("newItem") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description"
  ) as HTMLTextAreaElement;
  const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;
  const listItems = document.getElementById("listItems") as HTMLDivElement;
  const clearItems = document.getElementById("clearItemsButton");

  // Renderizador da lista de lembretes
  const reminderRender = (): void => {
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
                      <input type="checkbox" class="chk-concluido" ${
                        reminder.checked ? "checked" : ""
                      }>
                      <h3 style="margin-left: 10px;">${reminder.title}</h3>
                    </div>
                    <p>${reminder.description}</p>
                    <small>
                      Criado em: ${reminder.created.toLocaleDateString()} |
                      <strong>Limite: ${new Date(
                        reminder.dueDate
                      ).toLocaleDateString()}</strong>
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

  // Evento de envio do formulário para criação de lembrete
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

  // Ouvidor de eventos que acontecem dentro da lista
  listItems.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const itemElement = target.closest(".item");

    if (!itemElement) return;

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
      if (!currentItem) return;
      const newTitle = prompt("Novo título:", currentItem.title);
      const newDescription = prompt("Nova descrição:", currentItem.description);
      if (newTitle !== null && newDescription !== null) {
        manager.editItem(id, { title: newTitle, description: newDescription });
        reminderRender();
      }
    }
  });

  // Ouvidor do botão de limpar toda lista
  clearItems.addEventListener("click", (): void => {
    if (confirm("Tem certeza que deseja limpar toda a lista?")) {
      manager.clearList();
      listItems.innerHTML = "";
      reminderRender();
    }
  });

  // Renderiza uma primeira vez
  reminderRender();
});
