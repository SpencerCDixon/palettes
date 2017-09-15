const mediaSize = size => `@media only screen and (max-width: ${size}em)`

export const media = {
  sm: mediaSize(40),
  md: mediaSize(52),
  lg: mediaSize(64),
};

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
