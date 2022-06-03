import React, { useState } from "react";
import Footer from "../components/Footer";
import "./styles/Home.css";
import About from "../components/About";
import Data from "../components/mockdata.json";

const Home: React.FC = () => {
  const [state, setState] = useState<string>();
  const [data, setdata] = useState(Data);
  const [search, setsearch] = useState("");
  const updateData = async (ele: any) => {
    setsearch(ele);
    const newData = await data.filter((element) => {
      const PostName = element.first_name.toLowerCase();
      const PostLastName = element.last_name.toLowerCase();
      return PostName.includes(ele) || PostLastName.includes(ele);
    })
    await setdata(newData);
  }
  return (
    <>
      <h1>Home</h1>
      <form action="/" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search users</span>
        </label>
        <div>
        <img className="Searchimg" src="https://buildingoutloud.solana.com/images/finalist-gradient.png" alt="" />
        <div className="search-bar">
         
        <input
          type="text"
          id="header-search"
          placeholder="Search Users"
          name="s"
          onChange={(e) => { updateData(e.target.value) }}
        />
        <button type="submit" >Go!</button>

        </div>
        </div>
       
      </form>
      {
        (search != "") ?
          (data.map((item) => (
            <h3>{item.first_name} {item.last_name}</h3>
          ))
          )
          : ""
      }
      <About/>
      <Footer />
    </>
  );
}

export default Home;