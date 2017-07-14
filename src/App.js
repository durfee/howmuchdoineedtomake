import React, { Component } from 'react';
import accounting from 'accounting';
import {
  Provider,
  Heading,
  Subhead,
  Flex,
  Box,
  Label,
  Input,
  Divider,
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
   * Handle the change event for a field
   *
   * @param {object} event
  */
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  /**
  * Check the value of a field, set to 1 if no value
  *
  * @param {string} input
  */

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
    const minRate = costs / hoursPerWeek;
    const minRateFormatted = accounting.formatMoney(minRate);
    const costsFormatted = accounting.formatMoney(costs);

    return (
      <Provider>
        <Flex align='left' column bg='gray9' color='gray0' m={-2} p={[4]}>
          <Flex align='baseline'>
            <Box w='3/4'>
              <Heading mb={4}
                children='How much do I need to make'
              />
              <Divider mb={2}/>
            </Box>
            <Box w='1/4' ml={5}>
              <Subhead
                children={"My total costs each month are: " + costsFormatted}
              />
              <Subhead
                children={"My minimum rate is " + minRateFormatted + " per hour"}
              />
              <Divider mb={2}/>
            </Box>
          </Flex>

          <Flex w={[1]}>
            <Box w={[1, 1/2]} mx={[2]}>
              <Subhead
                children='Costs'
                mb={3}
              />
              <Box mb={2}>
                <Label>Rent</Label>
                <Input
                  placeholder='900'
                  bg='gray5'
                  value={this.tryNumber(rent)}
                  defaultValue={rent}
                  onBlur={this.handleChange}
                  name='rent'
                />
              </Box>
              <Box mb={2}>
                <Label>Bills</Label>
                <Input
                  placeholder='100'
                  bg='gray5'
                  value={this.tryNumber(bills)}
                  defaultValue={bills}
                  onBlur={this.handleChange}
                  name='bills'
                />
              </Box>
              <Box mb={2}>
                <Label>Food costs per week</Label>
                <Input
                  placeholder='200'
                  bg='gray5'
                  value={this.tryNumber(foodPerWeek)}
                  defaultValue={foodPerWeek}
                  onBlur={this.handleChange}
                  name='food'
                />
              </Box>
              <Box mb={2}>
                <Label>Drinking budget per week</Label>
                <Input
                  placeholder='100'
                  bg='gray5'
                  value={this.tryNumber(drinkingPerWeek)}
                  defaultValue={drinkingPerWeek}
                  onBlur={this.handleChange}
                  name='drinking'
                />
              </Box>
              <Box mb={2}>
                <Label>Coffee budget per week</Label>
                <Input
                  placeholder='30'
                  bg='gray5'
                  value={this.tryNumber(coffeePerWeek)}
                  defaultValue={coffeePerWeek}
                  onBlur={this.handleChange}
                  name='coffee'
                />
              </Box>
            </Box>
            <Box w={[1, 1/2]} mx={[2]}>
              <Subhead
                children='Goals'
                mb={3}
              />
              <Box mb={2}>
                <Label>Weeks of Vacation</Label>
                <Input
                  placeholder='4'
                  bg='gray5'
                  value={this.tryNumber(vacation)}
                  defaultValue={vacation}
                  onBlur={this.handleChange}
                  name='vacation'
                />
              </Box>
              <Box mb={2}>
                <Label>Billable Hours per Week</Label>
                <Input
                  placeholder='32'
                  bg='gray5'
                  value={this.tryNumber(hoursPerWeek)}
                  defaultValue={hoursPerWeek}
                  onBlur={this.handleChange}
                  name='hours'
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Provider>
    );
  }
}

export default App;
