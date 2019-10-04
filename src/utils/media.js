import { css } from "styled-components";

export const media = {
  handheld: (...args) =>
    css`
      @media (min-width: 420px) {
        ${css(...args)}
      }
    `,
  tablet: (...args) =>
    css`
      @media (min-width: 712px) {
        ${css(...args)}
      }
    `
};
