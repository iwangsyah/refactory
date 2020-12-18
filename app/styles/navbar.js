import { StyleSheet } from 'react-native';
import Theme from './Theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Theme.primaryColor
  },
  containerBack: {
    padding: 20,
    paddingVertical: 12,
  },
  title: {
    fontSize: 26,
    paddingLeft: 20,
    paddingVertical: 12,
    fontFamily: Theme.fontBold
  },
  shadow: {
    shadowColor: 'rgba(119, 117, 117, 0.8)',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    elevation: 3.5,
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  icon: {
    width: 10,
    height: 14,
    tintColor: Theme.icBar,
  }
});
