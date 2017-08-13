import React from 'react';
import Page from '../components/page'
import incentiveData from '../components/incentives-data';

export default class Incentive extends Page {
    static async getInitialProps(props) {
        const originalProps = await super.getInitialProps({ req: props.req });
        const getIncentiveData = await incentiveData.getData();
        return {
            ...originalProps,
            incentive: getIncentiveData.find(incentive => incentive['@id'] === props.query.id),
        };
    }

    render() {
        const { incentive } = this.props;

        return (<div>
            <h1>Name: {incentive.name}</h1>
        </div>);
    }
}