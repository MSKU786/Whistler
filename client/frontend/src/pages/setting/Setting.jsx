import React, { useContext, useRef, useState } from 'react';
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar"
import "./setting.css"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Cancel, Edit, PermMedia } from '@material-ui/icons';
function Setting(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext)
    const name = useRef();
    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);


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
                <div className="settingMainContainer">
                    {file1 && (
                        <div className="shareImgContainer">
                            <img className = "shareImg" src={URL.createObjectURL(file1)} alt = "No preview "/>
                            <Cancel className = "shareCancelImg" onClick={() => setFile1(null)}/>
                        </div>
                    )}

                    {file2 && (
                        <div className="shareImgContainer2">
                            <img className = "shareImg2" src={URL.createObjectURL(file2)} alt = "No preview "/>
                            <Cancel className = "shareCancelImg2" onClick={() => setFile2(null)}/>
                        </div>
                    )}
                    <form className="settingContainer" onSubmit={handleChanges}>
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={user.coverPicture ? PF+user?.coverPicture : PF+"cover.jpg"} 
                                    alt="Cover Phot" o
                                    className="profileCoverImg" />
                                <label htmlFor="file1" className="shareOption">
                                    <Edit className = "shareIcon"  />
                                    <span className = "shareOptionText"></span>
                                    <input 
                                        style={{display:"none"}}
                                        type= "file" id = "file1" 
                                        accept=".png, .jpeg, .jpg" 
                                        onChange= {(e)=>setFile1(e.target.files[0])}
                                    />
                                </label>
                                <img src=  {user.profilePicture ? PF+user?.profilePicture  : PF+"profile.jpg"} 
                                    alt="User Photo" 
                                    className="profileUserImg" 
                                />
                                <label htmlFor="file2" className="shareOption">
                                    <Edit className = "shareIcon"  />
                                    <span className = "shareOptionText">Photo or video </span>
                                    <input 
                                        style={{display:"none"}}
                                        type= "file" id = "file2" 
                                        accept=".png, .jpeg, .jpg" 
                                        onChange= {(e)=>setFile2(e.target.files[0])}
                                    />
                                </label>
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
            </div>
        </>
    );
}

export default Setting;