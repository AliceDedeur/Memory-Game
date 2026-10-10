// Sélectionner les éléments html et le stockage des fruits
const symbols = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓", "🍉", "🍉", "🍒", "🍒", "🥝", "🥝", "🍍", "🍍"];
const userGame = document.getElementById('game');
const userMessage = document.getElementById('message');

// Méthode pour mélanger de manière aléatoire les fruits
// Math.random génère un nbre décimal entre 0 et 1 (exclu)/ -0.5 pour obtenir 1x sur 2 + ou -
const symbolsMelange = symbols.sort(() => Math.random() - 0.5);

// Variables pour la mémoire
let deuxCartes = [];
let pairesTrouvees = 0;

// Boucle pour afficher chaque carte
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
    box.addEventListener('click', function () {
        // On ignore le clic si la carte est déjà trouvée ou déjà retournée
        if (box.classList.contains('trouvee') || box.classList.contains('retournee')) {
            return;
        }
        // On ignore le clic si deux cartes sont déjà en cours de vérification
        if (deuxCartes.length === 2) {
            return;
        }

        // On retourne la carte et on l'ajoute au tableau
        box.classList.add('retournee');
        deuxCartes.push(box);

        // Si deux cartes sont retournées, on vérifie
        if (deuxCartes.length === 2) {
            verification();
        }
    });
    // On injecte la carte créée dans le jeu
    userGame.appendChild(box);
});

// Vérification des deux cartes
function verification() {
    // Créer deux variables pour chacune des cartes dans liste deuxCartes avec leur index
    const carte1 = deuxCartes[0];
    const carte2 = deuxCartes[1];

    // Si les symboles de carte1 et carte2 sont identiques alors ...
    if (carte1.dataset.symbole === carte2.dataset.symbole) {
        // appliquer la class retournee
        carte1.classList.add('trouvee');
        carte2.classList.add('trouvee');
        // vider la liste deuxCartes
        deuxCartes = [];
        pairesTrouvees++;

        // Si les pairsTouvees sont = à 8 alors...
        if (pairesTrouvees === 8) {
            // Afficher message dans la div message
            userMessage.textContent = "Bravo, vous avez réussi !";
        }
    } else {
        // Paire ratée : on laisse 1 seconde pour mémoriser, puis on cache
        setTimeout(() => {
            carte1.classList.remove('retournee');
            carte2.classList.remove('retournee');
            deuxCartes = [];
        }, 1000);
    }
}