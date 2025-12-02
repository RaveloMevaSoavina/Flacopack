// Les données des produits sont stockées dans un tableau d'objets JavaScript
const productsData = [
	{
		id: 1,
		name: "Flacon Boston Rond",
		material: "verre",
		volume: 250,
		description: "Idéal pour les huiles essentielles et sirops.",
		image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 2,
		name: "Flacon Droit PET",
		material: "pet",
		volume: 500,
		description: "Léger et incassable pour shampoings et gels.",
		image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 3,
		name: "Flacon Cosmétique PEHD",
		material: "pehd",
		volume: 50,
		description: "Pour crèmes et lotions, format voyage.",
		image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 4,
		name: "Flacon Goutte Verre Ambré",
		material: "verre",
		volume: 50,
		description: "Protection UV pour sérums et produits sensibles.",
		image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 5,
		name: "Flacon Industriel PET",
		material: "pet",
		volume: 250,
		description: "Résistant, pour produits de nettoyage.",
		image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 6,
		name: "Flacon Spray Verre",
		material: "verre",
		volume: 100,
		description: "Parfait pour les parfums et eaux de toilette.",
		image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 7,
		name: "Bouteille Pharmaceutique PEHD",
		material: "pehd",
		volume: 250,
		description: "Sécurisée pour médicaments liquides.",
		image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 8,
		name: "Flacon Pompe PET",
		material: "pet",
		volume: 300,
		description: "Idéal pour lotions et shampoings.",
		image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 9,
		name: "Fiole Laboratoire Verre",
		material: "verre",
		volume: 100,
		description: "Précision pharmaceutique et chimique.",
		image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 10,
		name: "Flacon Airless PET",
		material: "pet",
		volume: 50,
		description: "Protection optimale pour sérums anti-âge.",
		image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 11,
		name: "Bouteille Huile Verre Foncé",
		material: "verre",
		volume: 500,
		description: "Protection UV pour huiles alimentaires.",
		image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	},
	{
		id: 12,
		name: "Flacon Compte-gouttes PEHD",
		material: "pehd",
		volume: 30,
		description: "Dosage précis pour compléments alimentaires.",
		image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
	}
];

// Variables pour la pagination
let currentDisplayCount = 6; // Nombre initial d'articles à afficher
const incrementCount = 6; // Nombre d'articles à ajouter à chaque "Voir plus"

const productList = document.getElementById('product-list');
const filterMaterial = document.getElementById('filter-material');
const filterVolume = document.getElementById('filter-volume');

// Fonction pour rendre (afficher) une liste de produits dans le HTML
function renderProducts(products, showCount = currentDisplayCount) {
	const productGrid = document.querySelector('.product-grid');
	const catalogueSection = document.querySelector('.catalogue-section');

	// Nettoyer la grille existante
	productGrid.innerHTML = '';

	// Supprimer le bouton "Voir plus" existant s'il y en a un
	const existingButton = catalogueSection.querySelector('.load-more-btn');
	if (existingButton) {
		existingButton.remove();
	}

	if (products.length === 0) {
		productGrid.innerHTML = '<p class="no-results">Aucun flacon ne correspond à votre sélection.</p>';
		return;
	}

	// Afficher seulement le nombre de produits demandé
	const productsToShow = products.slice(0, showCount);

	productsToShow.forEach(product => {
		const card = document.createElement('div');
		card.className = 'product-card';
		card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p><strong>Matériau :</strong> ${product.material.toUpperCase()}</p>
                <p><strong>Volume :</strong> ${product.volume} ml</p>
                <p class="product-description">${product.description}</p>
                <button class="product-cta" onclick="requestQuote('${product.name}')">Demander un Devis</button>
            </div>
        `;
		productGrid.appendChild(card);
	});

	// Ajouter le bouton "Voir plus" s'il y a plus de produits à afficher
	if (products.length > showCount) {
		const loadMoreBtn = document.createElement('button');
		loadMoreBtn.className = 'load-more-btn';
		loadMoreBtn.innerHTML = '📦 Voir Plus de Produits';
		loadMoreBtn.onclick = () => {
			currentDisplayCount += incrementCount;
			renderProducts(products, currentDisplayCount);
		};
		catalogueSection.appendChild(loadMoreBtn);
	}
}

// Fonction pour filtrer les produits en fonction des sélections de l'utilisateur
window.filterProducts = function () {
	const selectedMaterial = filterMaterial.value;
	const selectedVolume = filterVolume.value;

	const filtered = productsData.filter(product => {
		// Filtre par Matériau
		const materialMatch = selectedMaterial === 'all' || product.material === selectedMaterial;

		// Filtre par Volume
		const volumeMatch = selectedVolume === 'all' || product.volume.toString() === selectedVolume;

		return materialMatch && volumeMatch;
	});

	// Réinitialiser le compteur lors du filtrage
	currentDisplayCount = 6;
	renderProducts(filtered);
};

// Fonction pour gérer les demandes de devis
window.requestQuote = function (productName) {
	// Scrolle vers la section contact
	document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

	// Pré-remplit le textarea avec le nom du produit
	const textarea = document.querySelector('.contact-section textarea');
	if (textarea) {
		textarea.value = `Je suis intéressé(e) par le produit : ${productName}\n\nQuantité souhaitée : \nUsage prévu : \nAutres spécifications : `;
		textarea.focus();
	}
};

// Fonctions pour le menu mobile
window.toggleMobileMenu = function () {
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');

	hamburger.classList.toggle('active');
	navMenu.classList.toggle('active');
};

window.closeMobileMenu = function () {
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');

	hamburger.classList.remove('active');
	navMenu.classList.remove('active');
};

// Fermer le menu mobile si on clique en dehors
document.addEventListener('click', function (event) {
	const navMenu = document.querySelector('.nav-menu');
	const hamburger = document.querySelector('.hamburger');
	const header = document.querySelector('.main-header');

	if (!header.contains(event.target) && navMenu.classList.contains('active')) {
		closeMobileMenu();
	}
});

// Fermer le menu mobile lors du redimensionnement de l'écran
window.addEventListener('resize', function () {
	if (window.innerWidth > 768) {
		closeMobileMenu();
	}
});

// Afficher tous les produits au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
	renderProducts(productsData);
});