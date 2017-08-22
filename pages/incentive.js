import React from 'react';
import Page from '../components/page'
import AsyncData from '../components/incentives-data';

export default class Incentive extends Page {
    static async getInitialProps(props) {
        const originalProps = await super.getInitialProps({ req: props.req });
        let getIncentiveData;
        if (!process.browser) {
            getIncentiveData = await incentiveData.getData();
        } else {
            getIncentiveData = window.incentives;
        }

        return {
            ...originalProps,
            incentive: getIncentiveData.find(incentive => incentive['@id'] === props.query.id),
        };
    }

    render() {
        const { incentive } = this.props;
        return (<div session={this.props.session}>
            <h1>Name: {incentive.createDate}</h1>
            <h1></h1>
        </div>);
    }
}
