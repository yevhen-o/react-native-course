import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import GameSelectNumber from './GameSelectNumber';
import GameActions from './GameActions';
import GameFinished from './GameFinished';

const GameScreen = () => {
  const [suggestedNumber, setSuggestedNumber] = useState('');
  const [lastGame, setLastGame] = useState({});

  const handleStartGame = (number) => {
    setLastGame({});
    setSuggestedNumber(number);
  };

  const handleFinishGame = (num, iterations) => {
    setLastGame({ isFinished: true, num, iterations });
  };

  return (
    <View style={styles.container}>
      {lastGame.isFinished && (
        <GameFinished
          handleStartGame={handleStartGame}
          num={lastGame.num}
          iterations={lastGame.iterations}
        />
      )}
      {!suggestedNumber && !lastGame.isFinished && (
        <GameSelectNumber handleStartGame={handleStartGame} />
      )}
      {!!suggestedNumber && !lastGame.isFinished && (
        <GameActions
          suggestedNumber={suggestedNumber}
          handleFinishGame={handleFinishGame}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default GameScreen;
