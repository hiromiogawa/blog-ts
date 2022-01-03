import { css, createGlobalStyle } from 'styled-components'
import { Color } from './styleSetting'

const bgColor = Color.black01;
const fontColor = Color.white;
const borderColor = Color.gray;
const linkColor = Color.green01;

export const reset = css`
/* reset css
-----------------------------------*/
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
}

html {
	overflow-y: scroll;
	-webkit-text-size-adjust: 100%;
}

body {
	line-height: 1;
	background: ${bgColor};
	color: ${fontColor};
	font-family: 'NotoSerifJPMedium';
}

h1,h2,h3,h4,h5,h6 {
	font-size: 100%;
	font-weight: normal;
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section { 
	display: block;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
	font-size: 100%;
}

hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid ${borderColor};
	margin: 1em 0;
	padding: 0;
}

ul, ol {
	list-style: none;
}

blockquote, q {
	quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

input, select {
	font-size: 100%;
	vertical-align: middle;
}

fieldset,input,textarea {
	margin: 0;
}

img {
	border: 0;
	vertical-align: bottom;
	max-width: 100%;
	height: auto;
}

a img {
	border: none;
}

a {
	margin: 0;
	padding: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
	color: ${linkColor};
}

* {
	box-sizing: border-box;
	word-wrap: break-word;
}

img {
}

p {
	line-height: 2;
}
`

export const Reset = createGlobalStyle`${reset}`
