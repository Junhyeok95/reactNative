import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';

import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const View = Styled.View`
  height: 50%;
  width: 100px;
  background-color: #F00;
`;

const LocationContainer = Styled(FlatList)``;

const Label = Styled.Text`
  flex: 1;
`;

const LoadingView = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0F0;
  width: 150px;
`;
const Loading = Styled.ActivityIndicator`
  margin-bottom: 16px;
`;
// 로딩중 표시 할말
const LoadingLabel = Styled.Text`
  font-size: 16px;
`;

const LocationItemContainer = Styled.View`
  height: 30%;
  justify-content: center;
  align-items: center;
  background-color: #00F;
  width: 200px;
`;

const LocationItem = Styled.Text``;

interface Props {}

interface ILocationData {
  // 연결 상태 //
  isLoading: boolean; // 로딩 상태
}

const Bluetooth = ({  }: Props) => {

  // 갱신하기 위해서 useState를 사용
  const [locationInfo, setLocationInfo] = useState<ILocationData>({
    isLoading: false,
  });

  const getCurrentLocation = () => {
    setLocationInfo({
      isLoading: false,
    });
    Geolocation.getCurrentPosition(
      position => {
        console.log(">>> 위도 경도");
        console.log(position);
        
        // 리턴값이 온다 / 위도와 경도를 position으로 받아옴
        const { latitude, longitude } = position.coords;
        setLocationInfo({
          isLoading: true,
        });

        // fetch()
        // .then(response => response.json())
        // .then(json => {
        // })
        // .catch(error => {
          // setLocationInfo({
          //   isLoading: true,
          // });
        //   showError('');
        // });
      },
      error => {
        // 포지션 에러 발생시 로딩을 true시킨다
        setLocationInfo({
            isLoading: true,
        });
        showError('위치 정보 실패');
      }
    );
  };

  // 이것으로 경고 창을 만들 수 있음
  const showError = (message: string): void => {
    setTimeout(() => {
        Alert.alert(message);
    }, 500);
  };

  // 렌더링이 완료 된 이후 hooks~! 스타일
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const {isLoading} = locationInfo;

  let data = ["100"];

  return (
    <Container>
      <View>
        <Label>label</Label>
      </View>
      <LocationContainer
        onRefresh={() => getCurrentLocation()} // 화면을 당겨서 갱신할 수 있다
        refreshing={!isLoading}
        data={data}
        keyExtractor={(item, index) => {
          return `Location-${index}`;
        }}
        ListEmptyComponent={ // 배열이 없을 경우 표시되는
          <LoadingView>
            <Loading size="large" color="#1976D2" />
            <LoadingLabel>Loading...</LoadingLabel>
          </LoadingView>
        }
        renderItem={({ item, index }) => (
          <LocationItemContainer>
            <LocationItem>
              get
            </LocationItem>
          </LocationItemContainer>
        )}
        contentContainerStyle={{ flex: 1 }} // 없을경우 전체화면으로 표시하기 위해
      />
      <Label>Bluetooth!</Label>
    </Container>
  );
};

export default Bluetooth;
