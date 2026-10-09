# Portfolio professionnel — Marc Maurice Freeman

Portfolio bilingue français/anglais d’un développeur web full stack (PHP, JavaScript, Laravel, SQL) avec une expérience en support TI. Interface responsive, thèmes clair et sombre, CV téléchargeable et une page d’étude de cas par projet.

## Aperçu

Captures de la version de production compilée, actualisées le **25 septembre 2026**.

[![Accueil du portfolio](public/images/screenshots/redesign-home.png)](public/images/screenshots/redesign-home.png)

<details>
<summary>Thème clair</summary>

[![Accueil en thème clair](public/images/screenshots/redesign-home-light.png)](public/images/screenshots/redesign-home-light.png)

</details>

<details>
<summary>Projets, expérience, compétences et contact</summary>

[![Trois projets en vedette et autres réalisations](public/images/screenshots/redesign-projects.png)](public/images/screenshots/redesign-projects.png)

[![Expérience professionnelle et formation](public/images/screenshots/redesign-experience.png)](public/images/screenshots/redesign-experience.png)

[![Domaines d’expertise et filtre des compétences par niveau](public/images/screenshots/redesign-skills.png)](public/images/screenshots/redesign-skills.png)

[![Courriel direct et formulaire de contact](public/images/screenshots/redesign-contact.png)](public/images/screenshots/redesign-contact.png)

</details>

### Études de cas

[![Page d’étude de cas : besoin, contribution, résultat, fonctionnalités et interfaces](public/images/screenshots/redesign-case-study.png)](public/images/screenshots/redesign-case-study.png)

<details>
<summary>Visionneuse des interfaces</summary>

[![Visionneuse des interfaces d’un projet](public/images/screenshots/redesign-gallery.png)](public/images/screenshots/redesign-gallery.png)

</details>

<details>
<summary>Aperçu mobile</summary>

<img src="public/images/screenshots/redesign-mobile.png" alt="Accueil sur mobile" width="390"> <img src="public/images/screenshots/redesign-mobile-menu.png" alt="Menu mobile ouvert" width="390">

</details>

## Expérience utilisateur

L’accueil présente le développement web full stack et le soutien TI. La signature résume l’approche : « Des applications utiles. Des données fiables. Des utilisateurs accompagnés. » / « Useful applications. Reliable data. Supported users. ».

- **Accueil sans attente :** le titre, le texte et la photo s’affichent dès le premier rendu, sans animation d’entrée. Le puzzle du portrait est facultatif : un bouton sur la photo recompose le portrait en vingt pièces en environ une seconde. Le bouton est masqué si les mouvements sont réduits.
- **Chiffres clés alignés sur le CV :** 7 ans de développement web, plus de 120 agences couvertes par les traitements SQL, plus de 100 bases SQL Server consolidées.
- **CV** téléchargeable depuis l’en-tête, l’accueil et le menu mobile.
- **Navigation en cinq entrées** (Projets, Expérience, Compétences, À propos, Contact), avec section active et barre de progression du défilement.
- **Projets :** toute la carte est cliquable et ouvre `/fr/projets/<slug>` ou `/en/projets/<slug>`. Chaque page présente le besoin, la contribution, le résultat, les fonctionnalités, les technologies, les interfaces et le projet suivant. Les liens de démonstration et GitHub restent masqués tant qu’aucune URL publique n’est configurée.
- **Expérience :** les quatre missions principales de chaque poste sont visibles, les suivantes se déplient.
- **Compétences :** six domaines d’expertise en grille, puis un filtre par niveau (expérience professionnelle, pratique opérationnelle, apprentissage).
- **Contact :** courriel direct avec bouton « Copier », formulaire avec champs obligatoires signalés, erreurs affichées sous chaque champ après une tentative d’envoi, et confirmation dans la page.
- **Galeries :** miniatures, visionneuse avec sélection directe, flèches du clavier, fermeture par Échap et retour du focus sur la miniature.
- **Accessibilité et normes :** `lang` correct côté serveur (`fr-CA` ou `en-CA`), lien d’évitement, animations courtes et sans flou, respect de `prefers-reduced-motion`. Seuls les éléments cliquables réagissent au survol.
- **Captures des applications métier :** les données confidentielles sont masquées dans les fichiers publics avant affichage (badge « Anonymisé »). Les projets réalisés sur une base de démonstration gardent leurs données lisibles, avec une étiquette et un badge « Données fictives ».

## Projet puzzle

Le [jeu de puzzle](https://github.com/shadownet21/jeupuzzle) dispose d’une étude de cas bilingue : trois images, niveaux progressifs, glisser-déposer souris/tactile, aimantation, chronomètre, pause, indices et confettis. Le développement assisté par Claude et Codex (OpenAI) y est mentionné.

Le site FRIG’AUTO utilise [https://frigauto.com](https://frigauto.com).

## Flash Contrôle Routier

L’étude de cas `flash-production` présente Flash Contrôle Routier, une plateforme qui réunit les données du contrôle routier : infractions, amendes, immatriculations, assurances, permis, dédouanements, Interpol, etc. La galerie présente les 20 captures de l’interface actuelle.

Toutes les données visibles sur ces captures sont **fictives** : noms, plaques, numéros de châssis, téléphones, etc. Elles ont été générées pour la démonstration. Rien n’est masqué, pour que la refonte reste lisible. À la place :

- chaque capture porte une étiquette « DONNÉES FICTIVES » incrustée en bas à droite, qui reste visible si l’image est partagée hors du portfolio ;
- la carte et la page du projet affichent un badge « Données fictives » (`fictionalData: true` dans `src/data/projects.ts`) ;
- une phrase sous la galerie précise qu’aucune personne ni aucun véhicule réel n’apparaît.

## Installation et lancement

Prérequis : Node.js compatible avec les versions du projet et npm.

```bash
npm ci
npm run dev
```

Ouvrir `http://localhost:3000/fr` ou `http://localhost:3000/en`. L’adresse `/` redirige vers `/fr`.

Pour servir la dernière version en production, **recompiler avant de lancer le serveur** :

```bash
npm run build
npm start
```

`npm start` sert les fichiers déjà compilés dans `.next` ; il ne recompile pas les modifications du code. Arrêter tout serveur `npm start` en cours avant de recompiler : faire **Ctrl+C** dans son terminal, puis relancer la commande pour redémarrer.

## Vérifications

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Contrôle du 6 octobre 2026 : ESLint, TypeScript et compilation réussis ; 28 tests réussis ; 29 pages statiques générées, dont 20 études de cas.

Contrôle du 25 septembre 2026 :
- ESLint, TypeScript et compilation réussis ; 22 tests réussis ; 29 pages statiques générées, dont 20 études de cas.
- Parcours Chrome à 390 et 1440 px en thèmes clair et sombre : pas de débordement horizontal, pas d’erreur de console. Menu mobile, puzzle, formulaire, copie du courriel et visionneuse vérifiés.
- `/en` servi avec `lang="en-CA"`, `/` redirigé vers `/fr`, URL inconnues en 404, CV servi en `application/pdf`.

L’historique des demandes précédentes figure dans le [compte rendu UI/UX](docs/UI-REVIEW.md).

## Technologies et personnalisation

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Vitest et Testing Library.

| Contenu | Fichier |
|---|---|
| Rôle, courriel, liens et chemin du CV | `src/data/site.ts` |
| CV publié | `public/documents/marc-maurice-freeman-cv.pdf` |
| Projets, couvertures et galeries | `src/data/projects.ts` |
| Type des projets (`confidential`, `fictionalData`, etc.) | `src/types/content.ts` |
| Domaines d’expertise, compétences et niveaux | `src/data/skills.ts` |
| Expériences, formations et références | `src/data/profile.ts` |
| Page d’étude de cas | `src/app/[locale]/projets/[slug]/page.tsx` |
| Layout racine, langue et thème | `src/app/[locale]/layout.tsx` |
| Galerie et navigation clavier | `src/components/ui/project-gallery.tsx` |
| Styles de l’interface | `src/app/globals.css` |
| Traitement des captures (masquage, étiquette) | `scripts/` |

Pour mettre à jour le CV, remplacer `public/documents/marc-maurice-freeman-cv.pdf` en gardant le même nom. Un test vérifie que le fichier existe.

Pour une galerie, renseigner `gallery` avec un chemin local `src` et une légende `caption` en français et en anglais. Déposer dans `public/images` uniquement des captures vérifiées : soit anonymisées, soit réalisées avec des données fictives et signalées comme telles.

La couverture d’un projet montre l’écran le plus représentatif (tableau de bord ou écran principal) plutôt que l’écran de connexion. Les captures sont recadrées par le haut. Pour un logo, indiquer `coverFit: "contain"`. Deux scripts traitent les captures métier :

| Script | Rôle | Indicateur dans `projects.ts` |
|---|---|---|
| `scripts/anonymize-screenshots.ps1` | Masque par des zones hachurées les données confidentielles (ECI, Gel, Crédits radiés, Garage et Casse La Révélation). Il modifie les fichiers sur place. | `confidential: true` → badge « Anonymisé » |
| `scripts/label-flash-controle-routier.mjs` | Incruste l’étiquette « DONNÉES FICTIVES » sur toutes les captures de Flash Contrôle Routier. Lancement : `node scripts/label-flash-controle-routier.mjs`. | `fictionalData: true` → badge « Données fictives » |

Le second script repart toujours des originaux sans étiquette rangés dans `.private-originals/`. Ce dossier est exclu de Git et n’existe que sur le poste local, ce qui permet de relancer le script sans empiler les étiquettes. Pour ajouter une capture : la déposer dans `public/images/flash-controle-routier/captures/`, puis relancer le script.

### Formulaire de contact

Le formulaire appelle `POST /api/contact`. Le mode de réception dépend des variables d’environnement :

- **Courriel via Resend (production, obligatoire sur Vercel)** : si `RESEND_API_KEY`, `CONTACT_EMAIL` et `CONTACT_FROM_EMAIL` sont définies, chaque message est envoyé par courriel à `CONTACT_EMAIL`. « Répondre » écrit directement au visiteur. L’adresse de réception n’est jamais envoyée au navigateur.
- **Fichier local (développement)** : sans ces variables, les messages sont enregistrés dans `data/contact-messages.json` à la racine du projet. Chaque entrée comprend `id`, `receivedAt` (date UTC), `name`, `email`, `subject` et `message`. Le fichier reste hors de `public` et est exclu de Git.

Sur Vercel, le système de fichiers est en lecture seule : sans les variables Resend, l’API refuse le message (`configuration`) au lieu d’échouer à l’écriture. Les erreurs détaillées (Resend ou disque) sont écrites dans les journaux du serveur.

La validation (côté client et côté serveur), le champ anti-spam et la limitation des tentatives restent actifs. Si l’envoi ou l’enregistrement échoue, le formulaire signale une erreur et n’annonce pas de réception. Les visiteurs peuvent aussi écrire directement à l’adresse affichée dans la section Contact.

### Déploiement

Le dépôt GitHub `shadownet21/portfolio` est relié au projet Vercel `mon-portfolio`. Chaque push sur `main` déclenche un déploiement automatique, en ligne en une à deux minutes sur https://mon-portfolio-nu-plum.vercel.app. Si une capture modifiée garde son ancienne version, forcer le rechargement du navigateur (Ctrl+Maj+R) : l’adresse des images ne change pas.

**Vercel** : dans *Settings → Environment Variables*, ajouter `RESEND_API_KEY`, `CONTACT_EMAIL` et `CONTACT_FROM_EMAIL`, puis redéployer. `CONTACT_FROM_EMAIL` doit utiliser un domaine vérifié dans Resend (par exemple `Portfolio <contact@mondomaine.com>`). L’adresse de test `onboarding@resend.dev` n’envoie qu’à l’adresse du compte Resend.

**Serveur Node.js** : lancer `npm run build`, puis `npm start`. Sans variables Resend, prévoir un disque persistant avec accès en écriture au dossier `data`, et le sauvegarder lors des mises à jour.

Configurer `NEXT_PUBLIC_SITE_URL` avec le domaine final. Sans URL de production, les liens canoniques, les versions linguistiques et les entrées du sitemap ne sont pas générés. Vérifier les liens et métadonnées du site déployé.

### Origine des logos

Assets téléchargés depuis les [ressources officielles GitHub](https://brand.github.com/foundations/logo) et [LinkedIn](https://brand.linkedin.com/downloads). Les logos sont la propriété de leurs marques respectives.
