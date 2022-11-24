import React from 'react';
import {withRouter} from "next/router";
import Header from "../header/header";
import SideBar from "../header/sideBar";
import {DivPage, Section} from "../profile/profileStyle";
import {Chat, Page, Friend, SelectFriend, FullChat, SentMessage, InputMessage} from "./chatsFormStyle";
import {Search} from "../header/headerStyle";

const ChatsForm = () => {
    return (
        <Section>
            <Header/>
            <DivPage>
                <SideBar/>
                <Page>
                    <Friend>
                        <span style={{display:'flex', flexDirection:'column', gap:'20px', padding:' 0 0 10px 0' , borderBottom:'1px solid rgba(128, 128, 128, 0.11)'}}>
                            <img src={'https://consultus.org/cus/wp-content/uploads/2015/06/Avatare-w-2.jpg'}
                                 alt={''}
                                 style={{width: '40px', height: 'auto'}}/>
                        <Search type={'text'} placeholder={'Search'} style={{width:'300px'}}/>
                        </span>

                    </Friend>
                    <Chat>
                        <SelectFriend>
                            Тут будет выбранный друг
                        </SelectFriend>
                        <FullChat>
                            переписка
                        </FullChat>
                        <SentMessage>
                            <InputMessage placeholder={'Type a message'}/>
                        </SentMessage>
                    </Chat>
                </Page>
            </DivPage>

        </Section>

    );
};

export default withRouter(ChatsForm);