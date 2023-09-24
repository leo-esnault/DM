var compteur;
var nbMystere = 0;
var messErreur = "On a dit un nombre entier";
var messEchec = "C'est perdu ! Le nombre Mystère était";
var messVictoire = "C'est gagné ! Le nombre Mystère était bien";
var messPlus = "C'est plus";
var messMoins = "C'est moins";
var boutonValider;
var inputElement;
var reponse;

function init() {
    compteur = 1;
    nbMystere = Math.floor(Math.random() * 101);
    console.log(nbMystere);
    boutonValider = document.getElementById("valider");
    boutonValider.textContent = "Essayer";
    inputElement = document.getElementById("input");
    reponse = document.getElementById("message");
    boutonValider.addEventListener("click", calculer);
}

function calculer() {
    var valeurInput = inputElement.value;
    var entierInput = parseInt(valeurInput); // essaye de convertir en entier
    if (compteur != 6) {
        if (isNaN(entierInput)) {
            messageReponse(messErreur, "black");
            ++compteur;
            return;
        }
    }

    if (entierInput === nbMystere) {
        messageReponse(messVictoire, "green", nbMystere);
        rejouer();
        return;
    }
    else if (entierInput < nbMystere) {
        messageReponse(messPlus, "blue");
    }
    else {
        messageReponse(messMoins, "blue");
    }
    if (compteur === 6) {
        messageReponse(messEchec, "red", nbMystere);
        rejouer();
        return;
    }
    ++compteur;
}

function messageReponse(messageVoulu, couleur, mystere) {
    mystere = mystere || ""; //si mystere est undefined alors ca met rien 
    reponse.innerHTML = '<span style="color: ' + couleur + ';">[' + compteur + '] ' + messageVoulu + ' ' + mystere + '</span>';
}

function rejouer() {
    boutonValider.textContent = "Rejouer";
    boutonValider.removeEventListener("click", calculer);
    boutonValider.addEventListener("click", function reset() {
        reponse.innerHTML = "";
        inputElement.value = "";
        boutonValider.removeEventListener("click", reset);
        init();
    });
}