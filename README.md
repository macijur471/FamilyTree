
# Table of Contents

1.  [Family Tree IO Project](#org751bb1f)
    1.  [usage](#org1c67736)
    2.  [Technologies](#org4e7340f)
    3.  [TODO](#org653ac28)



<a id="org751bb1f"></a>

# Family Tree IO Project

A feature-rich web application that <del>is</del> will be designed for creating family trees. <del>User-friendly ui design with many functionalities</del>.


<a id="org1c67736"></a>

## usage

Below is an instruction how to set up an environment for local development. I case you do not have docker installed on your machine - check [docker](<https://www.docker.com/>).

Rust Dockerfiles use docker buildkit, so it has to be set as env variable \`DOCKER<sub>BUILDKIT</sub>\`

    export DOCKER_BUILDKIT=1

**You have to be in a root directory of the project, in order for the context to be correct.**

Build provided images and start services with one command.
Choose one of the following commands depending on the needed environment.

-   Dev 
    
        docker-compose up -d --build
-   Prod
    
        export IMAGE_REG=<registry>
        docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build

Assuming the builds haven&rsquo;t failed, check whether neccessary containers/services are already up, it may take some time.

    docker-compose ps


### troubleshooting

-   Custom images had been built successfully however `docker-compose up -d --build` failed
    -   Ensure that ports used in the project are not already allocated
    -   Ensure being in the correct directory
-   Building an image has failed
    -   Create a ticket on clickup with an explanation of the situation (maybe error trace) and assign it to the image contibutor. Alternatively you can directly contact that person
-   A container keeps restarting
    -   Check logs of the pod with `docker logs <name-of-the-container>`
    -   Create a ticket on clickup with an explanation of the situation (maybe error trace from logs)


<a id="org4e7340f"></a>

## Technologies


### Frontend

-   React.js
-   Typescript
-   Styled Components
-   libraries
    -   [React-family-tree](<https://www.npmjs.com/package/react-family-tree>)
    -   react-toastify
    -   axios


### Backend

-   Rust
-   Actix-web


### Database

-   Postgresql


### Infrastructure

-   Docker
-   k8s
-   helm


### Testing

-   Units
    -   Rust
    -   React testing library
-   Integration
    -   Pytest
-   e2e
    -   cypress


<a id="org653ac28"></a>

## TODO

-   <del>set up travis ci</del>
-   <del>create basic front setup</del>
-   <del>create basic actix setup</del>
-   <del>create docker-compose for easier local development - temporary solution</del>
-   visualization
-   dragging elements
-   multimedia attachments (mostly images)
-   recognizing different relations between indiviuals
-   time frame of the relationship
-   biographical informations
-   a posibility to export the tree to HTML, PDF
-   read/write the tree from/to json
-   multitenant architecture
-   persistent trees, with the help of a database
-   user authentication service

