// Sélectionner les éléments html et le stokage des fruits
const symbols = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓", "🍉", "🍉", "🍒", "🍒", "🥝", "🥝", "🍍", "🍍"];
const userGame = document.getElementById('game');
const UserMessage = document.getElementById('message');

// Méthode pour mélanger de manière aléatoire les fruits
// Math.random génère un nbre décimal entre 0 et 1 (exclu)/ -0.5 pour obtenir 1x sur 2 + ou -
const symbolsMelange = symbols.sort(() => Math.random() - 0.5);

//  Variables pour la mémoire
let deuxCartes = []; 
let pairsRatees = false;  
let pairesTrouvees = 0;    

//  Boucle pour afficher chaque carte
symbolsMelange.forEach((symbole) => {
    // on crée une div qui la contient 
    let box = document.createElement('div');
    // on lui ajoute la classe correspondante
    box.classList.add('carte');
    // On stocke une donnée dans une boite avec le nom symbole
    box.dataset.symbole = symbole;
    // on met le symbole dans cette boite (pour voir le fruit à l'écran, caché par le ccs dans un premier temps)
    box.textContent = symbole;

    // On crée un écouteur pour chaque clique sur une carte
    box.addEventListener('click', function() {
        //  Si la carte a déjà la class trouvee on arrête
         if (box.className.includes('trouvee')) {
            return;
        }
        // si la carte est visible on permet au clic de la retourner dans l'autre sens
         if (box.className.includes('retournee')) {
            box.classList.remove('retournee');
            
            // On la retire du tableau deuxCartes pour libérer de la place (on écrase le contenu de la const deuxCartes)
            // avec la fonction filter, on analyse en boucle le contenu
            // et pour chaque carte examinée elle vérifie qu'elle est différente de celle que le joueur à cliqué
            deuxCartes = deuxCartes.filter(carte => carte !== box);
            return; 
        }
        // Quand deuxCartes contient deux cartes on arrête
        if (deuxCartes.length === 2) {
            return; 
        }

        // Quand on clique sur une carte "elle se retourne" grâce à l'affectation de la class retournee
        box.classList.add('retournee'); 
        //  et on ajoute la carte dans le tableau des cartes cliquées
        deuxCartes.push(box);
        // si les cartes retournées sont 2, on les vérifie avec une nvlle fonction
        if (deuxCartes.length === 2) {
            verification();
        }
    });
    // On injecte la carte créée dans le jeu
    userGame.appendChild(box);
});

//  Vérification des deux cartes
function verification(){
    // Créer deux variables pour chacune des cartes dans liste deuxCartes avec leur index
    const carte1 = deuxCartes[0];
    const carte2 = deuxCartes[1];
    // Si les symboles de carte1 et carte2 sont identiques alors ...
    if(carte1.dataset.symbole === carte2.dataset.symbole){
        // appliquer la class retournee
        carte1.classList.add('retournee');
        carte2.classList.add('retournee');
        // vider la liste deuxCartes
        deuxCartes = [];
        // Additionner ces cartes dans la variable pairsTrouvees
        pairesTrouvees++
    }
    // Si les pairsTouvees sont = à 8 alors...
    if(pairesTrouvees === 8){
        // Afficher message dans la div message
        UserMessage.textContent = "Bravo, vous avez réussi"
    }
}


