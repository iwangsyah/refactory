import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

const propsType = {
    colors: PropTypes.arrayOf(),
    style: PropTypes.any,
    opacity: PropTypes.number
};

const propsDefault = {
    opacity: 1
};

const Background = (props) => {
    const { colors, style, children, transparent } = props;
    const opacity = transparent ? 0.9 : opacity
    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.75 }} end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5]}
            colors={[`rgba(62,92,141,${opacity})`, `rgba(78,154,163,${opacity})`]}
            style={style}
            {...props}
        >
            {children}
        </LinearGradient>
    );
};

Background.propTypes = propsType;

Background.defaultProps = propsDefault;

export default Background;
