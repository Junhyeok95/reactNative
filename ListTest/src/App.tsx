import React, { Fragment } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Styled from 'styled-components/native';

const ScrollView = Styled.ScrollView`
  background-color: ${Colors.lighter};
`;

const Body = Styled.View`
  margin: 8px;
  background-color: rgb(255,0,255);
  flex: 1;
  flex-direction: row;
`;

const Body2 = Styled.View`
  margin: 8px;
  background-color: rgb(0,255,255);
  flex: 1;
  flex-direction: column;
`;

const BodyText = Styled.Text`
  margin: 8px;
  padding: 8px;
  border: 8px solid white;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  background-color: rgb(125,255,125);
`;

interface Props {}

const App = ( {}: Props ) => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Body>
            <Body2>
              <BodyText>
                Hello
              </BodyText>
              <BodyText>
                Hello
              </BodyText>
              <BodyText>
                Hello
              </BodyText>
            </Body2>
            <Body2>
              <BodyText>
                Hello
              </BodyText>
              <BodyText>
                Hello
              </BodyText>
              <BodyText>
                Hello
              </BodyText>
            </Body2>
          </Body>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
