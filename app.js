// Тоглоомын бүх газарт ашиглагдах хувьсагч энд зарлана.
//Тоглоом дууссан эсэх төлөвийг харах
var isNewGame;
//Аль тоглогч шоо шидэх эсэхийг энд хадгална.
var activePlaver;
// Хоёр тоглогчийн цуглуулсан оноо
var scores;
// идэвхтэй тоглогчийн цуглуулж байгаа оноо
var roundScore;
// шооны зургийг зүүлэх ДОМ-с хайж олоод хадгалах
var diceDom = document.querySelector(".dice");
//Тоглоом эхлүүлнэ
initGame();
//Тоглоом шинээр эхлэх лист
function initGame(){
isNewGame=true;
    //Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1
activePlaver = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
scores = [0,0];

//Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
roundScore = 0;
//<div class="player-score" id="score-0">43</div>
//window.document.querySelector('#score-0').textContent = dice;
//document.querySelector('#score-1').innerHTML = "<em>Yes?<em>";

//Програм эхлэхэд бэлтгэе
document.getElementById('score-0').textContent = "0";
document.getElementById('score-1').textContent = "0";
document.getElementById('current-0').textContent = "0";
document.getElementById('current-1').textContent = "0";
//Тоглогчдын нэрийг буцааж гаргах
document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
diceDom.style.display="none";
}
//  Шоог шидэх эвэнт листенер
document.querySelector(".btn-roll").addEventListener("click", function(){
    if(isNewGame){
        // 1-6 хүртэл санамсаргүй нэг тоог гаргаж авна
    var diceNumber = Math.floor(Math.random()*6)+1;
    // Шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.style.display="block";
    // Буусан санамсаргүй тоог вэб дээр гаргаж ирнэ.
    diceDom.src='dice-'+diceNumber+'.png';
    // Буусан тоо нь 1-с ялгаатай бол идэвхтэй ээлжийн оноог нэмэгдүүлнэ.
    if(diceNumber!==1){
        //1-ээс ялгаатай тоо буулаа
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" + activePlaver).textContent = roundScore;
    } else{
        switchToNextPlayer();
    }
    } else {
        alert('Тоглоом дууслаа NEW GAME товч дарна уу');
    }

    
});

//HOLD Товчны эвэнт листенер
document.querySelector(".btn-hold").addEventListener("click",function(){
    //Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
    
    if(isNewGame){
        scores[activePlaver] = scores[activePlaver] + roundScore;
        //уг тоглогч хожсон эсэхийг шалгах
        // Дэлгэц дээр нь оноог нь өөрчлөнө
        document.getElementById("score-" + activePlaver).textContent=scores[activePlaver];
        if(scores[activePlaver]>=90){
            // Тоглоомыг дууссан төлөвт оруулна
            isNewGame=false;
            // ялагч гэсэн текстийг нэрний оронд гаргана
            document.getElementById('name-'+activePlaver).textContent='WINNER!';
            document.querySelector('.player-'+activePlaver+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlaver+'-panel').classList.remove('active');
        } else{
            //Ээлжийн оноог нь 0 болгоно
        switchToNextPlayer();
        }
    } else {
        alert('Тоглоом дууслаа NEW GAME товч дарна уу');
    }
});
// Энэ функц нь тоглогчийн ээлжийг дараачийн тоглогчруу шилжүүлэх
function switchToNextPlayer(){
    roundScore=0;
    document.getElementById("current-" + activePlaver).textContent = 0;
    activePlaver===0 ? (activePlaver=1) : (activePlaver=0);
    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
    // Шоог түр алга болгоно.
    diceDom.style.display="none";
// Тоглогчийн ээлжийг сольно.
}
//newgame товч дарж Шинэ тоглоом эхлүүлэх эвэнт лист
document.querySelector('.btn-new').addEventListener('click',initGame);
