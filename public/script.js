document.addEventListener("DOMContentLoaded", ()=>{
    // localStorage.setItem("name", "John");
    // console.log(localStorage.getItem("name"))
    // task_array = [];
    task_array = JSON.parse(localStorage.getItem("task_array")) || []
    localStorage.setItem("task_array", JSON.stringify(task_array))
    renderTask(task_array)
    addBtn = document.querySelector('#add-task-btn')
    filterBtns = document.querySelector('.filter-buttons')
    allBtn = filterBtns.querySelector('#filter-all')
    activeBtn = filterBtns.querySelector('#filter-active')
    completedBtn = filterBtns.querySelector('#filter-completed')
    activeBtn.addEventListener("click", ()=>{
        activeBtn.classList.add("active")
        completedBtn.classList.remove("active")
        allBtn.classList.remove("active")
        active()
    })
    completedBtn.addEventListener("click", ()=> {
        activeBtn.classList.remove("active")
        completedBtn.classList.add("active")
        allBtn.classList.remove("active")
        completed()
    })
    allBtn.addEventListener("click", ()=>{ 
        activeBtn.classList.remove("active")
        completedBtn.classList.remove("active")
        allBtn.classList.add("active")
        all()
    })
    addBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        if (task_array.length){
            id = task_array[task_array.length-1]['id']+1;
        }
        else{
            id = 1;
        }
        task_input = document.querySelector("#task-input")
        let obj = {
            id: id,
            task_name: task_input.value,
            isCompleted: false
        }
        id++
        if((task_input.value.trim()!=''))
        {
            task_array.push(obj)
        }
        localStorage.setItem("task_array", JSON.stringify(task_array))
        renderTask(task_array)
        task_input.value = ""
    })
    
    function renderTask(task_array) {
        task_list = document.querySelector("#task-list")
        task_list.innerHTML = '' 
        task_array.forEach((i)=>{
            let li = document.createElement('li')
            li.innerHTML += `
            <span>${i.task_name}</span> 
            <div class="task-actions">    
                <button class="complete-btn">${ i.isCompleted == true ? "Undo" : "Complete"}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" >Delete</button>
            </div>
            `
            task_list.appendChild(li);
            li.className = `task-item ${i.isCompleted?"completed":""}`


            li.querySelector(".delete-btn").addEventListener("click", ()=>deleteTask(i.id))
            li.querySelector(".complete-btn").addEventListener("click", ()=>completeTask(i.id))
            li.querySelector(".edit-btn").addEventListener("click", ()=>{
                let span = li.querySelector('span')
                console.log(span);
                let input = document.createElement('input')
                let spanText = span.innerText
                input.value = spanText
                span.replaceWith(input)
                input.focus()
                input.addEventListener("blur", ()=>{
                    let my_span = document.createElement('span')
                    let task_name = input.value
                    my_span.innerText =task_name
                    input.replaceWith(my_span)
                    editTask(i.id, input.value)
                })
                
            })
        })
        document.querySelector('#clear-completed').addEventListener("click", ()=>clearCompleted())
    }

    function  deleteTask(taskId){
        newArray = task_array.filter((element)=>{
            return element.id !== taskId
        })
        task_array = newArray
        localStorage.setItem("task_array", JSON.stringify(task_array))
        renderTask(task_array)
    }

    function completeTask(taskId){
        newArray = task_array.map((element)=>{
            if(element.id == taskId){
                element.isCompleted = !element.isCompleted
            }
            return element;
        })
        task_array = newArray
        localStorage.setItem("task_array", JSON.stringify(task_array))
        renderTask(task_array)
    }

    function clearCompleted(){
        newArray = task_array.filter((element)=>{
            return element.isCompleted == false
        })
        task_array = newArray
        localStorage.setItem("task_array", JSON.stringify(task_array))
        renderTask(task_array)
    }

    function active(){
        newArray = task_array.filter((element)=>{
            return element.isCompleted == false;
        })
        renderTask(newArray)
    }
    
    function completed() {
        newArray = task_array.filter((element)=>{
            return element.isCompleted == true;
        })
        renderTask(newArray)
    }

    function all() {
        renderTask(task_array)
    }

    function editTask(task_id, task_name) {
        newArray = task_array.map((element)=>{
            if(element.id == task_id) {
                element.task_name = task_name;
            }
            return element;
        })
        task_array = newArray
        localStorage.setItem("task_array", JSON.stringify(task_array))
        renderTask(task_array)
    }
})