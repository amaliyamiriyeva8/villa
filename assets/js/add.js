const form=document.querySelector("form")
const image=document.querySelector("#image-add")
const file_add=document.querySelector("#file-add")
const name=document.querySelector("#name")
const description=document.querySelector("#description")
const input=document.querySelector('input[type="file"]')

input.addEventListener("input",(e)=>{
    let file=e.target.files[0]
    if(file){
        let reader=new FileReader()
        reader.readAsDataURL(file);
        reader.onload=()=>{
        image.src=reader.result;
        image.style.width="70px";
        image.style.heigth="70px";
        }
       
    }
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let object={}
    let src=file_add.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(src)
    window.location="index.html"
    reader.onload=(e)=>{
    object={
        img:e.target.result,
        title:name.value,
        description:description.value
    }
    axios.post(`http://localhost:3000/villa/`,object)
   
    }
   
   
})