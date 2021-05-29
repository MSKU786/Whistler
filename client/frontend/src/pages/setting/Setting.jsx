import React, { useContext, useRef, useState } from 'react';
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar"
import "./setting.css"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
function Setting(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext)
    const name = useRef();
    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    // const [city, setCity] = useState(user.city);
    // const [from , setFrom] = useState(user.city);
    // const [relationship, setRelationship] = useState(user.relationship);

    const handleChanges = async (e) => {
        e.preventDefault();
        console.log("form slcicked");
        console.log(user);
        let newName = name.current.value;
        let newDesc = desc.current.value;
        let newCity = city.current.value;
        let newFrom = from.current.value;
        let newRelationship = relationship.current.value;

        const updateUser = {
            userID : user._id,
            username: newName,
            desc: newDesc,
            city: newCity,
            from: newFrom,
            relationship: newRelationship
        }
        console.log(updateUser);
        try{
            const res = await axios.put("/users/"+user._id, updateUser);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <form className="settingContainer" onSubmit={handleChanges}>
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF+user?.coverPicture : PF+"cover.jpg"} 
                                alt="Cover Photo" 
                                className="profileCoverImg" />
                            <img src=  {user.profilePicture ? PF+user?.profilePicture  : PF+"profile.jpg"} 
                                alt="User Photo" 
                                className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            {console.log(user)}
                            <input className="profileName" placeHolder={user.username} ref={name} className="inputProfileName"/>
                            <input 
                                ref={desc} placeHolder={user?.desc?  user.desc : "Type your new discription"}
                                className="inputProfileDesc"
                            />
                        </div>
                    </div>
                    <div className="personalInfoContainer">
                        <div className="cityContainer">
                            <input 
                                className="profileName" 
                                placeHolder="City" 
                                className="inputProfileName"
                                ref= {city}    
                            />
                        </div>
                        <div className="fromContainer">
                            <input className="profileName" 
                                placeHolder="From" 
                                className="inputProfileName"
                                ref= {from}
                            />
                        </div>
                        <div className="relationshipContainer">
                            <input 
                                className="profileDesc" 
                                placeHolder="Relationship Status" 
                                className="inputProfileDesc"
                                ref= {relationship}
                            />
                        </div>
                    </div>
                    <button className="saveChanges" type="submit" >Save</button>
                </form>
            </div>
        </>
    );
}

export default Setting;