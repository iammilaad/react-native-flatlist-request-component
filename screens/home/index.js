import React, {Component, Fragment} from "react";
import * as constants from "./constants";
import {createDynamicFlatList} from "components/dynamicFlatlist";
import {Container} from "native-base";

export default class Following extends Component {
    constructor(props) {
        super(props);
        this.createDynamicFlatList = createDynamicFlatList(
            constants.API_URL,
        );
    }
    renderItems = item => {
        return <Text>{item.title}</Text>
    };
    render() {
        const DynamicFlatList = this.createDynamicFlatList;
        return (
            <Container>
                <DynamicFlatList renderItems={this.renderItems} />
            </Container>
        );
    }
}
