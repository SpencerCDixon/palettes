import styled from 'styled-components'
import { animations, font, media } from '../../styles';

export const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: 8px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.06);

  ${p => p.isLoading && animations.loading}

  &:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }

  ${media.phone`
    width: 100px;
    height: 100px;
  `}
  ${media.tablet`
    width: 150px;
    height: 150px;
  `}
`

export const Color = styled.div`
  height: ${p => p.isLoading ? '90%' : '90%'};
  background: ${p => p.isLoading ? '' : p.color};
`

export const Amount = styled.div`
  margin: 10px 0 0 10px;
  color: white;
  text-transform: uppercase;
  font-weight: 300;
  ${font.family};
`

export const ColorCode = styled.div`
  text-transform: uppercase;
  color: black;
  font-weight: 300;
  font-size: 1em;
  ${font.family};
  ${font.ellipsis}
  ${media.tablet`
    font-size: .75em;
  `}
`

export const BottomPanel = styled.div`
  border-top: 1px solid rgba(0,0,0,0.06);
  height: 10%;
  background: white;
  padding: 20px;
`

export const LoadingColorCode = styled.div`
  height: 20px;
  width: 100%;
`
