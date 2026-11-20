# Sins Of Streaming

V1 gratuite d'un catalogue de films/séries avec sources externes autorisées.

## Installation
1. Installer Node.js 20+.
2. `npm install`
3. Copier `.env.example` vers `.env`
4. Ajouter la clé TMDB si tu veux importer les métadonnées.
5. `npm run dev`

## Ajouter des sources
Modifier `data/sources.json`.

Format:
```json
[
  {
    "tmdbId": 157336,
    "type": "movie",
    "name": "Source officielle",
    "url": "https://exemple.com/...",
    "label": "Regarder"
  }
]
```

Utilise uniquement des liens que tu es autorisé à référencer/utiliser.
