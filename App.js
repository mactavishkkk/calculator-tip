import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Button } from 'react-native';
import styled from 'styled-components/native';

const Page = styled.View`
  flex: 1;
  align-items: center;
`;

const HeatherText = styled.Text`
  margin-top: 10px;
  
  font-size: 25px;
  color: #000;
  font-weight: bold;
`;

const LabelText = styled.Text`
  margin-top: 10px;
  
  font-size: 20px;
  color: #000;
`;

const Input = styled.TextInput`
  width: 40%;
  height: 40px;
  font-size: 18px;
  background-color: #EEE;
  
  margin-top: 5px;
  margin-bottom: 5px;
  
  border-radius: 7px;
  border: 3px solid #000;
`;

const CalcButton = styled.Button``;

const PctArea = styled.View`
  width: 100%;
  margin-top: 5px;
  background-color: #EEE;
  flex-direction: row;
  justify-content: center;

  padding: 20px;
`;

const PctItem = styled.Button``;

const ResultArea = styled.View`
  width: 80%;
  margin-top: 30px;
  padding: 20px;

  background-color: #EEE;
  
  justify-content: center;
  align-items: center;

  border: 2px dashed #000;
`;

const ResultItemTitle = styled.Text`
  margin-top: 5px;

  font-size: 20px;
  color: #000;
`;

const ResultItem = styled.Text`
  margin-top: 5px;
  margin-bottom: 15px;

  font-size: 20px;
  color: #000;
`;

export default () => {

  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [pct, setPct] = useState(10);

  const checkBill = () => {
    if (bill == '') {
      alert("Digite um valor válido!");
    } else {
      calcTip();
    }
  }

  const calcTip = () => {
    let fBill = parseFloat(bill);
    let total;

    if (fBill) {
      setTip((pct / 100) * fBill);
    }

    total = fBill + tip;
  }

  useEffect(() => {
    calcTip();
  }, [pct])

  return (
    <Page>
      <HeatherText>Calcule sua gorjeta!</HeatherText>
      <LabelText>Quanto deu a conta meu chefe?</LabelText>
      <Input
        placeholder="R$ 0.00"
        keyboardType="numeric"
        value={bill}
        onChangeText={(valueBill) => setBill(valueBill)}
      />

      <PctArea>
        <PctItem title="5%" onPress={() => setPct(5)}></PctItem>
        <PctItem title="10%" onPress={() => setPct(10)}></PctItem>
        <PctItem title="15%" onPress={() => setPct(15)}></PctItem>
        <PctItem title="20%" onPress={() => setPct(20)}></PctItem>
      </PctArea>

      <CalcButton title={`Calcular (${pct}%)`} onPress={checkBill} />

      {tip > 0 &&
        <ResultArea>
          <ResultItemTitle>Valor total da conta:</ResultItemTitle>
          <ResultItem>R$ {parseFloat(bill).toFixed(2)}</ResultItem>

          <ResultItemTitle>Valor total da gorjeta ({pct}%):</ResultItemTitle>
          <ResultItem>R$ {tip.toFixed(2)}</ResultItem>

          <ResultItemTitle>Valor total:</ResultItemTitle>
          <ResultItem>R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultItem>
        </ResultArea>
      }

    </Page>
  );
}