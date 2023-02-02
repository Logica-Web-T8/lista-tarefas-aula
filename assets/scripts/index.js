/**
 * - transferir esses dados para tabela
 */

const form = document.querySelector("#form-create-task");
const tbodyTasks = document.querySelector("#tbody-tasks");

const KEY_TASKS_LOCAL_STORAGE = "tasks";

const tasks = [];

form.addEventListener("submit", (event) => {
    //previne que o submit do formulário atualize a página
    event.preventDefault();

    //pega os dados do formulário
    const formValues = event.target;
    const { title, description } = formValues;

    // insere um objeto no array tasks
    tasks.push({
        title: title.value,
        description: description.value
    });

    //zera os campos do formulário
    title.value = "";
    description.value = "";

    //atualizar a tabela
    updateViewTable(tasks);
    //salva toda minha lista no local storage
    saveTasksLocalStorage();
});

function updateViewTable (list){
    //zerar tbody
    tbodyTasks.innerHTML = "";

    //percore a lista para criar as tr's
    list.forEach((item, index)=>{
        //criar tr (tag)
        const trElement = document.createElement("tr");

        //insere as colunas (td) dentro da tr (linha) criada
        trElement.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>ações</td>
        `;

        //insere a tr dentro do tbody
        tbodyTasks.appendChild(trElement);
    });
}

function saveTasksLocalStorage(){
    const listTasksString = JSON.stringify(tasks);
    localStorage.setItem(KEY_TASKS_LOCAL_STORAGE, listTasksString);
}