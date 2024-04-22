import { useState, useEffect } from "react";
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {userRequest} from '../../requestmethods'
export default function WidgetSm() {
  const [users, serUsers] = useState([])
  
useEffect(() => {
    const getusers = async () => {
      try{
      const res = await userRequest.get('/users/?new=true') 
      serUsers(res.data)
      } catch{}
    }
  getusers()
  
  }, [])
 
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user=> (
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img ||
            "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            }
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            <span className="widgetSmUserTitle">{}</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Display
          </button>
        </li>
       ))}
        
      </ul>
    </div>
  );
}
