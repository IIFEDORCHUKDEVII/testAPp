import {StyleSheet, View} from 'react-native';
import React, {FC, PropsWithChildren} from 'react';
import {EdgeMode, SafeAreaView} from 'react-native-safe-area-context';
interface ScreenWrapperProps {
  offTop: EdgeMode;
}
/**
 * A wrapper component to use around each screen component.
 * It will render a `SafeAreaView` component with the provided
 * `children` and the specified edges.
 *
 * @param children The children components to render.
 * @param offTop Whether to turn off the top edge of the `SafeAreaView`.
 */
const ScreenWrapper: FC<PropsWithChildren<ScreenWrapperProps>> = ({
  children,
  offTop = 'off',
}) => {
  return (
    <SafeAreaView style={styles.container} edges={{top: offTop}}>
      <View style={styles.children}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  children: {flex: 1},
});
