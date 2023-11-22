# This file contains all of the Docker instructions necessary for Docker Engine to 
# build an image in order to containerize the fragments microservice.

# Stage 0: Install Dependencies
# Pick a fatter 'node' base image
# This will have everything necessary to run node, pre-installed when we run the container
FROM node:20.9.0-bullseye@sha256:88893710dcd8be69730988c171d4a88ee71f14338b59a9a23a89ff22cecd6559 AS dependencies

# Use /app as our working directory
WORKDIR /app

# Copy the package.json and package-lock.json 
# from the build context into the image
COPY package.json package-lock.json ./

# Clean install node dependencies defined in package-lock.json excluding dev dependencies
RUN npm ci --only=production

###################################################################################################################

# Stage 1: Run and serve the application

# Use a thinner version of os for the final image
FROM node:20.9.0-bullseye@sha256:88893710dcd8be69730988c171d4a88ee71f14338b59a9a23a89ff22cecd6559 AS run

# Use /app as our working directory
WORKDIR /app

# Copy the generated dependenices
COPY --from=dependencies /app /app

# Copy src to /app/src/
COPY . .

# Environment variables
ENV MONGO_URL='mongodb+srv://joshic:123@cluster0.ejy8zqs.mongodb.net/?retryWrites=true&w=majority'
ENV JWT_SECRET='07032947joshic85'
ENV PORT=3001

# Build Args
ARG PORT=3001

# Start the container by running our server
# This is the default command that is run whenever a container is run using an image. 
# It can be overridden by providing the custom command as the second positional argument. 
CMD ["npm", "start"]


EXPOSE ${PORT}

# Add a healthcheck layer
HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3\
	CMD curl --fail localhost:${PORT} | exit 1 

###################################################################################################################
