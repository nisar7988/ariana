// initializing the variables
let volumeDisplay = document.getElementById('volume-value')
let audioElement = new Audio('songs/1.mp3')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay')
let volume = document.querySelector("#volume-control");
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let en=0;

//song detailsa
let songs = [
    { songName: "Let me love u", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "dangerous woman", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "7 rings", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "don't call me angel", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "position", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "side-to-side", filePath: "songs/6.mp3", coverPath: "covers/1.jpg" },
    { songName: "god is a woman", filePath: "songs/7.mp3", coverPath: "covers/6.jpg" }
]


songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

//handle playback pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
        console.log()
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle')
        masterPlay.classList.remove('fa-pause-circle')
        gif.style.opacity = 0;

    }
})


//listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seakBar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress


    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    })


    const makeAllPlays = () => {

        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

            element.classList.remove('fa-pause-circle')
            element.classList.add('fa-play-circle')

        })
    }
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
    
   
    makeAllPlays();
    songIndex = parseInt(e.target.id)
    e.target.classList.remove('fa-play-circle')
    e.target.classList.add('fa-pause-circle')
    audioElement.src = `songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex - 1].songName
    audioElement.currentTime = 0;
    audioElement.play()
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
  
    })



    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= 7)
            songIndex = 0
        else
            songIndex += 1

        audioElement.src = `songs/${songIndex + 1}.mp3`
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })

    document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0)
            songIndex = 0
        else
            songIndex -= 1

        audioElement.src = `songs/${songIndex + 1}.mp3`
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')

    })

    // vlume controler
    volume.addEventListener("change", (e) => {
        audioElement.volume = e.currentTarget.value / 100;
        volumeDisplay.innerText = parseInt((e.currentTarget.value / 100) * 10)
    }
    )
})
})