import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #5f9ea0; /* Cor de fundo do container */
`

export const LogoBackground = styled.View`
  background-color: #3498db; /* Cor de fundo da caixa da logo */
  padding: 20px; /* Espaçamento interno da caixa da logo */
  border-radius: 10px; /* Raio da borda da caixa da logo */
`

export const LogoApp = styled.View`   
  height: 128px; /* Tamanho da logo */
  width: 128px;
  border-radius: 64px; /* Deixa a logo circular */
  background: #f39c12; /* Cor de fundo da logo */
`

export const BoxForm = styled.View`
  width: 80%;
  align-self: center;
`

export const TitleApp = styled.Text`
  font-style: normal;
  align-self: center;
  font-size: 28px;
  line-height: 36px;
  margin-bottom: 20px;
  color: #ecf0f1;
`

export const ButtonLogin = styled.View`
  width: 80%;
  height: 60px;
  border-radius: 15px;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  background-color: #e74c3c;
`

export const ButtonLoginText = styled.Text`
  font-size: 20px;
  font-style: normal;
  color: #fff;
`

export const MiniBottomText = styled.Text`
  font-style: italic;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #bdc3c7;
  margin-top: 10px;
`
