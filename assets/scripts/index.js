const form = document.querySelector("#form-create-task");
const tbodyTasks = document.querySelector("#tbody-tasks");

const KEY_TASKS_LOCAL_STORAGE = "tasks";

const tasks = getTasksLocalStorage();

if (tasks.length > 0) {
  updateViewTable(tasks);
}

form.addEventListener("submit", (event) => {
  //previne que o submit do formulário atualize a página
  event.preventDefault();

  //pega os dados do formulário
  const formValues = event.target;
  const { title, description } = formValues;

  // insere um objeto no array tasks
  tasks.push({
    title: title.value,
    description: description.value,
  });

  //zera os campos do formulário
  title.value = "";
  description.value = "";

  //atualizar a tabela
  updateViewTable(tasks);
  //salva toda minha lista no local storage
  saveTasksLocalStorage();
});

function updateViewTable(list) {
  //zerar tbody
  tbodyTasks.innerHTML = "";

  //percore a lista para criar as tr's
  list.forEach((item, index) => {
    //criar tr (tag)
    const trElement = document.createElement("tr");

    //insere as colunas (td) dentro da tr (linha) criada
    trElement.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>
                <div class="dropdown-center">  
                    <img 
                        class="dropdown-toggle icon-button" 
                        src="./assets/icons/more.svg" 
                        alt="icones três pontos" 
                        data-bs-toggle="dropdown" 
                    /> 
                    <ul class="dropdown-menu">
                        <li><h6 class="dropdown-header">Ações</h6></li>
                        <li><button class="dropdown-item" onclick="deleteTask(${index})">Excluir</button></li>
                    </ul>
                </div>
            </td>
        `;

    //insere a tr dentro do tbody
    tbodyTasks.appendChild(trElement);
  });
}

function deleteTask(index){
    tasks.splice(index, 1);

    updateViewTable(tasks);
    saveTasksLocalStorage();
}

function saveTasksLocalStorage() {
  const listTasksString = JSON.stringify(tasks);
  localStorage.setItem(KEY_TASKS_LOCAL_STORAGE, listTasksString);
}

function getTasksLocalStorage() {
  //try catch serve para testar e pegar a exceção de qualquer erro
  try {
    // pega o dado do local storage
    const dataString = localStorage.getItem(KEY_TASKS_LOCAL_STORAGE);

    /**
     * verifica se o dado do local storage é igual string vazia
     * se for, lanço uma exceção com a mensagem "sem dados"
     */
    if (dataString === "") {
      /**
       * se ele entrar nesse if não irá executar o que esta depois do if
       * e vai para o bloco catch com mensagem "sem erro"
       */
      throw "sem dados";
    }

    const list = JSON.parse(dataString);
    return list;
  } catch (exception) {
    if (exception !== "sem dados") {
      alert("Não foi possível recuperar sua lista de tarefas");
    }
    return [];
  }
}
