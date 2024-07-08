let digit=1;
let step=0;
let info=[];
for(let i=0; i<3; i++) {
    info[i]=[];
}
for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
        info[i][j]=-10;
    }
} 

let eventListener1=document.querySelectorAll('.cell');
eventListener1.forEach((cell) => {
    cell.addEventListener('click',() => {
        let index=cell.dataset.cellIndex;
        let dom=document.querySelector(`[data-cell-index="${index}"]`);
        if(dom.innerHTML==='X' || dom.innerHTML==='O') {
            alert('No changes');
        } else {
            enterInfo(digit,index,info);
            if(digit===1) {
                dom.innerHTML='X';
                document.querySelector('.change').innerHTML='O';
                step++;
                digit=0;
            } else if(digit===0) {
                dom.innerHTML='O';
                document.querySelector('.change').innerHTML='X';
                step++;
                digit=1;
            }
            
            let result=checkWinner(info);
            if(result===3) {
                document.querySelector('.change').innerHTML='X is Winner';
                reset();
                    
            } else if(result===-1) {
                document.querySelector('.change').innerHTML='O is winner';
                reset();
            }
                
            
        }
    })
    
})
let eventListener3=document.querySelector('.reset');
eventListener3.addEventListener('click',() => {
    reset();
})
function reset() {
    let eventListener2=document.querySelectorAll('.cell');
    eventListener2.forEach((cell) => {
        cell.innerHTML=' ';
    })
    step=0;
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            info[i][j]=-10; 
        }
    }
}
function enterInfo(digit,index,info) {
    let loc=Number(index);
    let pos;
    if(loc===1 || loc===4 || loc===7) {
        pos=0;
    } else if(loc===2 || loc===5 || loc===8) {
        pos=1;
    } else {
        pos=2;
    }
    if(loc===1 || loc===2 || loc===3) {
        info[0][pos]=digit;
    } else if(loc===4 || loc===5 || loc===6) {
        info[1][pos]=digit;
    } else {
        info[2][pos]=digit;
    }
    console.log('pos: '+pos);
    console.log(loc+" "+digit);
    
}
function checkWinner(info) {
    let zero=0;
    let sum=0;
    let loop;
    for(let i=0; i<3; i++) {
        loop=0;
        for(let j=0; j<3; j++) {
            loop=loop+info[i][j];
        }
        if(loop===3) {
            return 3;
        } else if(loop==0) {
            return -1;
        }
    }
    for(let i=0; i<3; i++) {
        loop=0;
        for(let j=0; j<3; j++) {
            loop=loop+info[j][i];
        }
        if(loop===3) {
            return 3;
        } else if(loop==0) {
            return -1;
        }
    }
    let check=info[0][0]+info[1][1]+info[2][2];
    if(check===3) {
        return 3;
    } else if(check===0) {
        return -1;
    }
    let check2=info[0][2]+info[1][1]+info[2][0];
    if(check2===3) {
        return 3;
    } else if(check2===0) {
        return -1;
    }
    return 0;
}