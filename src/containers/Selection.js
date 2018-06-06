import React, { Component } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { BaseComponent, createRef } from '../utils/utilities';
import PaginationTable from '../components/PaginationTable';

import '../assets/stylesheets/Dropdown.css';

const tableHeader = ["Country      ", "State            ", "City           ", "Areas               "];

let countriesOptions = [
  { key: "A", text: "India" },
  { key: "B", text: "Australia" }
]

let statesOptions = [
  { key: "AA", text: "Sydney", itemType: "B" },
  { key: "DD", text: "Auck", itemType: "B" }, 
  { key: "BB", text: "Telangana", itemType: "A" },
  { key: "CC", text: "Karnataka", itemType: "A" }
];

let citiesOptions = [
  { key: "AAA", text: "Mysore", itemType: "CC" },
  { key: "DDD", text: "Guntur", itemType: "BB" },
  { key: "BBB", text: "Bangalore", itemType: "CC" },
  { key: "CCC", text: "Royalsima", itemType: "BB" }
];

let areasOptions = [
  { key: 'A1', text: 'A11', itemType: "AAA" },
  { key: 'B2', text: 'A12', itemType: "AAA" },
  { key: 'C3', text: 'A13', itemType: "BBB" },
  { key: 'D4', text: 'A14', itemType: "BBB" },
  { key: 'E1', text: 'A11', itemType: "CCC" },
  { key: 'F2', text: 'A12', itemType: "CCC" },
  { key: 'G3', text: 'A13', itemType: "DDD" },
  { key: 'H4', text: 'A14', itemType: "DDD" },
];

class Selection extends (Component, BaseComponent) {
  _basicDropdown = createRef();

  constructor(props) {
    super(props);
    this.state = {
      selectedItemCountry: undefined,
      selectedItemState: undefined,
      selectedItemCity: undefined,
      selectedItems: [],
      selectedAreas: [],
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
      filteredStates: [],
      filteredCities: [],
      filteredAreas: [],
      tableRow: [
        {
          country: '',
          nationalState: '',
          city: '',
          areas: [],
        },
      ],
    };
  }

  render() {
    const { selectedItems, selectedItemCountry, selectedItemState, selectedItemCity } = this.state;


    return (
      <div className='docs-dropdown-example md-cell'>

        <Dropdown
          className="md-cell-4"
          label='Country'
          selectedKey={(selectedItemCountry ? selectedItemCountry.key : undefined)}
          onChanged={this._handleCountry}
          placeHolder='Select an Option'
          options={countriesOptions}
          styles={{ caretDown: { color: 'blue' } }} />

        <Dropdown
          placeHolder='Select State'
          label='State:'
          selectedKey={(selectedItemState ? selectedItemState.key : undefined)}
          onChanged={this._handleState}
          options={this.state.filteredStates}
          styles={{ caretDown: { color: 'blue' } }}
        />

        <Dropdown
          label='City:'
          selectedKey={(selectedItemCity ? selectedItemCity.key : undefined)}
          onChanged={this._handleCity}
          placeHolder='Select City'
          options={this.state.filteredCities}
          styles={{ caretDown: { color: 'blue' } }}
        />

        <Dropdown
          placeHolder='Select Areas'
          label='Areas'
          selectedKeys={selectedItems}
          onChanged={this.onChangeMultiSelect}
          multiSelect
          options={this.state.filteredAreas}
        />

        <div className="button-container">
          <PrimaryButton
            className="add-button"
            text='Add To Table'
            onClick={this._addTable}
          />

          <PrimaryButton
            className="clear-button"
            text='Clear Table'
            onClick={this._clearTable}
          />

          <PrimaryButton
            className="reset-button"
            text='Reset'
            onClick={this._onReset}
          />
        </div>

        <PaginationTable tableHeader={tableHeader} data={this.state.tableRow} />
      </div>

    );
  }

  _addTable = () => {
    var newSelected = {};
    newSelected.country = this.state.selectedCountry;
    newSelected.nationalState = this.state.selectedState;
    newSelected.city = this.state.selectedCity;
    newSelected.areas = this.state.selectedAreas;
    let tableStateRow = this.state.tableRow;
    tableStateRow.push(newSelected);
    this.setState({ tableRow: tableStateRow });
  }

  _onReset = () => {
    let emptyItem = { key: null, text: null, itemType: null };
    return this.setState({ selectedItemCountry: emptyItem, selectedItemState: emptyItem, selectedItemCity: emptyItem, selectedItems: [], selectedAreas: [] });
  }

  _handleCountry = (item) => {
    console.log('here country updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    // this.setState({ countryKey: item.key });
    this.setState({ selectedItemCountry: item });

    this.setState({ selectedCountry: item.text });
    var newArray = [];
    statesOptions.map((allstate) => {
      if (allstate.itemType === item.key) {
        newArray.push(allstate);
      }
    })
    this.setState({selectedAreas: []});    
    return this.setState({ filteredStates: newArray, selectedState: '', selectedCity: '' });
  }

  _handleState = (item) => {
    // this.setState({ selectedItem: item });
    console.log('here state updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    // this.setState({ countryKey: item.key });        
    this.setState({ selectedItemState: item });
    this.setState({ selectedState: item.text });
    var newArray = [];
    citiesOptions.map((city) => {
      if (city.itemType === item.key) {
        newArray.push(city);
      }
    })
    this.setState({selectedAreas: []});
    return this.setState({ filteredCities: newArray, selectedAreas: [], selectedCity: '' });
  }

  _handleCity = (item) => {
    this.setState({ selectedItemCity: item });
    console.log('here city updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    // this.setState({ countryKey: item.key });        

    this.setState({ selectedCity: item.text });
    var newArray = [];
    areasOptions.map((area) => {
      if (area.itemType === item.key) {
        newArray.push(area);
      }
    })
    return this.setState({ filteredAreas: newArray, selectedAreas: [] });
  }

  onChangeMultiSelect = (item) => {
    const updatedSelectedItem = this.state.selectedItems ? this.copyArray(this.state.selectedItems) : [];
    const updatedSelectedText = this.state.selectedAreas ? this.copyArray(this.state.selectedAreas) : [];
    if (item.selected) {
      // add the option if it's checked
      updatedSelectedItem.push(item.key);
      updatedSelectedText.push(item.text);
    } else {
      // remove the option if it's unchecked
      const currIndex = updatedSelectedItem.indexOf(item.key);
      const currentIndex = updatedSelectedItem.indexOf(item.text);

      if (currIndex > -1) {
        updatedSelectedItem.splice(currIndex, 1);
      } else if (currentIndex > -1) {
        updatedSelectedText.splice(currentIndex, 1);
      }
    }
    console.log("USIT",updatedSelectedText);
    
    console.log("USI",updatedSelectedItem);
    this.setState({
      selectedItems: updatedSelectedItem, selectedAreas: updatedSelectedText
    });
  }

  copyArray = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

  _onSetFocusButtonClicked() {
    if (this._basicDropdown.current) {
      this._basicDropdown.current.focus(true);
    }
  }
}

export default Selection;