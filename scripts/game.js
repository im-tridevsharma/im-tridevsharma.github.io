
//js game script
score = 0;
cross = true;
start = new Audio('start.mp3');
over = new Audio('over.mp3');
setTimeout(()=>{
    start.play();
},1000);
document.onkeydown = (e) => {
    init(e);
}

function init(e) {
    const dino = document.querySelector('.dragon');
    const obstacle = document.querySelector('.obstacle');
    const gameOver = document.querySelector('.gameOver');

    if(e.keyCode === 38) {
        dino.classList.add('animateDino');
        setTimeout(()=> {
            dino.classList.remove('animateDino');
        }, 600);
    }else if(e.keyCode === 39) {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx + 150 + 'px';
    }else if(e.keyCode === 37) {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dx - 150) + 'px';
    }
    const crossCheck = setInterval(()=>{
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offsetX = Math.abs(dx-ox);
        offsetY = Math.abs(dy-oy);

        if(offsetX < 100 && offsetY < 55) {
            obstacle.classList.remove('obstacleRun');
            gameOver.style.visibility = 'visible';
            start.play();
            over.play();
            setTimeout(()=>{
                start.pause();
            },200);
            clearInterval(crossCheck);
        }else if(offsetX < 130 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(()=>{
                cross = true;
            },1000);

            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            setTimeout(()=>{
                newDur = aniDur - 0.1;
                if(newDur >= 1){
                    obstacle.style.animationDuration = newDur + 's';
                }
            },700);
        }
    },10);
}

function updateScore(score) {
    document.querySelector('.gameScore').innerHTML = "Your Score: "+score;   
}
