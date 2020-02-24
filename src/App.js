// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';

import { ColumnChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

const MONTH_OPTIONS = [
    { name: 'January',   value:'1' },
    { name: 'February',  value:'2' },
    { name: 'March',     value:'3' },
    { name: 'April',     value:'4' },
    { name: 'May',       value:'5' },
    { name: 'June',      value:'6' },
    { name: 'July',      value:'7' },
    { name: 'August',    value:'8' },
    { name: 'September', value:'9' },
    { name: 'October',   value:'10' },
    { name: 'November',  value:'11' },
    { name: 'December',  value:'12' }
];
const YEAR_OPTIONS = [
    { name: '2015', value: '2015' },
    { name: '2016', value: '2016' },
    { name: '2017', value: '2017' }
];
const MONTH_OPTION_VALUE_DEFAULT = MONTH_OPTIONS[0].value;
const YEAR_OPTION_VALUE_DEFAULT = YEAR_OPTIONS[1].value;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartFilter: {
                month: MONTH_OPTION_VALUE_DEFAULT,
                year: YEAR_OPTION_VALUE_DEFAULT
            }
        };
    }


    getChartFilter() {
        const from = `${this.state.chartFilter.year}-${this.state.chartFilter.month}-01`;
        const to = `${this.state.chartFilter.year}-${this.state.chartFilter.month}-31`;

        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: dateAttribute
                },
                from: from,
                to: to
            }

        }
    }

    getMeasures() {
        return [
            {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: grossProfitMeasure
                            }
                        }
                    },
                    alias: '$ Gross Profit'
                }
            }
        ]
    }

    getViewBy() {
        return {
            visualizationAttribute:
            {
                displayForm: {
                    uri: dateAttributeInMonths
                },
                localIdentifier: 'a1'
            }
        }
    }

    onChartFilterMonthChanged = (event) => {
        const month = event.target.value;
        this.onChartFilterChanged({month});
    };

    onChartFilterYearChanged = (event) => {
        const year = event.target.value;
        this.onChartFilterChanged({year});
    };

    onChartFilterChanged = (chartFilter) => {
        this.setState(prevState => ({
            chartFilter: {
                ...prevState.chartFilter,
                ...chartFilter
            }
        }));
    };

    renderMonthDropdown() {
        return (
            <select onChange={this.onChartFilterMonthChanged} value={this.state.chartFilter.month}>
                {MONTH_OPTIONS.map(month => (
                    <option key={month.value} value={month.value}>
                        {month.name}
                    </option>
                ))}
            </select>
        )
    }

    renderYearDropdown() {
        return (
            <select onChange={this.onChartFilterYearChanged} value={this.state.chartFilter.year}>
                {YEAR_OPTIONS.map(year => (
                    <option key={year.value} value={year.value}>
                        {year.name}
                    </option>
                ))}
            </select>
        )
    }

    render() {
        const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
        const filters = [this.getChartFilter()];
        const measures = this.getMeasures();
        const viewBy = this.getViewBy();

        return (
            <div className="App">
                <h1>$ Gross Profit in month {this.renderMonthDropdown()} {this.renderYearDropdown()}</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        filters={filters}
                        projectId={projectId}
                    />
                </div>
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        viewBy={viewBy}
                        projectId={projectId}
                    />
                </div>
            </div>
        );
    }
}

export default App;
