import { useState, useEffect } from "react";
import "./liveUser.scss";
import axios from "axios";
export const LiveUser = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  // API calls =>
  const getRandomUserData = async () => {
    let { data: { results } } = await axios.get("https://randomuser.me/api?results=70");
    setUser([...results]);
  }


  useEffect(() => {
    getRandomUserData();
  }, []);

  // Search =>
  const searchUser = (e) => {
    let { value } = e.target;
    setSearch(value)
  }
  return (
    <div className="liveUser-contai">
      <div className="header">
        <div className="header1">
          <b>Live User Filter</b>
          <p>Search People by their Name</p>
        </div>
        <input type="text" placeholder="Search" value={search} onChange={searchUser} />
      </div>
      <div className="hero-content">
        {
          user.map((_, i) => {
            return (
              <>
                {
                  (_.name.first.toLowerCase().includes(search.toLowerCase())) && (<div className="userData" key={i}>
                    <img className="img" src={_.picture.thumbnail} alt="" />
                    <div className="userAbout">
                      <h5>{_.name.first}</h5>
                      <p>{_.location.country}</p>
                    </div>
                  </div>)
                }
              </>
            )
          })

        }
      </div>
    </div>
  )
}


