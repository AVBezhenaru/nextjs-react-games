import React from 'react';
import {Li, LiHeader, DivSideBar, Ul} from "./sideBarStyle";


const SideBar = () => {
    return (
            <DivSideBar>
                <Ul>
                    <LiHeader>Account</LiHeader>
                    <Li>Profile</Li>
                    <Li>Favorites</Li>
                    <Li>Chats</Li>
                    <Li>Friends</Li>
                    <LiHeader>Main</LiHeader>
                    <Li>News</Li>
                    <Li>Store</Li>
                    <LiHeader>Support</LiHeader>
                    <Li>Report</Li>
                    <Li>Help</Li>
                </Ul>
            </DivSideBar>
    );
};

export default SideBar;