import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* variables */
    :root {
        --black: #000000;
        --almost-black: #0D1321;
        --dark-purple: #2A324B;
        --dark-blue: #1D2D44;
        --med-blue: #3E5C76;
        --light-blue: #748CAB;
        --dark-turqoise: #0081A7;
        --turqoise: #00AFB9;
        --lime: #BBEC94;
        --dark-red: #F07167;
        --red: #FF928B;
        --orange: #FED9B7;
        --yellow: #FDFCDC;
        --white: #FFFFFF;

        --nav-height: 178px;
    }

    *, *::after, *::before {
        box-sizing:border-box;
    }

    html, body {
        padding:0;
        margin:0;    
        font-family: 'Montserrat', sans-serif;

        font-size: 18px;

        color: "#363636";
    }

    h1,h2,h3,h4,h5,button,label{
        font-family: 'Pacifico', cursive;
        margin:0;
        padding:0;
    }
    p{
        margin:0;
    }

    a {
        text-decoration:none;
    }

    input, textarea {
        font-family: 'Montserrat', sans-serif;
    }
    
    button {
        cursor:pointer;
        font-family: 'Montserrat', sans-serif;
    }

    input, button {
        outline:none;
        border:none;
    }
`;
