FROM node:22

WORKDIR /src

# Installer Bun (absent par défaut des images Node)
RUN npm install -g bun

# Copier les fichiers de dépendances en premier (cache Docker)
COPY package.json bun.lock ./

# Installer les dépendances
RUN bun install --ignore-scripts

# Copier le reste du code source
COPY . .

# Générer le client Prisma (nécessaire avant le build)
RUN bun run db:generate

# Construire le projet
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]