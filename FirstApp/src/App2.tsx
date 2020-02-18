/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// 1. 인라인 스타일을 적용하는 방법
/*

ex)

<View
  style={{
    marginTop: 32,
    paddingHorizontal: 24,
  }}>
  <Text
    style={{
      fintSize: 24,
      fontWeight: '600',
      color: Colors.back,
    }}>
</View>

*/


// 2. const styles = StyleSheet.create 스타일을 적용하는 방법
/*
import React from 'react'; // 리액트에서 파생, 불러올 필요가 있음
import {
  SafeAreaView, // ios 노치 SafeArea
  StyleSheet, // 스타일을 적용 1. 인라인 스타일 사용 2. StyleSheet 사용
  ScrollView, // 화면 스크롤이 가능한 컴포넌트 FlatList, ScrollView, SectionList 등을 제공
  View, // View 컴포넌트를 사용하여 전체적인 레이아웃을 잡는다
  Text, // 글자를 표시하기 위해서는 반드시 Text 컴포넌틀르 사용
  StatusBar, // 상단에 있는 상태 바를 숨기거나, 색깔을 변경하는데 사용
} from 'react-native';

import { // 0.60으로 업데이트 되면서 시작 화면의 디자인이 변경됨 ... 새롭게 추가된 시작 화면에 대한 컴포넌트 들 
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

interface Props {}

// !!! 템플릿 예제에서 갖고옴
declare var global: {HermesInternal: null | {}};

// const App: () => React$Node = () => { // 0.60 부터 클래스 컴포넌트 X -> 함수형 컴포넌트 O
const App = ({}: Props) => { // 0.60 부터 클래스 컴포넌트 X -> 함수형 컴포넌트 O
  return (
    // <Fragment> 의 축약형 <>
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.sectionTitle}>Hello</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Text style={styles.sectionTitle}>Hello</Text>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Hello</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

*/


// 3. Styled Components 스타일을 적용하는 방법
import React, { Fragment } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Styled from 'styled-components/native';

// 자바스크립트의 멀티 라인 텍스트 기호 ( ` )
const ScrollView = Styled.ScrollView`
  background-color: ${Colors.lighter};
`;

const Body = Styled.View`
  background-color: ${Colors.white};
`;

const SectionContainer = Styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;

const SectionDescription = Styled.Text`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.dark};
`;

const HighLight = Styled.Text`
  font-weight: 700;
`;

interface Props {}

// 0.60 부터 클래스 컴포넌트 X -> 함수형 컴포넌트 O
const App = ({}: Props) => {
  return (
    // <Fragment> 의 축약형 <>
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Header />
          <Body>
            <SectionContainer>
              <SectionDescription>Step One</SectionDescription>
              <SectionDescription>
                Edit <HighLight>App.js</HighLight>
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionDescription>See Your Changes</SectionDescription>
              <SectionDescription>
                <ReloadInstructions />
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionDescription>Debug</SectionDescription>
              <SectionDescription>
                <DebugInstructions />
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionDescription>Learn More</SectionDescription>
              <SectionDescription>
                Read the docs
              </SectionDescription>
            </SectionContainer>
            <LearnMoreLinks />
          </Body>          
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
