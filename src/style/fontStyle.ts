import { createGlobalStyle } from "styled-components";
import NotoSerifJPMedium from "../fonts/NotoSerifJP/NotoSerifJP-Medium.woff";
import RalewayBold from "../fonts/Raleway/Raleway-Bold.woff";
import RalewayMedium from "../fonts/Raleway/Raleway-Medium.woff";
import OriginalSurfer_Regular from "../fonts/OriginalSurfer_Regular.woff2";

export const FontStyles = createGlobalStyle`

@font-face {
    font-family: 'NotoSerifJPMedium';
    src: url(${NotoSerifJPMedium}) format('woff');
    font-display: swap;
}

@font-face {
    font-family: 'RalewayBold';
    src: url(${RalewayBold}) format('woff');
    font-display: swap;
}

@font-face {
    font-family: 'RalewayMedium';
    src: url(${RalewayMedium}) format('woff');
    font-display: swap;
}

@font-face {
    font-family: 'OriginalSurfer_Regular';
    src: url(${OriginalSurfer_Regular}) format('woff2');
    font-display: swap;
}
`;