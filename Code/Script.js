let Pizza=document.getElementById("Pizza")
let Shell=document.getElementById("Shell")
let Font=document.getElementById("HPFont")
let Oil=document.getElementById("Oil")
let Bat=document.getElementById("Bat")
let Car=document.getElementById("Car")
Oil.style.display="none"
Bat.style.display="none"
Car.style.display="none"
let x=0
let y=0
let Cans=[]
let Items=[]
let speed=2
let Time=0
let NewCan_D_Time=5000
Pizza.HP=300
Pizza.Hand=false
//EventListener
Shell.addEventListener("mousemove",(event)=>{
    x=event.offsetX
    y=event.offsetY
})
//Function
let Upgrade=setInterval(()=>{
    if (speed<25){
        speed+=0.5
    }
    if (NewCan_D_Time>200)
        NewCan_D_Time/=1.5
},10000)
let TimeUP=setInterval(()=>{
    Time+=1
},1000)
function SetCan(){
    setTimeout(()=>{
        NewCan()
        SetCan()
    },NewCan_D_Time)
}
setTimeout(SetCan,1300)
SetCan()
SetBat=()=>{setTimeout(()=>{
    NewItem("Bat")
    SetBat()
},15000)}
SetGas=()=>{setTimeout(()=>{
    NewItem("Gas")
    SetGas()
},39000)}
SetKey=()=>{setTimeout(()=>{
    NewItem("Key")
    SetKey()
},40000)}
SetWater=()=>{setTimeout(()=>{
    NewItem("Water")
    SetWater()
},60000)}
SetBat()
SetGas()
SetKey()
SetWater()
function Die(){
    Shell.style.backgroundColor="black"
    Font.textContent=`Survival Time:${Time}`
    Font.style.color="white"
    Font.style.zIndex=1000
    clearInterval(TimeUP)
}
function Way(el1, el2){
    let x=(Number(el1.style.left.replace("px",''))-Number(el2.style.left.replace("px",'')))**2
    let y=(Number(el1.style.top.replace("px",''))-Number(el2.style.top.replace("px",'')))**2
    return Math.sqrt(x+y)
}
function NewCan(){
    let c_can=document.createElement("img")
    c_can.id="Can"
    c_can.className="Object Can"
    c_can.style.top="0px"
    c_can.style.left=String(Math.floor(Math.random()*(1000-80)))+"px"
    c_can.style.display="block"
    Cans.push(c_can)
    document.body.appendChild(c_can)
}
function NewItem(ItemName){
    let c_item=document.createElement("img")
    c_item.id=ItemName
    c_item.className=(`Object ${ItemName}`)
    c_item.style.top="0px"
    c_item.style.left=String(Math.floor(Math.random()*(1000-80)))+"px"
    c_item.style.display="block"
    Items.push(c_item)
    document.body.appendChild(c_item)
}
function Move_(){
    for (var i=0;i<Cans.length;i++){
        Cans[i].style.top=String(Number(Cans[i].style.top.replace('px',''))+speed)+"px"
        if (Number(Cans[i].style.left.replace('px',''))<Number(Pizza.style.left.replace('px','')))
            Cans[i].style.left=String(Number(Cans[i].style.left.replace('px',''))+speed)+"px"
        else
            Cans[i].style.left=String(Number(Cans[i].style.left.replace('px',''))-speed)+"px"
        if (Number(Cans[i].style.top.replace("px",""))>=700){
            let target=Cans[i]
            Cans[i].remove()
            Cans.splice(Cans.indexOf(target),1)
            break
        }
    }
    for (var i=0;i<Items.length;i++){
        Items[i].style.top=String(Number(Items[i].style.top.replace('px',''))+speed)+"px"
        if (Number(Items[i].style.top.replace("px",""))>=700){
            let target=Items[i]
            Items[i].remove()
            Items.splice(Items.indexOf(target),1)
            break
        }
    }
}
function Keeping(){
    if (Pizza.Hand=="Water"){
        Pizza.Hand=false
        Pizza.HP+=75
    }
    if (Pizza.Hand=="Gas")
        Oil.style.display="block"
    else
        Oil.style.display="none"
    if (Pizza.Hand=="Bat"){
        Bat.style.top=String(y-75)+"px"
        Bat.style.left=String(x-40)+"px"
        Bat.style.display="block"
    }else{
        Bat.style.display="none"
    }
    if (Pizza.Hand=="Key"){
        Pizza.Hand=false
        Car.style.display="block"
        Car.style.left=String(x-125)+"px"
        Car.style.top="750px"
    }
    if (Car.style.display=="block"){
        Car.style.top=String(Number(Car.style.top.replace("px",""))-5)+"px"
        if (Car.style.top<=-250){
            Car.style.display="none"
        }
    }
    Pizza.style.left=`${x-40}px`
    Pizza.style.top=`${y-40}px`
    Font.style.left=`${x}px`
    Font.style.top=`${y}px`
    Move_()
    Font.textContent=`HP:${Math.round(Pizza.HP/3)}`
    for (Can of Cans)
        if (Way(Pizza,Can)<=80)
            Pizza.HP-=1
    if (Pizza.HP<=0){
        Pizza.remove()
        Die()
    }
    for (Item of Items)
        if (Way(Pizza,Item)<=80 && !Pizza.Hand){
            Pizza.Hand=Item.id
            let target=Item
            Item.remove()
            Items.splice(Items.indexOf(target),1)
            if (Pizza.Hand=="Bat"){
                setTimeout(()=>{
                    Pizza.Hand=false
                },5000)
            }
            if (Pizza.Hand=="Gas"){
                Oil.style.top=String(y-50)+"px"
                Oil.style.left=String(x-50)+"px"
                setTimeout(()=>{
                    Pizza.Hand=false
                },8000)
            }
            break
        }
    for (Can of Cans){
        if (Car.style.display=="block" && Way(Can, Car)<150){
            let target=Can
            Can.remove()
            Cans.splice(Cans.indexOf(target),1)
        }
        if (Oil.style.display=="block" && Way(Can, Oil)<100){
            let target=Can
            Can.remove()
            Cans.splice(Cans.indexOf(target),1)
        }
        if (Bat.style.display=="block" && Way(Can, Bat)<80){
            let target=Can
            Can.remove()
            Cans.splice(Cans.indexOf(target),1)
        }
    }
    requestAnimationFrame(Keeping)
}
NewCan()
Keeping()