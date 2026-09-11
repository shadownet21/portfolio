# Vérification UI/UX — 11 septembre 2026

Les dix demandes ont été implémentées dans le portfolio, avec un commit dédié à chacune. Des corrections issues des tests et une mise à jour documentaire complètent ces commits.

| Nº | Demande | Résultat vérifié |
|---|---|---|
| 1 | Logos officiels LinkedIn et GitHub | Assets officiels locaux ; liens sociaux du contact et du pied de page, ainsi que boutons GitHub des projets. GitHub noir en thème clair et blanc en thème sombre. |
| 2 | Interactions et animations | Section active, barre de progression, ouverture animée du menu, transitions des cartes et des galeries ; préférence de réduction des mouvements respectée. |
| 3 | Projet puzzle et étude de cas | Carte bilingue, lien GitHub, illustration SVG et détails tirés du README.txt public : Pointer Events, Web Audio, niveaux, timer, indices et victoire. |
| 4 | Mention discrète de l’IA | Mention de Claude et de Codex (OpenAI) comme assistants au développement du puzzle. |
| 5 | Moins de texte et nouvel agencement | Introduction et présentation raccourcies ; deux grilles de six projets ; résumé limité à trois lignes ; étude de cas et missions professionnelles dépliables. Les détails et technologies restent disponibles. |
| 6 | Lien FRIG’AUTO | URL exacte : https://frigauto.com. |
| 7 | Filtrage animé des compétences | Boutons des trois niveaux, état sélectionné, compteur et restauration via « Tout voir » ou un second clic. Informatique décisionnelle visible dans les niveaux professionnel et opérationnel. |
| 8 | Captures en couverture | Connexion de Gel et Crédits radiés ; tableau de bord ECI, faute de capture de connexion fournie. |
| 9 | Galerie modale | Gel : deux vues ; Crédits radiés : deux vues ; ECI : trois vues. Boutons précédent/suivant, sélection directe, flèches, Échap, focus contenu puis restitué. |
| 10 | Code dans un laptop gamer | Capture PHP originale des crédits radiés dans un cadre CSS avec clavier RGB, proportions paysage sur ordinateur et mobile. |

## Contrôles effectués

- `npm run lint` : aucune erreur ni avertissement.
- `npm test` : huit tests réussis, dont deux tests du filtrage des compétences.
- `npm run build` et `npm run typecheck` : réussis.
- Chromium : 1440 × 1000 et 390 × 844, versions française et anglaise, thèmes clair et sombre.
- Vérification de l’étude de cas du puzzle, de la mention de Claude/Codex et du lien FRIG’AUTO.
- Filtres des compétences, retour des neuf catégories et présence du bloc décisionnel.
- Trois galeries, changement d’image, clavier Tab/flèches/Échap, restitution du focus et du défilement.
- Aucun débordement horizontal du document sur mobile ; laptop en paysage.
- Aucun échec de ressource HTTP ni erreur JavaScript pendant le scénario.
- Cinq nouvelles captures dans le README.

## Précisions

Le dépôt GitHub du puzzle contient un README.txt pour son prototype JavaScript. Le dossier voisin JeuPuzzle contient une évolution React avec README.md qui n’est pas encore publiée ; elle n’est pas présentée comme disponible dans le dépôt public. Ce dossier n’a pas été modifié.

Seules les sept captures sélectionnées des trois applications sont ajoutées au dépôt. Les autres images locales et public/images/test.php restent intacts et non ajoutés. La capture de simulation affichant un nom et un numéro de compte n’a pas été sélectionnée.

La compilation locale est actualisée. Un serveur de production déjà lancé doit être redémarré pour servir cette version. Cette intervention comprend le push du dépôt du portfolio ; elle ne constitue pas une vérification d’un déploiement public.

Aucun envoi de formulaire de contact n’a été effectué. Les contrôles navigateur ont été exécutés avec une installation temporaire de Playwright dans .git/ui-tools, sans ajout de dépendance au package du portfolio.

## Ajout : portrait en puzzle

Le portrait de l’accueil se recompose en vingt pièces aux contours emboîtés, puis laisse place à l’image originale sans joints. L’animation dure environ 1,85 seconde et joue une seule fois par chargement ; un rafraîchissement permet de la revoir. Une arrivée sur une autre section attend le retour au portrait. Sur mobile, elle démarre lorsque la photo entre suffisamment dans le champ visible.

Contrôles Chromium : premier chargement, rafraîchissement, retour par défilement sans répétition, lien direct vers les projets, écran mobile, préférence de réduction des mouvements et navigateur sans JavaScript. Les huit tests existants, ESLint et la compilation avec TypeScript passent. Le fichier photo original n’est pas modifié.

### Synchronisation texte puis portrait

Le puzzle attend les callbacks de fin des six animations de la colonne de texte, boutons compris. Aucun délai fixe ne remplace cette synchronisation. Vérification Chromium au démarrage exact du puzzle : les six blocs ont une opacité de 1, aucun flou et aucun déplacement restant, sur ordinateur, au rafraîchissement, au retour depuis un lien direct et sur mobile. La préférence de réduction des mouvements et l’absence de répétition au défilement sont préservées. Compilation, ESLint et huit tests réussis.

### Portrait masqué avant la recomposition

La photo et son fond sont invisibles dès le premier affichage pendant l’animation du texte. Seules les pièces deviennent visibles au démarrage du puzzle ; l’image originale revient à la fin, sans joints. L’espace est réservé pour éviter tout déplacement de la mise en page. Contrôles réussis : chargement, rafraîchissement, ordre texte puis puzzle sur ordinateur et mobile, dimensions stables, réduction des mouvements et affichage sans JavaScript. Compilation et ESLint réussis.
