FROM denoland/deno:alpine AS build

WORKDIR /app
COPY package.json ./
COPY deno.lock ./

RUN deno install
COPY . ./
ARG NODE_ENV
ARG VITE_IRAI_API
ARG VITE_IRAI_ROOT
ENV NODE_ENV $NODE_ENV
ENV VITE_IRAI_API $VITE_IRAI_API
ENV VITE_IRAI_ROOT $VITE_IRAI_ROOT
RUN echo "$NODE_ENV" "$VITE_IRAI_API" 
RUN deno task build

FROM denoland/deno:alpine AS run
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules/ ./node_modules/

ENV PORT=5077
EXPOSE 5077
CMD ["deno", "-A", "build/index.js"]
