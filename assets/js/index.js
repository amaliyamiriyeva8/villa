const list=document.querySelector("#list")
const list_style=document.querySelector(".list-style")
const hand=document.querySelector("#hand")
const blog_2=document.querySelector(".blog-2")
const search=document.querySelector("#search")
let firstArr = [];
let secondArr = [];

list.addEventListener("click",()=>{
    if(list_style.style.display!="block"){
        list_style.style.display="block"
    }
    else{
        list_style.style.display="none"
    }
})

hand.addEventListener("click",()=>{
   window.scrollTo({
   top:0,
   left:0,
   behavior:"smooth"
   })
})


let page=3;
function loadMore(){
fetch(`http://localhost:3000/villa`)
.then(res=>res.json())
.then(data=>{
    secondArr=data;
    firstArr=firstArr.length || search.value ? secondArr : data;
    blog_2.innerHTML="";
    axios.get(`http://localhost:3000/favorites`)
    .then(fav=>{
            secondArr.slice(0,page).forEach(element => {
                if(fav.data.find(favEl=>favEl.id===element.id)){
                blog_2.innerHTML+=`
                <div class="js">
                        <img src=${element.img} alt="">
                        <div class="js-1">
                        <i class="bi bi-heart-fill"  style="color:red" onClick='DeleteFavEl(${element.id})'></i>
                        <h1>${element.title}</h1>
                        <p>${element.description}</p>
                        <div class="button">
                          <button onclick="details(${element.id})">Details</button>
                          <button onclick="deleteBtn(${element.id})">Delete</button>
                          <button onclick="update(${element.id})">Update</button>
                        </div>
                    </div>
                    </div>
                `
            }
        else{
            blog_2.innerHTML+=`
            <div class="js">
                    <img src=${element.img} alt="">
                    <div class="js-1">
                    <i class="bi bi-heart" onClick='AddFavEl(${element.id})'></i>
                    <h1>${element.title}</h1>
                    <p>${element.description}</p>
                    <div class="button">
                      <button onclick="details(${element.id})">Details</button>
                      <button onclick="deleteBtn(${element.id})">Delete</button>
                      <button onclick="update(${element.id})">Update</button>
                    </div>
                </div>
                </div>
            `
        }});
        
       
    })
   
})
}

loadMore()

function details(id){
    window.location=`details.html?id=${id}`
}
function deleteBtn(id){
    axios.delete(`http://localhost:3000/villa/${id}`)
    window.location.reload()
}
function update(id){
    window.location=`update.html?id=${id}`
}

const add=document.querySelector("#add")
add.addEventListener("click",()=>{
    window.location="add.html"
})

const more=document.querySelector(".more")
more.addEventListener("click",()=>{
    page+=3;
    loadMore()
})

const fav=document.querySelector("#fav")
fav.addEventListener("click",()=>{
    window.location="favorite.html"
})

function DeleteFavEl(id){
    axios.delete(`http://localhost:3000/favorites/`+id)
}
function AddFavEl(id){
    fetch(`http://localhost:3000/villa/${id}`)
    .then(res=>res.json())
    .then(data=>{
        axios.post(`http://localhost:3000/favorites/`,data)
    })
}

search.addEventListener("input", function (e) {
    firstArr =secondArr;
    firstArr = firstArr.filter((element) =>
    console.log(element),
      element.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
   loadMore()
  });