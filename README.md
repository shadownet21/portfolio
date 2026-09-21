# Portfolio professionnel — Marc Maurice Freeman

Portfolio bilingue français/anglais consacré au développement web, au support TI, aux données et à la coordination de projets. Interface responsive, thèmes clair et sombre et études de cas consultables à la demande.

## Aperçu

Captures de la version locale compilée, actualisées le **11 septembre 2026**.

[![Accueil du portfolio](public/images/screenshots/redesign-home.png)](public/images/screenshots/redesign-home.png)

<details>
<summary>Projets et compétences</summary>

[![Grilles des douze projets et accès aux études de cas](public/images/screenshots/redesign-projects.png)](public/images/screenshots/redesign-projects.png)

[![Compétences et filtre par niveau, dont informatique décisionnelle](public/images/screenshots/redesign-skills.png)](public/images/screenshots/redesign-skills.png)

</details>

### Galerie des applications

[![Galerie des interfaces des applications](public/images/screenshots/redesign-projects.png)](public/images/screenshots/redesign-projects.png)

<details>
<summary>Aperçu mobile</summary>

<img src="public/images/screenshots/redesign-mobile.png" alt="Portfolio sur mobile : navigation et carte du puzzle" width="390">

</details>

## Expérience utilisateur

L’accueil présente le développement web et le soutien TI, ainsi que l’expérience en bases de données. La signature résume l’approche : « Des applications utiles. Des données fiables. Des utilisateurs accompagnés. » / « Useful applications. Reliable data. Supported users. ».

- Portrait initialement invisible, puis recomposé en vingt pièces de puzzle en environ deux secondes : une animation par chargement, déclenchée après la fin réelle des six animations du texte et lorsque la photo devient visible, avec image statique si les mouvements sont réduits.
- Logos officiels GitHub et LinkedIn, conservés localement.
- Navigation avec section active, progression du défilement et transitions respectant la préférence de réduction des mouvements.
- Projets principaux et autres réalisations, avec résumés compacts et détails accessibles par « Voir l’étude de cas ».
- Filtres de compétences : expérience professionnelle, pratique opérationnelle et apprentissage. « Tout voir » restaure les neuf catégories, dont l’informatique décisionnelle.
- Aperçus réels de Gel, Crédits radiés, ECI, Garage La Révélation et Initiative Avenir Basketball Club. Galeries avec boutons, sélection directe, flèches du clavier, fermeture par Échap et restitution du focus.
- Captures des applications métier anonymisées directement dans les fichiers publics avant affichage.

## Projet puzzle

Le [jeu de puzzle](https://github.com/shadownet21/jeupuzzle) dispose d’une carte et d’une étude de cas bilingues : trois images, niveaux progressifs, glisser-déposer souris/tactile, aimantation, chronomètre, pause, indices et confettis.

La description repose sur le [README.txt de la version publique](https://github.com/shadownet21/jeupuzzle/blob/main/README.txt), consulté le 11 septembre 2026. Le développement assisté par Claude et Codex (OpenAI) est mentionné discrètement. Le lien de démonstration reste masqué tant qu’une URL publique de jeu n’est pas configurée.

Le site FRIG’AUTO utilise [https://frigauto.com](https://frigauto.com).

## Installation et lancement

Prérequis : Node.js compatible avec les versions du projet et npm.

```bash
npm ci
npm run dev
```

Ouvrir `http://localhost:3000/fr` ou `http://localhost:3000/en`.

Pour servir la dernière version en production, **recompiler avant de lancer le serveur** :

```bash
npm run build
npm start
```

`npm start` sert les fichiers déjà compilés dans `.next` ; il ne recompile pas les modifications du code.

## Vérifications

```bash
npm run lint
npm test
npm run build
npm run typecheck
```

Contrôle du 21 septembre 2026 : ESLint, TypeScript et compilation réussis ; douze tests réussis. Parcours Edge à 320, 375, 768, 1024 et 1440 px : pas de débordement horizontal mesuré, menu mobile, thème, langue et galerie vérifiés, sans erreur de console relevée.

Le détail des dix demandes et de leur vérification figure dans le [compte rendu UI/UX](docs/UI-REVIEW.md).

## Technologies et personnalisation

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Resend, Vitest et Testing Library.

| Contenu | Fichier |
|---|---|
| Coordonnées, liens et CV | `src/data/site.ts` |
| Projets, couvertures et galeries | `src/data/projects.ts` |
| Compétences et niveaux | `src/data/skills.ts` |
| Expériences et formations | `src/data/profile.ts` |
| Galerie et navigation clavier | `src/components/ui/project-gallery.tsx` |
| Styles de l’interface | `src/app/globals.css` |

Pour une galerie, renseigner `gallery` avec un chemin local `src` et une légende `caption` en français et en anglais. Déposer uniquement des captures vérifiées et anonymisées dans `public/images`.

Les captures de connexion servent de couverture lorsqu’elles existent. ECI utilise son tableau de bord, car les images fournies ne contiennent pas d’écran de connexion. Le script `scripts/anonymize-screenshots.ps1` décrit les zones masquées des captures métier.

### Formulaire de contact

Le formulaire appelle `/api/contact`, qui utilise Resend. Configurer côté serveur :

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `CONTACT_FROM_EMAIL`

Les secrets restent dans l’environnement, jamais dans Git. Aucun courriel n’a été envoyé pendant les contrôles de cette mise à jour.

### Déploiement

Importer le dépôt sur Vercel avec le preset Next.js. Configurer les variables du formulaire et `NEXT_PUBLIC_SITE_URL` avec le domaine final ; le projet peut aussi utiliser `VERCEL_PROJECT_PRODUCTION_URL`. Sans URL de production, les liens canoniques et les entrées du sitemap ne sont pas générés. Lancer la compilation puis vérifier les liens et métadonnées du site déployé.

### Origine des logos

Assets téléchargés depuis les [ressources officielles GitHub](https://brand.github.com/foundations/logo) et [LinkedIn](https://brand.linkedin.com/downloads). Les logos sont la propriété de leurs marques respectives.
