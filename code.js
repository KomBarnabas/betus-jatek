const startButton = document.getElementById("startButton");
const menuDiv = document.getElementById("menuDiv");
const diffDiv = document.getElementById('diffDiv')
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
const skipButton = document.getElementById("skipButton");
const easyGomb = document.getElementById('easyGomb');
const mediumGomb = document.getElementById('mediumGomb');
const hardGomb = document.getElementById('hardGomb');
const selectedDiff = document.getElementById('selectedDiff');
const selectButton = document.getElementById('selectButton');

const easySzavak = ['nap', 'fa', 'víz', 'bor', 'gáz', 'jég', 'ló', 'kút', 'por', 'sár', 'nyár', 'hó', 'szű', 'tű', 'zsír', 'ég', 'kék', 'baj', 'jó', 'nyíl', 'toll', 'part', 'rács', 'porc', 'zsák', 'húsz', 'csík', 'szár', 'ajak', 'füst', 'part', 'halál',
    'térd', 'nyár', 'vödör', 'csat', 'bank', 'tűz', 'kulcs', 'kötő']

const mediumSzavak = ["idegen", "asztal", "doboz", "cukor", "kerék", "tanár", "iskola", "ablak", "cipő", "füzet", "telefon", "kapu", "labda", "szék", "ceruza", "papír", "ház", "bolt", "fülke", "keres", "vásár", "gomba", "állat", "ember", "nadrág", "sapka", "kabát",
    "gyerek", "kacsa", "könyv", "írás", "alma", "tehén", "kutya", "madár", "létra", "dob", "csiga", "pohár", "csésze", "kulcs", "tükör", "padló", "szoba", "villám", "zebra", "repül", "tavasz", "ősz", "nyár"];

const hardSzavak = ['villamos', 'csalános', 'rakétázik', 'kaktuszok', 'áramszünet', 'bizalmatlan', 'színésznő', 'állomások', 'dohánybolt', 'környezet', 'fagyasztó', 'gyorsvonat', 'szabadság', 'iránytűvel', 'csillagász', 'fűnyíróval', 'körforgalom',
    'hangszerek', 'takarítasz', 'jegyzetfüzet', 'kukoricás', 'megoldásra', 'telefonált', 'toronyóra', 'cseresznyés', 'gondolkodó', 'kifestőben', 'vásárolnak', 'számológép', 'újságírók', 'beosztásod', 'kirándulni', 'tanteremben', 'iskolatáska',
    'villámcsap', 'papírrepülő', 'rajzfilmek', 'golyóstoll', 'számítógép', 'padláskulcs', 'tükörtojás', 'dinnyehéj', 'mézeskalács', 'vasalódeszka', 'szótárfüzet'];

osszSzo={
    'easy': easySzavak,
    'medium': mediumSzavak,
    'hard': hardSzavak
};

let szavak = ["asd"];

let randomSzo = "";

let darkTheme = false;
let buttonColors = ["white", "rgb(240, 240, 240)"];

let pontSzam = 0;
let rossz = 0;

let difficulty = '';

let pressedNext = false;

var mav = new Audio('mav.wav');

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
    console.log(eredetiTipp.value.toLowerCase())
    if (eredetiTipp.value.toLowerCase() === "debug"){
        skipButton.style.display = "inline";
    }else if (eredetiTipp.value.toLowerCase() === randomSzo){
       if(!pressedNext){
        joTipp()
       }
    }else if(eredetiTipp.value.toLowerCase() === 'máv'){
        mav.play();
        for (let i = 0; i <= 20; i++){
            setTimeout( () => {
                if (i < 20){
                    eredmenyKi.innerHTML = `<p>Értesítjük kedves utasainkat, hogy a vonat 20 órát késik</p><p>Még ${20-i} óra van hátra</p>`;
                }else{
                    eredmenyKi.innerHTML = "Nem találtad el. Próbáld újra";
                    rossz++;
                }
                }, i*2000);
        }
    }else{
        eredmenyKi.innerHTML = "Nem találtad el. Próbáld újra";
        rossz++;
    }
}

function joTipp(){
    eredmenyKi.innerHTML = `Eltaláltad! Az eredeti szó ${randomSzo} volt`;
    koviGomb.style.display = "inline";
    pontSzam ++;
    score.innerHTML = `Score: ${pontSzam}`;
    szavak.splice(szavak.indexOf(randomSzo), 1);
    console.log(szavak);
    pressedNext = true;
}

function mavVaras(i){
    if (i < 0){
        eredmenyKi.innerHTML = `<h1>Értesítjük kedves utasainkat, hogy a vonat 20 órát késik</h1><h1>Még ${20-i} óra van hátra</h1>`;
    }
    else{
        eredmenyKi.innerHTML = "Nem találtad el. Próbáld újra";
        rossz++;
    }
}

startButton.addEventListener("click", function(){
    menuDiv.style.display = "none";
    diffDiv.style.display="block";
    eredetiTipp.value = "";
})

tippGomb.addEventListener("click", function(){correction()});

eredetiTipp.addEventListener("keydown", (event) => {
    if (event.key == "Enter"){correction();}
})

koviGomb.addEventListener("click", function kovetkezo(){
    //Minden valtoztatast itt a kovi gombba is be kell irni
    kevertKi.innerHTML = kevero(szavak);
    eredmenyKi.innerHTML = "";
    eredetiTipp.value = "";
    koviGomb.style.display = "none";
    pressedNext = false;
})

themeGomb.addEventListener("click", function(){
    if (darkTheme){
    document.body.style.backgroundColor = "white"; document.body.style.color = "black";
    startButton.style.backgroundColor = "rgb(240, 240, 240)"; startButton.style.color = "black";
    themeGomb.style.backgroundColor = "rgb(240, 240, 240)"; themeGomb.style.color = "black";
    eredetiTipp.style.backgroundColor = "rgb(240, 240, 240)"; eredetiTipp.style.color = "black";
    tippGomb.style.backgroundColor = "rgb(240, 240, 240)"; tippGomb.style.color = "black";
    koviGomb.style.backgroundColor = "rgb(240, 240, 240)"; koviGomb.style.color = "black";
    easyGomb.style.backgroundColor = "rgb(240, 240, 240)"; easyGomb.style.color = "black";
    mediumGomb.style.backgroundColor = "rgb(240, 240, 240)"; mediumGomb.style.color = "black";
    hardGomb.style.backgroundColor = "rgb(240, 240, 240)"; hardGomb.style.color = "black";
    selectButton.style.backgroundColor = "rgb(240, 240, 240)"; selectButton.style.color = "black";

    buttonColors = ["rgb(250, 250, 250)", "rgb(240, 240, 240)"]
    darkTheme = false;
    }else{
        document.body.style.backgroundColor = "black"; document.body.style.color = "white";
        startButton.style.backgroundColor = "rgb(60, 60, 60)"; startButton.style.color = "white"; startButton.style.background;
        themeGomb.style.backgroundColor = "rgb(60, 60, 60)"; themeGomb.style.color = "white";
        eredetiTipp.style.backgroundColor = "rgb(60, 60, 60)"; eredetiTipp.style.color = "white";
        tippGomb.style.backgroundColor = "rgb(60, 60, 60)"; tippGomb.style.color = "white";
        koviGomb.style.backgroundColor = "rgb(60, 60, 60)"; koviGomb.style.color = "white";
        easyGomb.style.backgroundColor = "rgb(60, 60, 60)"; easyGomb.style.color = "white";
        mediumGomb.style.backgroundColor = "rgb(60, 60, 60)"; mediumGomb.style.color = "white";
        hardGomb.style.backgroundColor = "rgb(60, 60, 60)"; hardGomb.style.color = "white";
        selectButton.style.backgroundColor = "rgb(60, 60, 60)"; selectButton.style.color = "white";

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
    //Minden valtoztatast itt a kovi gombba is be kell irni
    joTipp();
    kevertKi.innerHTML = kevero(szavak);
    eredmenyKi.innerHTML = "";
    eredetiTipp.value = "";
    koviGomb.style.display = "none";
    pressedNext = false;
})

easyGomb.addEventListener('click', function(){
    easyGomb.style.borderColor ="red"; easyGomb.style.borderWidth ='5px';
    mediumGomb.style.borderColor ="black"; mediumGomb.style.borderWidth ='2px';
    hardGomb.style.borderColor ="black"; hardGomb.style.borderWidth ='2px';
    
    selectedDiff.innerHTML ='Easy';
    difficulty = 'easy';
    selectButton.style.display = 'inline';
})

mediumGomb.addEventListener('click', function(){
    mediumGomb.style.borderColor ="red"; mediumGomb.style.borderWidth ='5px';
    easyGomb.style.borderColor ="black"; easyGomb.style.borderWidth ='2px';
    hardGomb.style.borderColor ="black"; hardGomb.style.borderWidth ='2px';

    selectedDiff.innerHTML ='Medium';
    difficulty = 'medium';
    selectButton.style.display = 'inline';
    
})

hardGomb.addEventListener('click', function(){
    hardGomb.style.borderColor ="red"; hardGomb.style.borderWidth ='5px';
    mediumGomb.style.borderColor ="black"; mediumGomb.style.borderWidth ='2px';
    easyGomb.style.borderColor ="black"; easyGomb.style.borderWidth ='2px';

    selectedDiff.innerHTML ='Hard';
    difficulty = 'hard';
    selectButton.style.display = 'inline';
})

selectButton.addEventListener('click', function(){
    szavak = osszSzo[difficulty].slice();
    diffDiv.style.display = 'none';
    jatekDiv.style.display ='inline';
    kevertKi.innerHTML = kevero(szavak);
})

//Theme gombok---------------------------------------------------------------------------------------------------
if (true){
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

    easyGomb.addEventListener("mouseenter", function( event ){
        event.target.style.backgroundColor = buttonColors[0];
    })
    easyGomb.addEventListener("mouseleave", function( event ){
        event.target.style.backgroundColor = buttonColors[1];
    })

    mediumGomb.addEventListener("mouseenter", function( event ){
        event.target.style.backgroundColor = buttonColors[0];
    })
    mediumGomb.addEventListener("mouseleave", function( event ){
        event.target.style.backgroundColor = buttonColors[1];
    })

    hardGomb.addEventListener("mouseenter", function( event ){
        event.target.style.backgroundColor = buttonColors[0];
    })
    hardGomb.addEventListener("mouseleave", function( event ){
        event.target.style.backgroundColor = buttonColors[1];
    })

    selectButton.addEventListener("mouseenter", function( event ){
        event.target.style.backgroundColor = buttonColors[0];
    })
    selectButton.addEventListener("mouseleave", function( event ){
        event.target.style.backgroundColor = buttonColors[1];
    })
}
