import React, { useState } from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button/index';

const Container = Styled.SafeAreaView`
    flex: 1;
`;

const TitleContainer = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TitleLabel = Styled.Text`
    font-size: 24px;
`;

const CountContainer = Styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;

const CountLabel = Styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const ButtonContainer = Styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

interface Props {
    title?: string;
    initValue: number;
}

interface State {
    count: number;
    error: Boolean;
}

class Counter extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        console.log('constructor');

        this.state = {
            count: props.initValue,
            error: false,
        }
    }

    render() {
        console.log('render');
        const { title } = this.props;
        const { count, error } = this.state;
        return (
            <Container>
                {!error && (
                    <>
                        {title && (
                            <TitleContainer>
                                <TitleLabel>{title}</TitleLabel>
                            </TitleContainer>
                        )}
                        <CountContainer>
                            <CountLabel>{count}</CountLabel>
                        </CountContainer>
                        <ButtonContainer>
                            <Button
                                iconName="plus"
                                onPress={() => this.setState({ count: count + 1})}
                            />
                            <Button
                                iconName="minus"
                                onPress={() => this.setState({ count: count + 1})}
                            />
                        </ButtonContainer>
                    </>
                )}
            </Container>
        );
    }

    /*
    호출순서 중요 !!!

        컴포넌트 생성 : constructor -> getDerivedStateFromProps -> render -> componentDidMount

        컴포넌트의 Props 변경 : getDerivedStateFromProps -> shouldComponentUpdate -> render 
                            -> getSnapshotBeforeUpdate -> componentDidUpdate

        콤포넌트의 State 변경 : shouldComponentUpdate -> render ->
                            -> getSnapshotBeforeUpdate -> componentDidUpdate

        컴포넌트 렌더 중 에러 : componentDidCatch
        
        컴포넌트 제거 : componentWillMount
    */

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        console.log('getDerivedStateFromProps');

        return null;
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        console.log('shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
        console.log('getSnapshotBeforUpdate');

        return null;

        // return {
        //     testData: true,
        // };
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: null) {
        console.log('componentDidUpdate');
    }

    componentWillMount() {
        console.log('componentWillUnmount');
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({
            error: true,
        });
    }
}

export default Counter;