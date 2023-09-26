import './App.css';
import { Card} from 'react-bootstrap';
import { useState, useEffect } from "react";

export default function App() {
  const [menus, setMenus] = useState([]);
  const [search ,setsearch] = useState('')

  useEffect(() => {
  async function getMenu() {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`);
    const data = await res.json();
    // console.log(data.data.recipes);
    setMenus(data.data.recipes);
  }
    getMenu();
  }, [search]);
  return (
      <div className="App">
      <Header />
      <SubHeader setsearch={setsearch} />
      <Menu menus={menus} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <h1 className='header'>FAST REACT PIZZA CO.</h1>
  );
}

function SubHeader({setsearch}) {
  return (
    <div className='subHeader'>
      <div className='underline'></div>
      <h2 className='text'>Our Menu</h2>
      <div className='underline'></div>
      <input className='search-input'
      type='text' 
      placeholder='Search Item...'
      onChange={(e)=>setsearch(e.target.value)}
      />
    </div>
  );
}

function Menu({ menus }) {
  return (
    <div className='ITEM' >
      {menus.map((menu) => (
        <CardComponent key={menu.id} image={menu.image_url} title={menu.title} />
      ))}
    </div>
  );
}

function Footer() {
    return(
      <div className='footer'>
        <p>We're open until 22:00. Come visit us or order onine.</p>
        <button>Order Now</button>
   
      </div>

    )  
}

function CardComponent({ image, title }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img className='CARD-IMG' variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

