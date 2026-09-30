# API REST — Gestion de Tâches

API REST permettant à des utilisateurs de gérer leurs propres tâches, avec inscription, connexion et authentification par token JWT. Développée en NestJS/TypeScript avec Prisma et PostgreSQL, dans le cadre d'un exercice pratique académique (variante NestJS du sujet — la variante Python équivalente utilise FastAPI).

## 📖 Présentation du projet

Chaque utilisateur crée un compte, se connecte, et gère exclusivement ses propres tâches (création, consultation, modification, complétion, suppression, filtrage). Un utilisateur ne peut jamais consulter, modifier ou supprimer une tâche appartenant à un autre utilisateur.

## 🎯 Objectif

Mettre en pratique : les API REST, les méthodes et codes de statut HTTP, l'authentification JWT, le hachage des mots de passe, la validation des données, les relations entre tables, la persistance des données, la gestion des erreurs et les tests d'API avec Bruno.

## ⚙️ Fonctionnalités principales

### 🔐 Authentification
- création de compte (`name`, `email`, `password`)
- connexion par email + mot de passe, retour d'un token JWT
- toutes les routes de tâches protégées par ce token (`Authorization: Bearer <token>`)

### ✅ Gestion des tâches
- création d'une tâche (`title`, `description` optionnelle, `priority`)
- consultation de la liste de ses tâches, avec filtres par état (`completed`) et par priorité (`priority`)
- consultation, modification et suppression d'une tâche précise
- marquage d'une tâche comme terminée
- isolation stricte : une tâche n'est jamais accessible à un autre utilisateur que son propriétaire (404 si inexistante ou non possédée)

## 🗂️ Modèles de données

**User**

| Champ | Type | Obligatoire |
|---|---|---|
| id | entier | oui |
| name | texte | oui |
| email | texte, unique | oui |
| password | texte (haché) | oui |
| createdAt | date | oui |

**Task**

| Champ | Type | Obligatoire |
|---|---|---|
| id | entier | oui |
| title | texte | oui |
| description | texte | non |
| priority | `low` \| `medium` \| `high` | oui |
| completed | booléen (défaut `false`) | oui |
| userId | entier (clé étrangère → User) | oui |
| createdAt | date | oui |

Relation : un `User` possède plusieurs `Task` (1-N).

## 🧱 Technologies utilisées

- **NestJS** — framework back-end (TypeScript)
- **Bun** — runtime et gestionnaire de paquets
- **Prisma** — ORM
- **PostgreSQL** — base de données relationnelle
- **class-validator / class-transformer** — validation des DTO
- **@nestjs/jwt** — génération et vérification des tokens JWT
- **bcryptjs** — hachage des mots de passe
- **Bruno** — tests de l'API

## 📁 Structure du projet

```
tasks-api/
│── src/
│   ├── auth/
│   │   ├── dto/                # RegisterDto, LoginDto
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── tasks/
│   │   ├── dto/                # CreateTaskDto, UpdateTaskDto, ListTasksQueryDto
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts
│   └── main.ts
│── prisma/
│   ├── schema.prisma
│   └── migrations/
│── .env.example
└── package.json
```

## 🔑 Authentification — détail

- `POST /auth/register` → crée le compte, mot de passe haché avant stockage (jamais en clair)
- `POST /auth/login` → retourne `{ "access_token": "..." }`
- Toutes les routes `/tasks/*` exigent le header `Authorization: Bearer <token>` ; l'identité de l'utilisateur est déduite du token, jamais d'un champ envoyé par le client

## 🚀 Installation et lancement

### Prérequis
- [Bun](https://bun.sh) installé
- PostgreSQL installé et accessible en local

### Installation des dépendances
```bash
bun install
```

### Configuration du `.env`
Copier `.env.example` vers `.env` et renseigner :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/tasks_api?schema=public"
JWT_SECRET="votre_secret"
JWT_EXPIRES_IN="1h"
PORT=3000
```

### Création de la base de données
```bash
bunx prisma migrate dev --name init
```

### Lancement de l'API
```bash
bun run start:dev
```
L'API est accessible sur `http://localhost:3000`.

### Lancement des tests
```bash
bun run test
```

## 🧪 Utilisation de Bruno

1. Ouvrir Bruno et importer la collection **Tasks API** fournie
2. Exécuter d'abord `Auth > Register` puis `Auth > Login` — le token renvoyé est réutilisé automatiquement pour les requêtes protégées suivantes
3. Deux utilisateurs distincts sont inclus dans la collection pour vérifier l'isolation des tâches entre comptes

## Auteur

Projet réalisé par Baltazar, dans le cadre d'un exercice pratique de développement d'API REST (NestJS/Prisma).
