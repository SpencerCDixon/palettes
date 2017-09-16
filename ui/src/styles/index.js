import { keyframes, css } from 'styled-components';

export const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

// Ex: media.desktop`background: blue;`
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
  @media (max-width: ${sizes[label] / 16}em) {
    ${css(...args)}
  }
`
  return acc
}, {})

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

const frames = {
  loading: keyframes`
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  `,
}

export const animations = {
  loading: `
    animation-duration: 1.3s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${frames.loading};
    animation-timing-function: ease-in;
    background: #f6f7f8;
    background: linear-gradient(to right, #F0F4F8 8%, #dae3ed 18%, #F0F4F8 33%);
    background-size: 800px 104px;
    position: relative;
  `
};
