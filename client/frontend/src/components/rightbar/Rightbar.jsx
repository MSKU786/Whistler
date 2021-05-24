import React from 'react';
import "./rightbar.css"
function Rightbar(props) {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img src="./assets/birthday.jpg" alt="birthday" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Batisata </b> and <b>2 others poeple</b> have birthday today
                    </span>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img src="./assets/Zayn.jpg" alt="1" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <div className="rightbarUserName">Zayn</div>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img src="./assets/Zayn.jpg" alt="1" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <div className="rightbarUserName">Zayn</div>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img src="./assets/Zayn.jpg" alt="1" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <div className="rightbarUserName">Zayn</div>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img src="./assets/Zayn.jpg" alt="1" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <div className="rightbarUserName">Zayn</div>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img src="./assets/Zayn.jpg" alt="1" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <div className="rightbarUserName">Zayn</div>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img src="./assets/Zayn.jpg" alt="1" className="rightbarProfileImg" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <div className="rightbarUserName">Zayn</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Rightbar;