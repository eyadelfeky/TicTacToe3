const tiles = document.querySelectorAll('.tile')
let i = 0;
const svgs = ["x.svg", "O.svg" ,"triangle.svg"];
for(const tile of tiles){
    tile.addEventListener('click' , currentPlayer)
    tile.addEventListener('click' , fill)
}
function currentPlayer(e){
    const selected = e.target;
    if(selected.childNodes.length === 0){
        switch(i){
            case 1: 
                document.body.style.backgroundPosition = '35%';
                document.body.style.transition = 'background-position 1s ease';
                break;
            case 2: 
                document.body.style.backgroundPosition = '65%';
                document.body.style.transition = 'background-position 1s ease';
                break;
            case 3: 
                document.body.style.backgroundPosition = '100%';
                setTimeout(() => {
                    document.body.style.transition = 'none'
                    document.body.style.backgroundPosition = '0%'
                }, 1000);
                i = 0;         
        }
        i++;
        return i;
    }  
}
function fill(e){
    const selected = e.target;
    if(selected.childNodes.length === 0){
        let board = [];
        const img = document.createElement('img');
        currentPlayer
        img.setAttribute('src' , svgs[i-1]);
        selected.appendChild(img);
        
        for(const tile of tiles){
            if(tile.childNodes.length !== 0){
                board.push(svgs.indexOf(tile.firstChild.getAttribute('src'))+1);
            }
            else{
                board.push(0);
            }
        }
        board = [board.slice(0 , 4), board.slice(4 , 8)  , board.slice(8 , 12) , board.slice(12 , 16)];
        board = (board.join('-').replace(/,/g , ''));
        let status;
        if((/111|1...1...1|1....1....1|1.....1.....1/g).test(board)){
            endgame();
            status = 1;
        }
        else if((/222|2...2...2|2....2....2|2.....2.....2/g).test(board)){
            endgame();
            status = 2; 
        }
        else if((/333|3...3...3|3....3....3|3.....3.....3/g).test(board)){
            endgame();
            status = 3;
        }
        else if(!board.includes(0)){
            status = 0;
        }
        else{
            status = -1;
        }
        winnerMessage(status)
    }   
    

}
function endgame(){
    for(const tile of tiles){
        tile.removeEventListener('click' , currentPlayer)
        tile.removeEventListener('click' , fill)
    }
}
function winnerMessage(s){
    if(s > 0){
        const message = document.createElement('div');
        message.innerHTML = `Player <img src=${svgs[s-1]}> has won!`
        message.classList.add('message')
        document.body.appendChild(message);
    } 
    if(s === 0){
        const message = document.createElement('div');
        message.innerHTML = 'It is a Tie!';
        message.classList.add('message')
        document.body.appendChild(message);
    } 

}


