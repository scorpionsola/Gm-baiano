const API="http://SEU_SERVIDOR:9000"
let selectedBuild=null

async function startBuild(){
const device=document.getElementById("device").value
await fetch(API+"/build/"+device,{method:"POST"})
loadBuilds()
}

async function loadBuilds(){
const res=await fetch(API+"/builds")
const data=await res.json()

let html=""
for(const id in data){
html+=`
<div onclick="showLogs('${id}')">
${id} — ${data[id].device} — ${data[id].status}
</div>`
}

document.getElementById("builds").innerHTML=html
}

async function showLogs(id){
selectedBuild=id
const res=await fetch(API+"/logs/"+id)
const data=await res.json()
document.getElementById("logs").textContent=data.logs || ""
}

setInterval(loadBuilds,4000)
loadBuilds()
