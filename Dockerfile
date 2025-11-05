# Stage 1: Build untuk install dependensi
FROM node:20-alpine AS build

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependensi. --production biar nggak install devDependencies, kecuali lo butuh sequelize-cli
# Karena sequelize-cli dipake buat migrate, kita install semua dulu.
RUN npm install

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependensi dan kode sumber
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY . .

# Expose port yang digunakan Express (src/app.js listens on port 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi. 
# Kita asumsikan src/app.js adalah entry point yang menjalankan app.listen.
CMD ["node", "src/app.js"]