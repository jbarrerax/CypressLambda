FROM cypress/included:8.3.0
RUN mkdir /e2e
WORKDIR /e2e
COPY ./package.json
COPY ./cypress.json
COPY ./cypress ./cypress
RUN yarn install
ENTRYPOINT ["npx","cypress","run"]
RUN $(yarn bin)/cypress run --browser chrome