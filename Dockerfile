FROM denoland/deno:alpine AS build

WORKDIR /app
COPY package.json ./
COPY deno.lock ./

RUN deno install
COPY . ./
ARG NODE_ENV
ARG IRAI_API
ARG IRAI_ROOT
ENV NODE_ENV $NODE_ENV
ENV IRAI_API $IRAI_API
ENV IRAI_ROOT $IRAI_ROOT
RUN echo "$NODE_ENV" "$IRAI_API" 
RUN deno task build

FROM denoland/deno:alpine AS run
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules/ ./node_modules/

ENV PORT=5077
EXPOSE 5077
CMD ["deno", "-A", "build/index.js"]
