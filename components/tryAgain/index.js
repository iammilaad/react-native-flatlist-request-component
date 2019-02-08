import React, {Component} from "react";
import {View} from "react-native";
import Icon from "components/icon/";
import Text from "components/uiElements/text/";
import {styles} from "./styles";
import AnimateLoadingButton from "components/uiElements/button";
import * as theme from "../emptyView";

export default class TryAgain extends Component {
    render() {
        const {
            style,
            icon,
            iconColor,
            iconSize,
            message,
            textStyle,
            handleButton,
            buttonText,
        } = this.props;
        return (
            <View style={[style, styles.container]}>
                <View style={styles.container}>
                    <Icon name={icon} size={iconSize} color={iconColor} />
                    <Text style={[styles.text, textStyle]}>{message}</Text>
                    <AnimateLoadingButton
                        buttonStyle={styles.buttonContainer}
                        onPress={handleButton}
                    >
                        <Text style={styles.buttonText}> {buttonText}</Text>
                    </AnimateLoadingButton>
                </View>
            </View>
        );
    }
}

TryAgain.defaultProps = {
    icon: "Picture",
    iconSize: 70,
    iconColor: theme.black,
    message: "چیزی با مشکل مواجه شد",
    buttonText: "دوباره امتحان کنید",
};
