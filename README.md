
# Table of Contents

1.  [Family Tree IO Project](#orgd16918a)
    1.  [Technologies](#org3354296)
        1.  [Frontend](#orgcb9818d)
        2.  [Backend in Rust](#orgb4915c4)
        3.  [Database](#org892ded0)
        4.  [Infrastructure](#org2c9e6e5)
        5.  [Testing](#org81ee0a9)
    2.  [Features](#org4a6412d)



<a id="orgd16918a"></a>

# Family Tree IO Project

A feature-rich web application that <del>is</del> will be designed for creating family trees. <del>User-friendly ui design with many functionalities</del>.


<a id="org3354296"></a>

## Technologies


<a id="orgcb9818d"></a>

### Frontend

-   React.js
-   Typescript
-   Styled Components
-   libraries
    -   [React-family-tree](<https://www.npmjs.com/package/react-family-tree>)
    -   react-toastify
    -   axios


<a id="orgb4915c4"></a>

### Backend in Rust

-   Actix-web


<a id="org892ded0"></a>

### Database

-   Mongodb


<a id="org2c9e6e5"></a>

### Infrastructure

-   Docker
-   k8s


<a id="org81ee0a9"></a>

### Testing

-   Units
    -   Rust
    -   React testing library
-   Integration
    -   Pytest
-   e2e
    -   cypress


<a id="org4a6412d"></a>

## TODO Features

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

