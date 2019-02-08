import React, {Component} from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import Icon from "components/icon/";
import Text from "components/uiElements/text/";
import * as theme from "src/theme/";
import {styles} from "./styles";

export default class EmptyView extends Component {
    render() {
        const { icon, iconColor, iconSize, message, textStyle } = this.props;
        return (
            <View style={styles.container}>
                <Icon name={icon} size={iconSize} color={iconColor} />
                <Text style={[styles.text, textStyle]}>{message}</Text>
            </View>
        );
    }
}

EmptyView.propTypes = {
    message: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.int,
};

EmptyView.defaultProps = {
    icon: "Picture",
    iconSize: 70,
    iconColor: theme.black,
    message: "چیزی یافت نشد",
};
