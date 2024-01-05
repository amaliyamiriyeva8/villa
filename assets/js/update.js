let id=new URLSearchParams(window.location.search).get("id")
const form=document.querySelector("form")
const image=document.querySelector("#image-update")
const file=document.querySelector("#file-update")
const name=document.querySelector("#name")
const description=document.querySelector("#description")
const input=document.querySelector('input[type="file"]')

fetch(`http://localhost:3000/villa/${id}`)
.then(res=>res.json())
.then(data=>{
    image.src=data.img;
    name.value=data.title;
    description.value=data.description;
    image.style.width="70px";
    image.style.heigth="70px";
})
input.addEventListener("input",(e)=>{
    let file=e.target.files[0]
    if(file){
        let reader=new FileReader()
        reader.readAsDataURL(file);
        reader.onload=()=>{
            image.src=reader.result
        }
    }
})

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  axios.patch(`http://localhost:3000/villa/${id}`,{
    img:image.src,
    title:name.value,
    description:description.value
  })
 .then(res=>{
    window.location="index.html"
  })
})



