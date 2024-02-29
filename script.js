


let score = 0
let RunDataFlow = 1
let staticDF = 1
let cross = true
let rangeSpeed = 3

let bgMusic = new Audio('music/bg-music.mpeg')
let endAudio = new Audio('music/end.mpeg')
setTimeout(() => {
    bgMusic.play()
     console.log('playing'); 
}, 1000);
// let studentMovement = true



document.onkeydown = function (e) {
    // console.log(studentMovement);
    // console.log('key function executed');
    // console.log('key code is : ', e.keyCode);

    let student = document.querySelector('#student')
    if (e.keyCode == 38) {


        student.classList.add('animateStudentup')
        setTimeout(() => {
            student.classList.remove('animateStudentup')
        }, 600);
    }

    if (e.keyCode == 39) {


        let sleft = parseInt(window.getComputedStyle(student, null).getPropertyValue('left'))
        // console.log(sleft);
        student.style.left = sleft + 102 + 'px'


    }
    if (e.keyCode == 37) {

        //   ques : its not working for right in properValue as well as style.right 
        // let sright = parseInt(window.getComputedStyle(student, null).getPropertyValue('right'))
        // console.log(sright);
        // student.style.right = sright - 50 + 'px'

        let sright = parseInt(window.getComputedStyle(student, null).getPropertyValue('left'))
        // console.log(sright);
        student.style.left = sright - 102 + 'px'
    }
}




let end = setInterval(() => {
    // used to detect collision and if not then increase score as well as speed of obstacle

    // console.log('interval exe');

    let student = document.querySelector('.student')
    let obstacle = document.querySelector('.obstacle')
    let gameOver = document.querySelector('.gameOver')

    sx = parseInt(window.getComputedStyle(student, null).getPropertyValue('left'))
    sy = parseInt(window.getComputedStyle(student, null).getPropertyValue('top'))



    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

    let offsetX = Math.abs(sx - ox);
    let offsetY = Math.abs(sy - oy);
    //  console.log(offsetX,offsetY);




    if (offsetX < 108 && offsetY < 54) {
        // console.log('collision');
        gameOver.style.visibility = 'visible';
        let finalObsValue = window.getComputedStyle(obstacle, null).getPropertyValue('left')

        obstacle.setAttribute('style', `left:  ${finalObsValue} ;`)

        obstacle.classList.remove('obstacleAni')
        // console.log(end);
        bgMusic.pause()
        setTimeout(() => {
            
            endAudio.play()
        }, 500);
      
     
        clearInterval(end)
    }

    else if (offsetX < 108 && cross) {

        // console.log('thsi is offset x',offsetX);
        inceaseSpeed()

        score += 1;
        updateScore(score)
        cross = false
        dataFlow()
        // console.log(cross);
        setTimeout(() => {
            cross = true
        }, 1000);
    }






}, 10);


function inceaseSpeed() {
    // to inceaseSpeed of the obstacle 

    let obstacleAni = document.querySelector('.obstacle')
    let speed = parseFloat(window.getComputedStyle(obstacleAni, null).getPropertyValue('animation-duration'))
    if (speed < rangeSpeed ) {
        return 0;
    }
    else {


        speed = (speed - (0.2));


        obstacleAni.style.animationDuration = `${speed}s `

    }
}


function updateScore(score) {
    // console.log('update exe');

    let scoreCount = document.getElementById('scoreCount')

    scoreCount.innerHTML = `Your score: ${score}`
}

 let year = document.querySelector('.year')



function dataFlow() {

    console.log(score);
    let obs = document.getElementById('obs')
    let arr = ['assignment.jpg', 'midTerm.jpg', 'assignment.jpg', 'midTerm.jpg', 'files.jpg', 'main\ exam.png', 'viva.jpg']
    if (staticDF > 4) {
        // for placement
        console.log('exe end');
        obs.style.backgroundImage = `url('images/placement.jpg')`
        return 0;
    }
    else if (RunDataFlow == arr.length) {

        // for a year
        year.innerHTML =       `Year Completed:   ${  +staticDF}`
       
        rangeSpeed = rangeSpeed - 0.3
        console.log('exe change arr ');
        RunDataFlow = 0;
        staticDF += 1
    }
    if (RunDataFlow < arr.length) {
        // for each activites within a year 
        console.log('exe arr');
        obs.style.backgroundImage = `url('images/${arr[RunDataFlow]}')`
        RunDataFlow += 1

    }

    // console.log(obs);
}





// (ass > mid > ass > mid > files > main > viva ) *4 > placement 