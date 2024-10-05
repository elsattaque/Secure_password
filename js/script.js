
console.log("Je suis la console !");
function bienvenu(){
    alert("😎 Je suis un message dans une fenêtre pop-up 🐱‍🏍");
};

//setInterval(bienvenu, 1000);
//setInterval(bienvenu, 5000);
// function generer(){
//     var monformulaire = document.forms.ajoutPWD;
//     //ou document.forms['ajoutPWD']
//     console.log(monformulaire.nombrecar.value);

//     //création d'une nouvelle ligne qui sera ajouté au tableau
//     var newLine = document.createElement("tr");
//     //création de 3 cellues
//     var col1 = document.createElement("td");
//     var col2 = document.createElement("td");
//     var col3 = document.createElement("td");
//     var col4 = document.createElement("td");
//     var col5 = document.createElement("td");
//     //ajout de valeurs par défaut aux 5 cellules
//     col1.textContent = "val1";
//     col2.textContent = "val2";
//     col3.textContent = "val3";
//     col4.textContent = "val4";
//     col5.textContent = "val5";

//     newLine.append(col1,col2,col3, col4, col5);

//     var monTableau = document.getElementById("montab");
//     monTableau.appendChild(newLine);
    
// }

var minuscule = "abcdefghijklmnopqrstuvwxyz";
var majuscule = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var chiffre = "0123456789";
var carspecial = "%!&*^()#$:";

var val = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#addPWD').addEventListener('submit', function() { //Lorsqu'on clique sur le bouton ajouter = submit        
        var monformulaire = document.forms.ajoutPWD;
        //Si au moins un critère est check
        if(monformulaire.elements["minuscule"].checked || monformulaire.elements["majuscule"].checked || monformulaire.elements["chiffre"].checked || monformulaire.elements["symbole"].checked) {
            generer(val);
            val = val+1; //val = id du nouveau bouton copier
            document.ajoutPWD.reset();
        }else {
            alert("Veuillez sélectionner au moins un critères !");
        };
    });
});

function generer(val){

    var min = 0;
    var maj = 0;
    var chif = 0;
    var sym = 0;

    var monformulaire = document.forms.ajoutPWD;
    var password =""; // Variable contenant le mot de passe
    var listecar=""; // Liste contenant tous les caractères que le mot de passe peut avoir

    if (monformulaire.elements["minuscule"].checked){ // Vérifie si la case minuscule est cochée
        listecar+=minuscule; 
        min=1;
    }
    if (monformulaire.elements["majuscule"].checked){ // Vérifie si la case majuscule est cochée
        listecar+=majuscule;
        maj=1;
    }
    if (monformulaire.elements["chiffre"].checked){ // Vérifie si la case chiffre est cochée
        listecar+=chiffre;
        chif=1;
    }
    if (monformulaire.elements["symbole"].checked){ // Vérifie si la case symbole est cochée
        listecar+=carspecial;
        sym=1;
    }
    var verif = 1;
    while(verif==1){
        for (var i = 1; i <= monformulaire.elements["nombrecar"].value; i++) {
              var randomNumber = Math.floor(Math.random() * listecar.length);
              password += listecar.substring(randomNumber, randomNumber +1);
        }
        console.log(password);
        if (((contient_carspecial(password) == false)&&(sym==1)) || ((contient_minuscule(password) == false)&&(min == 1)) || ((contient_majuscule(password) == false)&&(maj == 1)) || ((contient_chiffre(password) == false)&&(chif == 1))){
            verif = 1;
        }
        else {
            verif = 0;
            var newLine = document.createElement("tr");
            var nbCarac = document.createElement("td");
            var DateG = document.createElement("td");
            var cat = document.createElement("td");
            var site = document.createElement("td");
            var pwd = document.createElement("td");
            var duree = document.createElement("td");
            nbCarac.textContent = document.getElementById("nombrecar").value;
            DateG.textContent = document.getElementById("dateg").value;
            cat.textContent = document.getElementById("categorie").value;
            site.textContent = document.getElementById("site").value;
            pwd.classList.add("pwd")
            pwd.textContent = password;
            duree.classList.add("duree");
            duree.textContent = ("0");
            
            //création d'objet puis je les stock (pour l'history plus tard)
            pushPWD(PwdSaisi(password));
            
            //bouton copier
            var newbouton = document.createElement("button");
            newbouton.textContent = "Copie";
            newbouton.classList.add("bouton");
            newbouton.setAttribute("id", val); //id qui s'incrémente
            newbouton.value = password;
            newbouton.addEventListener('click', function() { //lorsque le bouton copier est cliqué
                copyPWD(this.id); //this = prend l'id spécifique au bouton copier (si on met juste "id" -> prend juste l'id du dernier bouton créé)
            });
            
            newLine.append(nbCarac, DateG, cat, site, pwd, duree, newbouton);

            var monTableau = document.getElementById("montab");
            monTableau.appendChild(newLine);
  
        }
        password="" // A NE PAS OUBLIER 
    } // Fin de la boucle while permettant de regénérer un mot de passe si un caractère souhaité n'est pas présent
    verif = 1;
}

//bouton copier = copier le mot de passe
function copyPWD(idBtn) {
    var copyText = document.getElementById(idBtn).value; //prend la value = password
    //console.log(copyText);
    navigator.clipboard.writeText(copyText); //copie dans le presse papier
    alert("Le mot de passe a bien été copié : " + copyText);
}

function contient_carspecial(str) {
    const specialChars = /[%!&*^()#$:]/;
    return specialChars.test(str);
  }
  function contient_minuscule(str) {
    const specialChars = /[abcdefghijklmnopqrstuvwxyz]/;
    return specialChars.test(str);
  }
  function contient_majuscule(str) {
    const specialChars = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    return specialChars.test(str);
  }
  function contient_chiffre(str) {
    const specialChars = /[0123456789]/;
    return specialChars.test(str);
  }

function incrementerDuree() {
    let durees = document.getElementsByClassName("duree");
    let passwd = document.getElementsByClassName("pwd");
    let i=0; 
    if (durees.length != 0) {
        Array.prototype.forEach.call(durees, function(dureeElement) {
            let valeur = parseInt(dureeElement.textContent);
            if (valeur == 60) {
                dureeElement.style.color = "grey";
                passwd[i].textContent = "Expiré !";
                i = i+1;
            }
            else {
                dureeElement.textContent = valeur + 1;
            }
        });
    }
}
setInterval(incrementerDuree, 1000);

//bouton supp = supprime toutes les lignes du tableau
function supprimer() {
    if (confirm("Confirmez-vous la suppression de tous les mots de passe générés ?")) { 
        //document.ajoutPWD.submit();
        var monTableau = document.getElementById("montab");
        var longtab = monTableau.rows.length;
        while (longtab > 1) { //>1 car il faut garder la première colonne avec les titres
            var lastrow = monTableau.lastChild;
            monTableau.removeChild(lastrow); //supprime la dernière colonne
            var longtab = monTableau.rows.length;
        }
    }
}

//ajout d'une ligne avec les éléments du json (mis en paramètres)
function ajouter_json(val1, val2, val3, val4, val5) {
    var newLine = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");
    var col4 = document.createElement("td");
    var col5 = document.createElement("td");

    col1.textContent = val1;
    col2.textContent = val2;
    col3.textContent = val3;
    col4.textContent = val4;
    col5.textContent = val5;

    newLine.append(col1, col2, col3, col4, col5);
    var monTableau = document.querySelector('.box #montab');
    monTableau.appendChild(newLine);
}

pwdArray = [];

//stockage de mes password
function pushPWD(mesPWDs) {
    pwdArray.push(mesPWDs);
    let objPwd = JSON.stringify(pwdArray);
    localStorage.setItem("pwd", objPwd);
    console.log(objPwd);
}

//classe de mes objets du tableau 
class PWD {
    constructor(val1, val2, val3, val4, val5) {
        this.val1 = val1;
        this.val2 = val2;
        this.val3 = val3;
        this.val4 = val4;
        this.val5 = val5
    }

    //print les valeurs de mon objet
    printPwd() {
        console.log(`Nombre de caractères saisi: ${this.val1} `)
        console.log(`Nombre de caractères saisi: ${this.val2} `)
        console.log(`Nombre de caractères saisi: ${this.val3} `)
        console.log(`Nombre de caractères saisi: ${this.val4} `)
        console.log(`Nombre de caractères saisi: ${this.val5} `)
    }

    //ajoute une ligne avec les valeurs de mon objet 
    ajoutObjet(){
        ajouter_json(this.val1, this.val2, this.val3, this.val4, this.val5); 
    }
}

//création de mon objet avec sa classe
function PwdSaisi(pwd) {
    var nbrCar = document.getElementById("nombrecar").value;
    var Dateg = document.getElementById("dateg").value;
    var cat = document.getElementById("categorie").value;
    var Site = document.getElementById("site").value;

    const NewPwd = new PWD(nbrCar, Dateg, cat, Site, pwd);

    //print mon objet
    NewPwd.printPwd();

    return NewPwd
}

//bouton derniers mdp générés
function historyPwd(){ 
    console.log("Derniers mots de passe généré : "); 
    let objLinea = localStorage.getItem("pwd"); //reprend mes password stockés
    //console.log(objLinea); 
    //console.log(typeof(objLinea));
    const tab = JSON.parse(objLinea); 
    for(var i = 0; i < tab.length; i++) {
        console.log(tab[i]);
        const newObj = new PWD(tab[i].val1, tab[i].val2, tab[i].val3, tab[i].val4, tab[i].val5); //création de mes password en objet
        newObj.ajoutObjet();
    }
}