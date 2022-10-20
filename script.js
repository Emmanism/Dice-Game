var points, CurrentPoints, activePlayer, gameplay, rang, prev1, prev2, input;
document.getElementById('a1').style.display='flex'
document.getElementById('a2').style.display='none'
document.getElementById('a3').style.display='none'

document.querySelector('.btn--play').addEventListener('click',function(){
    document.getElementById('a1').style.display='none'
    document.getElementById('a2').style.display='flex'
    document.getElementById('a3').style.display='none'
})

document.querySelector('.btn--exit').addEventListener('click',function(){
    document.getElementById('a2').style.display='none'
    document.getElementById('a3').style.display='none'
    document.getElementById('a1').style.display='flex'
})

document.getElementById('btn--select').addEventListener('click',function(){
    document.getElementById('a2').style.display='none'
    document.getElementById('a3').style.display='flex'
    document.getElementById('a1').style.display='none'
    var input=document.getElementById('input').value;
    if (input) {
        rang =input;
        alert('You have chosen a winning score of '+ input)
    } else {
        rang =100
        alert('Since you did not choose any winning score, i have selected ' + 100)
    }
    console.log(input)
})


initialize();


function nextPlayer(){
    activePlayer===0? activePlayer=1 : activePlayer=0;
    CurrentPoints=0
    document.getElementById('current--0').textContent=0
    document.getElementById('current--1').textContent=0

    document.querySelector('.player--1').classList.toggle('player--active')
    document.querySelector('.player--0').classList.toggle('player--active')

    document.querySelector('#dice--0').style.display='none'
    document.querySelector('#dice--1').style.display='none'
}

document.querySelector('.btn--roll').addEventListener('click', function(){
    if (gameplay) {
        var dicey1= Math.floor(Math.random()*6)+1;
        var dicey2= Math.floor(Math.random()*6)+1;
        var dicer1=document.getElementById('dice--0');
        var dicer2=document.getElementById('dice--1');

        if (dicey1!==1 && dicey2!==1) {
            CurrentPoints+=dicey1+dicey2;
            dicer1.style.display='block';
            dicer1.src='dice-'+dicey1+'.png';
            dicer2.style.display='block';
            dicer2.src='dice-'+dicey2+'.png';
            document.querySelector('#current--'+ activePlayer).textContent = CurrentPoints;
            if ((points[activePlayer]+CurrentPoints)>=rang) {
                alert('Now we have a winner with a total of '+ (points[activePlayer] + CurrentPoints)+' points.')
                document.getElementById('name--'+activePlayer).textContent= 'WINNER!!!';
                document.querySelector('.player--'+activePlayer).classList.add('player--winner');
                document.querySelector('.player--0').classList.remove('player--active');
                document.querySelector('.player--1').classList.remove('player--active');
                document.getElementById('score--'+activePlayer).textContent=points[activePlayer]+CurrentPoints;
                document.querySelector('#dice--0').style.display='none';
                document.querySelector('#dice--1').style.display='none';
                gameplay=false;
            }

        } else if ((prev1===6 && prev1===dicey1)||(prev2===6 && prev2===dicey2)) {
            points[activePlayer]=0
            document.getElementById('score--'+ activePlayer).textContent = points[activePlayer];
            nextPlayer();
        } else {
            points[activePlayer] += CurrentPoints;
            document.getElementById('score--'+ activePlayer).textContent = points[activePlayer];
            next();
            nextPlayer();
        }
        var prev1 = dicey1;
        var prev2 = dicey2;
    }

})

document.querySelector('.btn--hold').addEventListener('click',function(){
    if (gameplay) {
        points[activePlayer] += CurrentPoints;
        document.getElementById('score--'+ activePlayer).textContent = points[activePlayer];
        var input=document.getElementById('input').value;
        console.log('input is '+input)
        if (input){

        }
        next();
        nextPlayer();
    }
})


document.querySelector('.btn--new').addEventListener('click',initialize)

function initialize(){
    document.querySelector('.player--0').classList.remove('player--winner');  
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.getElementById('name--0').textContent= 'FIRST PLAYER';
    document.getElementById('name--1').textContent= 'SECOND PLAYER';
    document.getElementById('current--0').textContent=0
    document.getElementById('current--1').textContent=0
    document.getElementById('score--0').textContent=0
    document.getElementById('score--1').textContent=0
    points=[0,0];
    CurrentPoints=0;
    activePlayer=0;
    gameplay=true;
    document.getElementById('dice--0').style.display='none';
    document.getElementById('dice--1').style.display='none';
}

function next() {
 
    if ((points[activePlayer])>=rang) {
        alert('Now we have a winner with a total of '+ points[activePlayer] + ' points.')
        document.getElementById('name--'+activePlayer).textContent= 'WINNER!!!';
        document.querySelector('.player--'+activePlayer).classList.add('player--winner');
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
        document.getElementById('score--'+activePlayer).textContent=points[activePlayer];
        document.querySelector('#dice--0').style.display='none';
        document.querySelector('#dice--1').style.display='none';
        gameplay=false;
    }
}
