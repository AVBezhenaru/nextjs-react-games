import { createGlobalStyle } from "styled-components";

export const GeneralStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    background-color: #fff;
    border: 4px solid red;
}
a {
    color: inherit;
    text-decoration: none;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;
