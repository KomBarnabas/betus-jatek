const startButton = document.getElementById("startButton");
const menuDiv = document.getElementById("menuDiv");
const jatekDiv = document.getElementById("jatekDiv");

const kevertKi = document.getElementById("kevertKi");
const eredetiTipp = document.getElementById("eredetiTipp");
const tippGomb = document.getElementById("tippGomb");
const eredmenyKi = document.getElementById("eredmenyKi");
const koviGomb = document.getElementById("koviGomb");
const themeGomb = document.getElementById("themeGomb");
const score = document.getElementById("score");
const finishDiv = document.getElementById("finishDiv");
const rosszDbP = document.getElementById("rosszDbP");
const ujraGomb = document.getElementById("ujraGomb")
const  skipButton = document.getElementById("skipButton")


let szavak = ["idegen", "asztal", "doboz", "cukor", "kerék", "tanár", "iskola", "ablak", "cipő", "füzet", "telefon", "kapu", "labda", "szék", "ceruza", "papír", "ház", "bolt", "fülke", "keres", "vásár", "gomba", "állat", "ember", "nadrág", "sapka", "kabát",
    "gyerek", "kacsa", "könyv", "írás", "alma", "tehén", "kutya", "madár", "létra", "dob", "csiga", "pohár", "csésze", "kulcs", "tükör", "padló", "szoba", "villám", "zebra", "repül", "tavasz", "ősz", "nyár"];
/*let szavak = ["asd"];*/

let randomSzo = "";

let darkTheme = false;
let buttonColors = ["white", "rgb(240, 240, 240)"]

let pontSzam = 0;
let rossz = 0;

function kevero(lst){
    if (szavak.length === 0){
        console.log("asd")
        jatekDiv.style.display = "none";
        rosszDbP.innerHTML = `Összesen ${rossz} alkalommal rontottad el, és ${pontSzam} szót találtál el`
        finishDiv.style.display = "block";
    }
    else{
        let n = 0;
        let kevert = "";
        randomSzo = szavak[Math.floor(Math.random()*(szavak.length))];
        do{
            kevert = "";
            let betuk = randomSzo.split("");
            while (!(betuk.length === 0)){
                n = Math.floor(Math.random()*(betuk.length));
                kevert+=betuk[n];
                betuk.splice(n, 1);
        }
        }while (kevert === randomSzo)
        return kevert
    }
}

function correction(){
    if (eredetiTipp.value === "debug"){
        skipButton.style.display = "block";
    }else if (eredetiTipp.value === randomSzo){
       joTipp()
    }else{
        eredmenyKi.innerHTML = "Nem találtad el. Próbáld újra";
        rossz++;
    }
}

function joTipp(){
    eredmenyKi.innerHTML = `Eltaláltad! Az eredeti szó ${randomSzo} volt`;
    koviGomb.style.display = "block";
    pontSzam ++;
    score.innerHTML = `Score: ${pontSzam}`;
    szavak.splice(szavak.indexOf(randomSzo), 1);
    console.log(szavak);
}

startButton.addEventListener("click", function(){
    menuDiv.style.display = "none";
    jatekDiv.style.display="block";
    eredetiTipp.value = "";
    kevertKi.innerHTML = kevero(szavak);
})

tippGomb.addEventListener("click", function(){correction()});

eredetiTipp.addEventListener("keydown", (event) => {
    if (event.key == "Enter"){correction();}
})

koviGomb.addEventListener("click", function kovetkezo(){
    kevertKi.innerHTML = kevero(szavak);
    eredmenyKi.innerHTML = "";
    eredetiTipp.value = "";
    koviGomb.style.display = "none";
})

themeGomb.addEventListener("click", function(){
    if (darkTheme){
    document.body.style.backgroundColor = "white"; document.body.style.color = "black";
    startButton.style.backgroundColor = "rgb(240, 240, 240)"; startButton.style.color = "black";
    themeGomb.style.backgroundColor = "rgb(240, 240, 240)"; themeGomb.style.color = "black";
    eredetiTipp.style.backgroundColor = "rgb(240, 240, 240)"; eredetiTipp.style.color = "black";
    tippGomb.style.backgroundColor = "rgb(240, 240, 240)"; tippGomb.style.color = "black";
    koviGomb.style.backgroundColor = "rgb(240, 240, 240)"; koviGomb.style.color = "black";
    buttonColors = ["rgb(240, 240, 240)", "rgb(220, 220, 220)"]

    darkTheme = false;
    }else{
        document.body.style.backgroundColor = "black"; document.body.style.color = "white";
        startButton.style.backgroundColor = "rgb(60, 60, 60)"; startButton.style.color = "white"; startButton.style.background;
        themeGomb.style.backgroundColor = "rgb(60, 60, 60)"; themeGomb.style.color = "white";
        eredetiTipp.style.backgroundColor = "rgb(60, 60, 60)"; eredetiTipp.style.color = "white";
        tippGomb.style.backgroundColor = "rgb(60, 60, 60)"; tippGomb.style.color = "white";
        koviGomb.style.backgroundColor = "rgb(60, 60, 60)"; koviGomb.style.color = "white";
        buttonColors = ["rgb(70, 70, 70)", "rgb(60, 60, 60)"];
        
        darkTheme = true;
    }

})

ujraGomb.addEventListener("click", function(){
    finishDiv.style.display = "none";
    menuDiv.style.display = "block";
    pontSzam = 0;
    score.innerHTML = `Score: ${pontSzam}`;
    rossz = 0;
    szavak = ["idegen", "asztal", "doboz", "cukor", "kerék", "tanár", "iskola", "ablak", "cipő", "füzet", "telefon", "kapu", "labda", "szék", "ceruza", "papír", "ház", "bolt", "fülke", "keres", "vásár", "gomba", "állat", "ember", "nadrág", "sapka", "kabát", "gyerek", "kacsa", "könyv", "írás", "alma", "tehén", "kutya", "madár", "létra", "dob", "csiga", "pohár", "csésze", "kulcs", "tükör", "padló", "szoba", "villám", "zebra", "repül", "tavasz", "ősz", "nyár"];
})

skipButton.addEventListener("click", function(){
    joTipp();
    kevertKi.innerHTML = kevero(szavak);
    eredmenyKi.innerHTML = "";
    eredetiTipp.value = "";
    koviGomb.style.display = "none";
})

//Theme gombok---------------------------------------------------------------------------------------------------

startButton.addEventListener("mouseenter", function( event ){
    event.target.style.backgroundColor = buttonColors[0];
})
startButton.addEventListener("mouseleave", function( event ){
    event.target.style.backgroundColor = buttonColors[1];
})


themeGomb.addEventListener("mouseenter", function( event ){
    event.target.style.backgroundColor = buttonColors[0];
})
themeGomb.addEventListener("mouseleave", function( event ){
    event.target.style.backgroundColor = buttonColors[1];
})


tippGomb.addEventListener("mouseenter", function( event ){
    event.target.style.backgroundColor = buttonColors[0];
})
tippGomb.addEventListener("mouseleave", function( event ){
    event.target.style.backgroundColor = buttonColors[1];
})


koviGomb.addEventListener("mouseenter", function( event ){
    event.target.style.backgroundColor = buttonColors[0];
})
koviGomb.addEventListener("mouseleave", function( event ){
    event.target.style.backgroundColor = buttonColors[1];
})