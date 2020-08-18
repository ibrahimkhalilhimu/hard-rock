
document.getElementById('searchBtn').addEventListener('click', getInput)

function getInput() {
   const input = document.getElementById('inputText').value;
   fetch(`https://api.lyrics.ovh/suggest/${input}`)
    .then(response => response.json())
    .then(data =>songList(data))
}


function songList(show){
     let data =show.data
     console.log(data)
     let list = [];
    for (let i = 0; i < 10; i++) {
        let item = {
            title: data[i].title,
            album: data[i].album.title,
            artist:data[i].artist.name

        }

        list.push(item);   
       
    }   
    console.log(list) 

    let display = document.getElementById("authorLead");
    for (let i = 0; i < list.length; i++) {
        const { title, album,artist } = list[i];
        display.innerHTML +=
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Album by <span id="album">${album}</span></p>
                <p class="author lead">Artist by <span id="album">${artist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
            <button onclick="lyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        </div>
            `  
}
       
}

function lyrics(artist,title) {
    // console.log(artist,title)
    fetch(`https://api.lyrics.ovh/v1/'${artist}'/'${title}'`)
    .then(response => response.json())
    .then(data =>displayShow(data))
}


function displayShow(part) {
     console.log(part,'hello');
    let displayInfo =document.getElementById('info');
    displayInfo.innerHTML += `
    <pre id="info"class="lyric text-white">'${part.lyrics}</pre>
`
}



