import React from 'react';
import {DivPage, Section} from "../profile/profileStyle";
import Header from "../header/header";
import SideBar from "../header/sideBar";
import {DivFriends, DivSearch, FriendItem, Page, Search, SelectFilter} from "./friendsStyle";
import Select from 'react-select';


const FriendsForm = () => {

    const options = [
        {label: "All", value: 1, style: { color: 'red' }},
        {label: "Online", value: 2, style: { color: 'red' }},
        {label: "Offline", value: 3, style: { color: 'blue' }}
    ];

    return (
        <Section>
            <Header/>
            <DivPage>
                <SideBar/>
                <Page>
                    <DivSearch>
                        <Search type={'text'} placeholder={'Search'}/>
                        <SelectFilter>
                            <Select options={options} />
                        </SelectFilter>

                    </DivSearch>
                    <DivFriends>
                        <FriendItem/>
                        <FriendItem/>
                        <FriendItem/>
                        <FriendItem/>
                    </DivFriends>

                </Page>

            </DivPage>
        </Section>
    );
};

export default FriendsForm;