let id=new URLSearchParams(window.location.search).get("id")
const blog_2=document.querySelector(".blog-2")
fetch(`http://localhost:3000/favorites`)
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        blog_2.innerHTML+=`
        <div class="js">
                <img src=${element.img} alt="">
                <div class="js-1">
                <h1>${element.title}</h1>
                <p>${element.description}</p>
                <div class="button">
                  <button onclick="deleteBtn(${element.id})" id="delete">Delete</button>
                </div>
            </div>
            </div>
        `
    });
})

function deleteBtn(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
    window.location.reload()
}

const Back=document.querySelector(".back")
Back.addEventListener("click",()=>{
    window.location="index.html?id"
})