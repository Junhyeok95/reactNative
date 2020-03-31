import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const View = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #CCC;
  margin: 8px;
`;
const Back = Styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #EDF;
  margin: 8px;
  width: 200px;
  height: 200px;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  border: 1px;
  margin: 8px;
  height: 40%;
  width: 20%;
  justify-content: center;
  align-items: center;
  background-color: #AAF;
`;
const Text = Styled.Text`
  font-size: 24px;
`;

interface Props {}

const Main = ({}: Props) => {
  
  const [count, setCount] = useState<number>(0);
  const [list, setList] = useState<Array<string>>([]);
  const [obj, setObj] = useState<Object>({});

  // FetchCoins.js
  const URI = 'http://localhost:8000/coins';

  // axios는 json()과정을 자동으로 해주는 셈이다
  const fetchF = async () => {
    try {
      let response = await fetch(URI);
      let responseJsonData = await response.json();
      console.log("responseJsonData", responseJsonData);
      // return responseJsonData;

      console.log("그냥 부르기");
    } catch (e) {
      console.log(e);
    }
  }

  const fetchF2 = async () => {
    try {
      // let response = await fetch(URI);
      // let responseJsonData = await response.json();
      // console.log("responseJsonData", responseJsonData);
      // return responseJsonData;

      console.log(obj);
      console.log("값 확인하기");
    } catch (e) {
      console.log(e);
    }
  }

  const fetchF3 = async () => {
    try {
      let response = await fetch(URI);
      let responseJsonData = await response.json();
      setObj(responseJsonData.coins[0]);
      console.log("값 저장하기");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <Container>
      <View>
        <Text>값 : {count}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={()=>{
          setCount(count + 1)
          fetchF()
        }}>
          <Text>{`증가

부르기`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            setCount(count - 1)
            fetchF2()
          }}>
          <Text>{`감소

확인`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            // console.log(obj.coins);
            // console.log(obj.coins.name);
            // console.log(obj.coins[0]);
            // console.log(obj.coins[0].name);
            fetchF3()
          }}>
          <Text>{`호출

저장`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            setCount(0)
            setObj({})
          }}>
          <Text>초기화</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Back>
          <Text>{list}</Text>
        </Back>
      </View>
    </Container>
  )
}

export default Main;