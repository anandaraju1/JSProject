const taskContainer = document.querySelector(".task__container");

//Global store
let globalStore = [];
const notification = new Notification();

const newCard = ({ id, imageUrl, taskTitle, taskDescription, taskType }) => `<div class="col-md-6 col-lg-4 id=${id}">
<div class="card ">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button"  id=${id} class="btn btn-outline-success" onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt"  id=${id} onclick="editCard.apply(this, arguments)"></i></button>
        <button type="button" id=${id} class="btn btn-outline-danger onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash" id=${id}  onclick="deleteCard.apply(this, arguments)"></i></button>
    </div>
    <img src=${imageUrl} class="card-img-top"
        alt="..." />
    <div class="card-body">
        <h5 class="card-title">${taskTitle}</h5>
        <p class="card-text">${taskDescription}</p>
        <span class="badge bg-primary">${taskType}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end">Open task</button>
    </div>
</div>
</div>`

const loadInitialTaskCards = () => {
    //access localstorage
    const getInitialData = localStorage.getItem("tasky");
    if (!getInitialData) return;

    //convert stringify object to object
    const { cards } = JSON.parse(getInitialData);

    //map around the array to generaye HTML card and inject it to DOM
    cards.map((card) => {
        const createNewCard = newCard(card);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(card);


    });


};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //Unique number for card iD
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(taskData);

    //add to local storage
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));


};


const deleteCard = (event) => {

    //Id

    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName; //Button

    //search the globalStore, remove the object which matches with the Id
    const newUpdatedArray = globalStore.filter((cardObject) => cardObject.id != targetID);

    globalStore = newUpdatedArray;
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

    if (tagname === "BUTTON") {
        return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    }

    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );

};

//contenteditable

const editCard = (event) => {

    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;
    if (tagname === "BUTTON") {
        parentElement = event.target.parentNode.parentNode;
    } else {
        parentElement = event.target.parentNode.parentNode.parentNode;

    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];

    let submitButton = parentElement.childNodes[7].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.setAttribute("onclick", saveEditchanges.apply(this, arguments));
    submitButton.innerHTML = "Save Changes";


};

const saveEditchanges = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;
    if (tagname === "BUTTON") {
        parentElement = event.target.parentNode.parentNode;
    } else {
        parentElement = event.target.parentNode.parentNode.parentNode;

    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];

    let submitButton = parentElement.childNodes[7].childNodes[1];

    const updatedData = {
        taskTitle: taskTitle.innerHTML,
        taskType: taskType.innerHTML,
        taskDescription: taskDescription.innerHTML,
    };




};