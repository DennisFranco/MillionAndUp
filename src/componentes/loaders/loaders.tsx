import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../../theme/colors';
import {useRequestContext} from '../../services/context/RequestContext';
const LoaderElement = ({
  color = colors.primary.FIRST,
}: {
  color?: string | undefined;
  text?: string;
}) => {
  const [{isLoading}, {}] = useRequestContext();

  const isGlobalLoading = isLoading;

  if (!isGlobalLoading) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
  },
});

export default LoaderElement;
