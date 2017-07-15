import React, { Component } from 'react';
import InputField from './InputField';
import accounting from 'accounting';
import './style.css';
import {
  Provider,
  Heading,
  Subhead,
  Flex,
  Box,
  Divider,
  Text,
  Link,
  Panel,
  PanelFooter,
  PanelHeader,
} from 'rebass';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      rent: '700',
      bills: '60',
      food: '150',
      drinking: '40',
      coffee: '30',
      vacation: '4',
      hours: '32',
    };
  };

  /**
   * Handle the component change event for a field and set state
   *
   * @param {object} event
  */
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  tryNumber(input) {
    const value = parseFloat(input);

    if (Number.isNaN(value)) {
      return 1;
    }
  }

  render() {
    const rent = parseFloat(this.state.rent);
    const bills = parseFloat(this.state.bills);
    const foodPerWeek = parseFloat(this.state.food);
    const foodTotal = foodPerWeek * 4;
    const drinkingPerWeek = parseFloat(this.state.drinking);
    const drinkingTotal = drinkingPerWeek * 4;
    const coffeePerWeek = parseFloat(this.state.coffee);
    const coffeeTotal = coffeePerWeek * 4;

    const vacation = this.state.vacation;
    const hoursPerWeek = this.state.hours;

    const costs = rent + bills + foodTotal + drinkingTotal + coffeeTotal;
    const vacationMultiplier = 52 / (52 - vacation);
    const minRate = (costs / hoursPerWeek) * vacationMultiplier;
    const minRateFormatted = accounting.formatMoney(minRate);
    const costsFormatted = accounting.formatMoney(costs);

    return (
      <Provider>
        <Flex
          align='left'
          column
          bg='gray9'
          color='gray0'
          m={-2}
          p={[4]}>
          <Flex
            align='baseline'
            wrap mb={6}
            w={1}>
            <Box w={[1, 1/2]} pr={[0, 2]}>
              <Heading mb={3}
                children='How much do I need to make'
              />
              <Divider mb={3}/>
              <Text>
                Money is hard.
              </Text>
            </Box>
            <Box w={[1, 1/2, 1/4]} pl={[0, 2]} ml={'auto'}>
              <Panel
                bg="green2"
                color="gray9">
                <PanelHeader
                  children={"My total costs each month are: " + costsFormatted}
                />
                <PanelFooter
                  children={"My break even rate is " + minRateFormatted + " per hour"}
                />
              </Panel>
              {/* <Divider mb={3}/> */}
            </Box>
          </Flex>

          <Flex w={[1]} wrap>
            <Box w={[1, 1/2, 1/4]} px={[2, 0]} pr={[0, 2]}>
              <Subhead
                children='Expenses'
                mb={3}
              />
              <InputField
                name='Rent'
                legend='Monthly rent/morgage/lease'
                value={rent}
                onInputChange={this.handleChange}
              />
              <InputField
                name='Bills'
                legend='Monthly bill spend'
                value={bills}
                onInputChange={this.handleChange}
              />
              <InputField
                name='Food'
                legend='Cost of food every week'
                value={foodPerWeek}
                onInputChange={this.handleChange}
              />
              <InputField
                name='Drinking'
                legend='Weekly bad habit fund'
                value={drinkingPerWeek}
                onInputChange={this.handleChange}
              />
              <InputField
                name='Coffee'
                legend='Weekly good habit fund'
                value={coffeePerWeek}
                onInputChange={this.handleChange}
              />
            </Box>
            <Box w={[1, 1/2, 1/4]} px={[2, 0]} pl={[0, 2]}>
              <Subhead
                children='Goals'
                mb={3}
              />
              <InputField
                name='Vacation'
                legend='Ideal weeks of vacation per year'
                value={vacation}
                onInputChange={this.handleChange}
              />
              <InputField
                name='Hours'
                legend='Ideal hours per week'
                value={hoursPerWeek}
                onInputChange={this.handleChange}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex
          align='left'
          column
          bg='gray5'
          color='gray0'
          m={-2}
          p={[4]}>
          <Text center>
            Made with &lt;3 by <Link href='//durfee.me' children='Durfee' />
          </Text>
        </Flex>
      </Provider>
    );
  }
}

export default App;
