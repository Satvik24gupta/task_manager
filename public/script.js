// document.addEventListener("DOMContentLoaded", ()=>{
//     let task_input = document.getElementById("task-input").value
    
//     add_task_btn = document.querySelector("#add-task-btn")
//     // console.log(add_task_btn);

//     var tasks_arr = [];

//     add_task_btn.addEventListener("click",(e)=>{
//         e.preventDefault()
//         let task_input = document.getElementById("task-input").value

//         let obj = {
//             id:tasks_arr.length+1,
//             task: task_input,
//             status: false
//         }
//         tasks_arr.push (obj);
        
//         document.getElementById("task-input").value=""

//         //===================================== Displaying the task_array in the DOM =====================================
//         task_list = document.querySelector("#task-list")
//         console.log(task_list);

//         li = document.createElement("li")
        
//         task_list.innerHTML =""
//         for(let i=0;i<tasks_arr.length;i++){
//             li = document.createElement("li")
//             span = document.createElement("span")
//             div = document.createElement("div")
//             btn1 = document.createElement("button")
//             btn2 = document.createElement("button")
//             btn3 = document.createElement("button")

//             span.innerText = tasks_arr[i].task
//             btn1.innerText = "Complete"
//             btn2.innerText = "Edit"
//             btn3.innerText = "Delete"

//             div.appendChild (btn1)
//             div.appendChild (btn2)
//             div.appendChild (btn3)
//             li.classList.add("task-item")
//             div.classList.add("task-actions")
//             li.appendChild(span)
//             li.appendChild(div)

//             task_list.appendChild(li)
//         }



//         // for (let i = 0; i < array.length; i++) {
//         //     li = document.createElement("li")
//         //     span = document.createElement("span")
//         //     div = document.createElement("div")
//         //     btn1 = document.createElement("button")
//         //     btn2 = document.createElement("button")
//         //     btn3 = document.createElement("button")



//         // }



//     } );
// })


document.addEventListener("DOMContentLoaded", ()=>{
    task_array = [];
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
        // console.log("clicked");
        task_input = document.querySelector("#task-input")
        let obj = {
            id: task_array.length+1,
            // task_name: task_input.value.trim(),
            task_name: task_input.value,
            isCompleted: false
        }
        if((task_input.value.trim()!=''))
        {
            task_array.push(obj)
        }
        // console.log(task_array);
        // task_list = document.querySelector("#task-list")
        // task_list.innerHTML+=`
        // <li class="task-item">
        //     <span>${task_input.value}</span> 
        //     <div class="task-actions">    
        //         <button>Complete</button>
        //         <button>Edit</button>
        //         <button>Delete</button>
        //     </div>
        // </li>
        // `
        renderTask(task_array)
        task_input.value = ""
    })
    
    function renderTask(task_array) {
        task_list = document.querySelector("#task-list")
        // task_list.innerHTML+=`
        // <li class="task-item">
        //     <span>${task_input.value}</span> 
        //     <div class="task-actions">    
        //         <button>Complete</button>
        //         <button>Edit</button>
        //         <button>Delete</button>
        //     </div>
        // </li>
        // `
        task_list.innerHTML = '' 
        task_array.forEach((i)=>{
            li = document.createElement('li')
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
            // li.querySelector(".edit-btn").addEventListener("click", ()=>{
            //     let span = li.querySelector('span')
            //     let spanText = span.innerText
            //     let input = document.createElement('input')
            //     // span.appendChild(input)
            //     span.replaceWith(input)
            //     input.focus()
            //     input.value = spanText
            //     input.addEventListener("blur", ()=>{
            //         let task_name = input.value
            //         mySpan = document.createElement('span')
            //         mySpan.innerText = task_name
            //         input.replaceWith(mySpan)
            //         editTask(i.id, task_name)
            //         console.log(task_name);
            //     })
            //     console.log(span);
            //     // editTask(i.id)
            // })
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
        renderTask(task_array)
    }

    function clearCompleted(){
        newArray = task_array.filter((element)=>{
            return element.isCompleted == false
        })
        task_array = newArray
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
        console.log("BHai teri id hai: ", task_id);
        // let updated_value = prompt("Enter updated value", "qwsdfghjkl;lkjhgfcx")
        newArray = task_array.map((element)=>{
            if(element.id == task_id) {
                element.task_name = task_name;
            }
            return element;
        })
        task_array = newArray
        renderTask(task_array)
    }
})