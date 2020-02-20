/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var rezultati, rezultatRunde, trenutniIgrac, igraTraje;

    init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(igraTraje){
    //1. random broj
    var kocka = Math.floor(Math.random() * 6) + 1;
    var kocka2 = Math.floor(Math.random() * 6) + 1;

    //2. prikaz rezultata
    var kockaDOM = document.querySelector('.dice');
    kockaDOM.style.display = 'block';
    kockaDOM.src = 'dice-' + kocka + '.png';

    var kockaDOM2 = document.querySelector('.dice2');
    kockaDOM2.style.display = 'block';
    kockaDOM2.src = 'dice-' + kocka2 + '.png';

    //3. dodavanje rezultata runde ako rezultat NIJE 1
    if ((kocka !==1) && (kocka2 !==1)){
        //dodaj rezultat
        rezultatRunde += kocka + kocka2;
        document.querySelector('#current-' + trenutniIgrac).textContent = rezultatRunde;
    }else{
        //sledeci igrac
        sledeciIgrac();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (igraTraje){
    //dodavanje trenutnog rezultata u glavni rezultat
    rezultati[trenutniIgrac] += rezultatRunde;

    //azuriranje interfejsa
    document.querySelector('#score-' +  trenutniIgrac).textContent = rezultati[trenutniIgrac];

    //provera da li je igrac pobedio
    if (rezultati[trenutniIgrac] >= 100){
        document.querySelector('#name-' + trenutniIgrac).textContent = 'Pobednik!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + trenutniIgrac + '-panel').classList.add('winner');
        document.querySelector('.player-' + trenutniIgrac + '-panel').classList.remove('active');
        igraTraje = false;
    }else{
        sledeciIgrac();
        }
    }

});

function sledeciIgrac(){
    trenutniIgrac === 0 ? trenutniIgrac = 1 : trenutniIgrac = 0;
        rezultatRunde = 0;

        document.getElementById('current-0').textContent='0';
        document.getElementById('current-1').textContent='0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    rezultati = [0,0];
    rezultatRunde = 0;
    trenutniIgrac = 0;
    igraTraje = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Igrac 1';
    document.getElementById('name-1').textContent = 'Igrac 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
