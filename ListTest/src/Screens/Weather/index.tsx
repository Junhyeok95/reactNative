import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';

// 위치 정보와 날씨 api 모두 사용하기 위함
import Geolocation from 'react-native-geolocation-service';

import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: rgba(90,150,230,0.3);
`;

// 이것을 이용하면 당겨서 갱신하기 (Pull to refresh) 가능
const WeatherContainer = Styled(FlatList)``;

// 로딩 뷰
const LoadingView = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
// 로딩창 삥글삥글
const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;
// 로딩중 표시 할말
const LoadingLabel = Styled.Text`
    font-size: 16px;
`;


const WeatherItemContainer = Styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const WeatherItem = Styled.Text`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
`;
const Temperature = Styled.Text`
    font-size: 16px;
`;

// Geolocation.getCurrentPosition(info => console.log(info));

interface Props {}

import MY_API_KEY from './MY_API_KEY';

const API_KEY = MY_API_KEY;

// 타입 스크립트를 사용하여서 데이터 정보를 정의
interface IWeatherData {
    temperature?: number; // 온도
    weather?: string; // 날씨, 문자열
    isLoading: boolean; // 로딩 상태
}

const Weather = ({  }: Props) => {

    // 갱신하기 위해서 useState를 사용
    const [weatherInfo, setWeatherInfo] = useState<IWeatherData>({
        temperature: undefined,
        weather: undefined,
        isLoading: false,
    });

    // 이 함수는 Current 를 요청하기전에 로딩을 false시키고
    // Geolocation을 이용해서 CurrentPosition(현재 위치) 를 실행
    const getCurrentWeather = () => {
        setWeatherInfo({
            isLoading: false,
        });
        Geolocation.getCurrentPosition(
            position => {
                console.log(">>> 위도 경도 ###########################");
                console.log(typeof(position));
                console.log(position);
                console.log(">>> 위도 경도 ###########################");

                // 리턴값이 온다 / 위도와 경도를 position으로 받아옴
                const { latitude, longitude } = position.coords;
                // fetch API를 사용하여서 비동기로 데이터를 받아옴 ..
                fetch(
                    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
                )
                    // response.json() 은 res 정보를 JSON 형식으로 promise를 반환
                    .then(response => response.json())
                    .then(json => {
                        console.log(">>> fetch 를 이용한 데이터 요청 ###########################");
                        console.log(typeof(json));
                        console.log(json);
                        console.log(">>> fetch 를 이용한 데이터 요청 ###########################");
                        // 받아온 정보를 날씨 정보로 저장
                        setWeatherInfo({
                            temperature: json.main.temp,
                            weather: json.weather[0].main,
                            isLoading: true,
                        });
                    })
                    .catch(error => {
                        // 에러 발생시 로딩을 true시킨다
                        setWeatherInfo({
                            isLoading: true,
                        });
                        showError('날씨 정보를 가져오는데 실패' );
                    });
            },
            error => {
                // 포지션 에러 발생시 로딩을 true시킨다
                setWeatherInfo({
                    isLoading: true,
                });
                showError('위치 정보를 가져오는데 실패 / 권한을 확인하자');
            }
        );
    };

    // 이것으로 경고 창을 만들 수 있음
    // 앞으로 화면을 변경하고 경고창이 뜰 경우에 렌더링을 생각하고 코딩하자
    const showError = (message: string): void => {
        // 이렇게 사용하는 이유는 setWeatherInfo를 사용해서 회면을 갱신하지만
        // 경고창으로 인해 갱신되지 않는 문제를 해결하기위해서
        setTimeout(() => {
            Alert.alert(message);
        }, 500);
    };

    // 클래스의 그 .. 마운트 !
    // 렌더링이 완료 된 이후 hooks~! 스타일
    useEffect(() => {
        // Weather 컴포넌트가 화면에 표시된 후 가져오도록 설정
        getCurrentWeather();
    }, []);

    // 빈 배열을 만들고
    let data = [];
    // const값인 weatherInfo를 이용해서 날씨정보에서 로딩, 날씨(문자열), 온도를 기록
    const { isLoading, weather, temperature } = weatherInfo;
    if (weather && temperature) {
        // 날씨와 온도가 있으면 data에 넣는다
        data.push(weatherInfo);
    }

    return (
        // 빈 화면을 만들고 출력한다
        // SaveListView에서 만든 기본 뷰와 동일            
        <Container
            // SaveList처럼 제작, FlatList을 비교하자
            ><WeatherContainer                
                onRefresh={() => getCurrentWeather()} // 화면을 당겨서 갱신할 수 있다
                refreshing={!isLoading}

                data={data}
                keyExtractor={(item, index) => {
                    return `Weather-${index}`;
                }}
                ListEmptyComponent={ // 배열이 없을 경우 표시되는
                    <LoadingView>
                        <Loading size="large" color="#1976D2" />
                        <LoadingLabel>Loading...</LoadingLabel>
                    </LoadingView>
                }
                renderItem={({ item, index }) => (
                    // 반복적으로 표시될 컴포넌트
                    <WeatherItemContainer
                        // 둘다 텍스트로 표시된다
                        ><WeatherItem>{(item as IWeatherData).weather}</WeatherItem>
                        <Temperature>({(item as IWeatherData).temperature}°C)</Temperature>
                    </WeatherItemContainer>
                )}
                contentContainerStyle={{ flex: 1 }} // 없을경우 전체화면으로 표시하기 위해
            />
            
        </Container>
    );
};

export default Weather;
