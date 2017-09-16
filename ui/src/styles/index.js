import { css } from 'styled-components';

const mediaSize = size => `@media only screen and (max-width: ${size}em)`

export const media = {
  sm: mediaSize(40),
  md: mediaSize(52),
  lg: mediaSize(64),
};

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

// newMedia.desktop`background: blue;`
// newMedia.tablet`background: blue;`
// newMedia.phone`background: blue;`
const newMedia = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
  @media (max-width: ${sizes[label] / 16}em) {
    ${css(...args)}
  }
`
  return acc
}, {})

// '@media only screen and (max-width: 936px)'

export const flex = {
  row: `
    display: flex;
    flex-direction: row;
  `,
  col: `
    display: flex;
    flex-direction: column;
  `,
  alignCenter: `
    align-items: center;
  `,
  auto: `
    flex: 1;
  `,
  center: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export const font = {
  family: `
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  `,
  ellipsis: `

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  rainbow: `
    background-image: linear-gradient(90deg, #f79533 0%, #f37055 15%, #ef4e7b 30%, #a166ab 44%, #5073b8 58%, #1098ad 72%, #07b39b 86%, #6dba82 100%);
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;

  `
};
