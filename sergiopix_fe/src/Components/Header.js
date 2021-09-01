import React from 'react'
import { Segment, Dropdown } from "semantic-ui-react";

const options = [
  { key: 'Коты', text: 'Коты', value: 'angular' },
  { key: 'Автомобили', text: 'Автомобили', value: 'css' },
  { key: 'Портреты', text: 'Портреты', value: 'design' },
  { key: 'Дизайн', text: 'Дизайн', value: 'ember' },
]
const DropdownMultipleSelection = () => (
  <Dropdown placeholder='Topics' fluid multiple selection options={options} />
)

export default function Header(props) {
  return (
    <Segment style={{
      height: '70px', borderBottom: '1px solid #e7e8ec', backgroundColor: 'white',
      paddingLeft: '250px', paddingRight: '250px', textAlign: 'center'
    }}
    >
      <DropdownMultipleSelection />
    </Segment>
  );
}
