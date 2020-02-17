/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

declare var global: {HermesInternal: null | {}};

// const App: () => React$Node = () => { // 0.60 부터 클래스 컴포넌트 X -> 함수형 컴포넌트 O
const App = () => { // 0.60 부터 클래스 컴포넌트 X -> 함수형 컴포넌트 O
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

export default App;
