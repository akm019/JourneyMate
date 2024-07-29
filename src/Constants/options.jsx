import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faChild, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign, faMoneyBillWave, faGem } from '@fortawesome/free-solid-svg-icons';

export const SelectTravelList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: <FontAwesomeIcon icon={faUser} />,
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: <FontAwesomeIcon icon={faUsers} />,
    people: '2',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: <FontAwesomeIcon icon={faChild} />,
    people: '3-5 ',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of fun seekers',
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    people: '10',
  },
];


export const BudgetOptionsList = [
    {
      id: 1,
      category: 'Cheap',
      options: [
        {
          id: 1,
          title: 'Backpacker',
          desc: 'Travel on a tight budget',
          icon: <FontAwesomeIcon icon={faDollarSign} />,
          budget: '$',
        },
        {
          id: 2,
          title: 'Budget Hotel',
          desc: 'Affordable stay options',
          icon: <FontAwesomeIcon icon={faDollarSign} />,
          budget: '$',
        },
      ],
    },
    {
      id: 2,
      category: 'Moderate',
      options: [
        {
          id: 3,
          title: 'Comfortable Stay',
          desc: 'Moderate budget for a comfy trip',
          icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
          budget: '$$',
        },
        {
          id: 4,
          title: 'Mid-Range Hotel',
          desc: 'Mid-range accommodation',
          icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
          budget: '$$',
        },
      ],
    },
    {
      id: 3,
      category: 'High',
      options: [
        {
          id: 5,
          title: 'Luxury',
          desc: 'Luxury travel experience',
          icon: <FontAwesomeIcon icon={faGem} />,
          budget: '$$$',
        },
        {
          id: 6,
          title: 'Five-Star Hotel',
          desc: 'High-end accommodation',
          icon: <FontAwesomeIcon icon={faGem} />,
          budget: '$$$',
        },
      ],
    },
  ];


  export const AI_PROMPT='Generate Travel Plan for Location:{location},for {noOfDays} days with a {budget} budget for {travelers} people ,give me hotel option list with Hotel Name, Hotel address, Price in Indian Rupees,hotel image url,geo coordinates,rating, description and usggest itenary with placename,Place Details, Place image Url,Geo Coordinates,ticket Picing, Time to travel each of location for {noOfDays} days with each day plan with best time to visit and for each day keep the plan together and return it in JSON format'