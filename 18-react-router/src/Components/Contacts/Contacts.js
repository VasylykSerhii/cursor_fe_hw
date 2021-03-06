import React, { Component } from 'react'
import Contact from '../Contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

import './Contacts.scss'

export default class Contracts extends Component {
  state = {
    contacts: [
      {
      firstName: "Барней",
      lastName: "Стинсовский",
      phone: "+380956319521",
      gender: "male"
      }, {
          firstName: "Робин",
          lastName: "Щербатская",
          phone: "+380931460123",
          gender: "female"
      }, {
          firstName: "Аномный",
          lastName: "Анонимус",
          phone: "+380666666666"
      }, {
          firstName: "Лилия",
          lastName: "Олдровна",
          phone: "+380504691254",
          gender: "female"
      }, {
          firstName: "Маршэн",
          lastName: "Эриксонян",
          phone: "+380739432123",
          gender: "male"
      }, {
          firstName: "Теодор",
          lastName: "Мотсбэс",
          phone: "+380956319521",
          gender: "male"
      }
    ],
    filter: '',
    male: true,
    female: true,
    noGender: true
  }

  searchFilter = (e) => {
    this.setState({filter: e.target.value})
  }

  search = (items, filter) => {
    return items.filter(({firstName, lastName, phone}) => {
      return firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
             lastName.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
             phone.indexOf(filter) !== -1 
    });
  }

  

  checked = (items) => {
    let tempArr = items;

    const checkedGender = (arr, gander) => {
      return tempArr = [arr.flat().filter((item) => gander ? item.gender !== gander : item.gender)]
    }

    if(!this.state.male){
      checkedGender(tempArr, 'male')
    }

    if(!this.state.female){
      checkedGender(tempArr, 'female')
    }

    if(!this.state.noGender){
      checkedGender(tempArr)
    }

    return tempArr.flat()

  }

  toggleBox = (e) => {
    this.setState({[e.target.id]: e.target.checked })
  }


  render() {
    const {contacts, filter, male, female} = this.state
    const data = this.checked(this.search(contacts, filter), male, female)

    return (
      <div className='contacts'>
        <div className='contacts__checkbox__wrap'>
          <div className="contacts__checkbox">
            <input onChange={this.toggleBox} type="checkbox" id='male' defaultChecked/>
            <label htmlFor="male">Male</label>
          </div> 
          <div className="contacts__checkbox">
            <input onChange={this.toggleBox} type="checkbox" id='female' defaultChecked/>
            <label htmlFor="female">Female</label>
          </div> 
          <div className="contacts__checkbox">
            <input onChange={this.toggleBox} type="checkbox" id='noGender' defaultChecked/>
            <label htmlFor="noGender">No gender</label>
          </div> 
        </div>
        <div className='contacts__search'>
          <input className='contacts__input' onChange={this.searchFilter} type="text" placeholder='Search'/>
          <FontAwesomeIcon icon={faSearch}/>
        </div>
        <Contact
          contacts = {data}
        />
      </div>
    )
  }
}
