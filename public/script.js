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
    addBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        console.log("clicked");
        task_input = document.querySelector("#task-input")
        let obj = {
            id: task_array.length+1,
            task_name: task_input.value,
            isCompleted: false
        }
        task_array.push(obj)
        console.log(task_array);
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
        renderTask(task_input)
    })
    
    function renderTask(task_input) {
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
            task_list.innerHTML+=`
            <li class="task-item">
                <span>${i.task_name}</span> 
                <div class="task-actions">    
                    <button>${i.isCompleted ? "Undo" : "Complete"}</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </li>
            `
            console.log(i);
        })
    }

})