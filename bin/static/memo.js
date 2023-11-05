function createTable(size){
    const table = document.createElement("table");
    
    for (let i=0; i<size; i++){
        const tableRow = document.createElement("tr");
        for (let j=0; j<size; j++){
            const tableCell = document.createElement("td");
            tableCell.addEventListener("click", tableCell.fnClick = ()=> {showHidden(tableCell)});
            tableCell.style.backgroundColor = "black";
        
            const tableInnerCell = document.createElement("img");
            tableInnerCell.id = i*size+j;
            tableInnerCell.className = "innerCells";
            tableInnerCell.style.width="150px";
            tableInnerCell.style.height="150px";
            tableInnerCell.src = memList[i*size+j].imgSrc;


//            tableInnerCell.style.backgroundColor=memList[i*size+j].color;
           // tableInnerCell.style.visibility="visible";
            tableCell.appendChild(tableInnerCell);
            tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
    }
    return table;
}

const generateColor = {
    r : 0,
    g : 0,
    b : 0,
    step:64,
    next(){
        this.r+=this.step;
        this.g+=this.step*Math.floor(this.r/256);
        this.r=this.r - 256*Math.floor(this.r/256);
        this.b+=this.step*Math.floor(this.g/256);
        this.g=this.g - 256*Math.floor(this.g/256);
        this.b=this.b - 256*Math.floor(this.b/256);
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}


function listShuffle(list){
    const temp = [];
    const listCopy = [...list];
    while (listCopy.length != 0){
        temp.push(listCopy.splice(Math.floor(Math.random()*listCopy.length),1)[0]);
    }
    return temp;
}

function showHidden(thisElement){
    let childElement = thisElement.firstChild;
    
    if (notHidden < 2){
        if(notHidden == 1)
        {
            let firstChildElement = firstElement.firstChild;
            if(childElement.id == firstChildElement.id)
                return;
                clearTimeout(toStop);
            if(memList[Number(childElement.id)].memId == memList[Number(firstChildElement.id)].memId)
            {
                thisElement.removeEventListener("click",thisElement.fnClick);
                firstElement.removeEventListener("click",firstElement.fnClick);
                notHidden--;
                childElement.style.visibility = "visible";
                score++;
                updateScore();
                return;

            }
            setTimeout(()=>{hideHidden(firstChildElement)},3000);
            setTimeout(()=>{hideHidden(childElement)},3000);
        }
        else
        {
            console.log("First");
            firstElement = thisElement;
            toStop = setTimeout(()=>{hideHidden(childElement)},3000);
        }
        notHidden++;

        childElement.style.visibility = "visible";
        
    }
    console.log(notHidden);
    console.log(firstElement);
}

function hideHidden(myElement){
    myElement.style.visibility="hidden";
    notHidden--;
    console.log("End: "+ notHidden)

}

function starting(){
    const cells = document.getElementsByClassName("innerCells");
    for(let i=0; i<cells.length; i++){
        cells[i].style.visibility = "hidden";       
    }
    console.log("end cell");
    notHidden = 0;
}
function updateScore(){
    document.getElementById("score").innerHTML = `Scrore: ${score}`;
    if (maxScore<=score){
        alert("You WIN!!!");
        location.reload();
    }
}


// Program START --------------------------------------------------------------------
let memList = [];
let notHidden = 1000;
let toStop;
let firstElement;
let size = 4;
let score = 0;


let pugList = JSON.parse(document.getElementById("json").content);
console.log(pugList);
for (let i=0; i<8;i++)
     memList.push({
//                    color:generateColor.next(),
                    imgSrc:"/static/pug/"+pugList[i],
                    memId:i
                });
const maxScore = memList.length;

memList = [...memList,...memList];
memList = listShuffle(memList);

// console.log(memList);

const body = document.getElementsByTagName("body")[0];

body.appendChild(createTable(size,memList))
setTimeout(starting,10000);

console.log("Pug end!Woof!");