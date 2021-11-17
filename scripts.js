let $youVoteFor = document.querySelector('.d-1-1 span');
let $office = document.querySelector('.d-1-2 span');
let $description = document.querySelector('.d-1-4');
let $rules = document.querySelector('.d-2');
let $side = document.querySelector('.d-1-right');
let $numbers = document.querySelector('.d-1-3');

let phaseCurrent = 0;
let number = '';
let voteBlank = false;
let votes=[];

function startPhase() {
    let phase = phases[phaseCurrent];

    let numberHtml = '';
    voteBlank=false;

    number='';

    for (let i = 0; i < phase.numbers; i++) {
        if (i === 0) {
            numberHtml += '<div class="number blink"></div>';
        } else {
            numberHtml += '<div class="number"></div>';
        }

    }

    $youVoteFor.style.display = 'none';
    $office.innerHTML = phase.title;
    $description.innerHTML = '';
    $rules.style.display = 'none';
    $side.innerHTML = '';
    $numbers.innerHTML = numberHtml;
}

function updateInterface() {
    let phase = phases[phaseCurrent];
    let candidate = phase.candidates.filter((item) => {
        if (item.number === number) {
            return true;
        } else {
            return false;
        }
    });

    if (candidate.length>0){
        candidate = candidate[0];
        $youVoteFor.style.display = 'block';
        $rules.style.display = 'block';
        $description.innerHTML = `Name: ${candidate.name} <br>Partido: ${candidate.party}`;
        

        let photosHtml='';
        for(let i in candidate.photos){
            if(candidate.photos[i].small){
                photosHtml+= ` <div class="d-1-image small">
                <img src="img/${candidate.photos[i].url}" alt="${candidate.photos[i].subtitle}">
                ${candidate.photos[i].subtitle}
            </div>`;
            }else{
                photosHtml+= ` <div class="d-1-image">
                <img src="img/${candidate.photos[i].url}" alt="${candidate.photos[i].subtitle}">
                ${candidate.photos[i].subtitle}
            </div>`;
            }
            
        }

        $side.innerHTML=photosHtml;
    }else{
        $youVoteFor.style.display = 'block';
        $rules.style.display = 'block';
        $description.innerHTML = '<div class="warning--big  blink">VOTE NULL</div>';
    }

}

function clickn(n) {
    let $elnumber = document.querySelector('.number.blink');
    if ($elnumber !== null) {
        $elnumber.innerHTML = n;
        number = `${number}${n}`;

        $elnumber.classList.remove('blink');
        if ($elnumber.nextElementSibling !== null) {
            $elnumber.nextElementSibling.classList.add('blink');
        } else {
            updateInterface();
        }
    }
}

function blank() {
    number='';
    voteBlank = true;    
    $youVoteFor.style.display = 'block';
    $rules.style.display = 'block';
    $numbers.innerHTML = '';
    $description.innerHTML = '<div class="warning--big  blink">VOTE BLANK</div>';
    $side.innerHTML = '';
   
}
function correct() {
    startPhase();
}
function ok() {
    let phase = phases[phaseCurrent];
    let voteOk =false;

    if(voteBlank===true){
        voteOk=true;
        votes.push({
            phase: phases[phaseCurrent].title,
            vote:'Blank'
        });
    } else if(number.length === phase.numbers){
        voteOk=true;
        votes.push({
            phase: phases[phaseCurrent].title,
            vote:number
        });
    }

    if(voteOk){
        phaseCurrent++;
        if(phases[phaseCurrent]!==undefined){
            startPhase();
        }else {
            document.querySelector('.screen').innerHTML='<div class="warning--giant  blink">END!</div>';
            console.log(votes);
        }
    }
}


startPhase();