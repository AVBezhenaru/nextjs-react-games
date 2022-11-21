import React from 'react';
import {withRouter} from "next/router";
import Header from "../header/header";
import SideBar from "../header/sideBar";
import {DivPage, Section} from "../profile/profileStyle";
import {Chat, Page, Friend, SelectFriend, FullChat} from "./chatsFormStyle";
import {Search} from "../header/headerStyle";

const ChatsForm = () => {
    return (
        <Section>
            <Header/>
            <DivPage>
                <SideBar/>
                <Page>
                    <Friend>
                        <Search type={'text'} placeholder={'Search'}/>
                    </Friend>
                    <Chat>
                        <SelectFriend>
                            nknk
                        </SelectFriend>
                        <FullChat>
                            hkkkh
                        </FullChat>
                    </Chat>
                </Page>
            </DivPage>

        </Section>

    );
};

export default withRouter(ChatsForm);