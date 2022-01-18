import { Navbar, Alignment, Tabs, Tab } from '@blueprintjs/core';
import { UserContext } from './context/UserContext';
import BnetLoginButton from './BnetLoginButton';
import BnetLogoutButton from './BnetLogoutButton';
import React, { useContext, useEffect, useState } from 'react';
import ProfileSummary from './wow/ProfileSummary';
import CollectionSummary from './wow/CollectionSummary';
import ReputationSummary from './wow/ReputationSummary';

const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';

const BnetLanding = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [battletag, setBattleTag] = useState();
    const [profileSummary, setProfileSummary] = useState();
    const [collectionsSummary, setCollectionsSummary] = useState();
    const [currentNavbarTab, setCurrentNavbarTab] = useState('profile');
    const [reputations, setReputations] = useState();
    const [allFactions, setAllFactions] = useState();

    const getUserInfo = () => {
        fetch(REACT_APP_API_ENDPOINT + "oauth/getUserInfo", {
            method: "GET",
            credentials: "include",
        })
            .then(async response => {
                if (!response.ok) {
                    console.log("Error getting user info");
                } else {
                    const data = await response.json();
                    setBattleTag(data.battletag);
                }
            }
            );
    };

    const getProfileSummary = async () => {
        fetch(REACT_APP_API_ENDPOINT + "wow/getProfileSummary", {
            method: "GET",
            credentials: "include",
        })
            .then(async response => {
                if (!response.ok) {
                    console.log("Error getting wow-profile info");
                } else {
                    const data = await response.json();
                    setProfileSummary(data);
                }
            })
    }

    const getCollectionsSummary = async () => {
        fetch(REACT_APP_API_ENDPOINT + "wow/getCollectionsSummary", {
            method: "GET",
            credentials: "include",
        })
            .then(async response => {
                if (!response.ok) {
                    console.log("Error getting wow-collections info");
                } else {
                    const data = await response.json();
                    setCollectionsSummary(data);
                }
            })
    }

    const getReputations = async () => {
        fetch(REACT_APP_API_ENDPOINT + "wow/getReputations", {
            method: "GET",
            credentials: "include",
        })
            .then(async response => {
                if (!response.ok) {
                    console.log("Error getting wow-reputations info");
                } else {
                    const data = await response.json();
                    setReputations(data);
                }
            })
    }

    const getAllFactions = async () => {
        fetch(REACT_APP_API_ENDPOINT + "wow/getAllFactions", {
            method: "GET",
            credentials: "include",
        })
            .then(async response => {
                if (!response.ok) {
                    console.log("Error getting wow-all-factions info");
                } else {
                    const data = await response.json();
                    setAllFactions(data);
                }
            })
    }

    useEffect(() => {
        getUserInfo();
    }, [userContext.token]);

    useEffect(() => {
        getProfileSummary();
    }, [userContext.token]);

    useEffect(() => {
        getCollectionsSummary();
    }, [userContext.token]);

    useEffect(() => {
        getReputations();
    }, [userContext.token]);

    useEffect(() => {
        getAllFactions();
    }, [userContext.token]);


    const BattlenetHeader = () => (
        <Navbar>
            <Navbar.Group>
                <Tabs
                    large={true}
                    id="navbar-tabs"
                    onChange={(tabId) => setCurrentNavbarTab(tabId)}
                    selectedTabId={currentNavbarTab}
                >
                    <Tab id="profile" title="Profile" />
                    <Tab id="collections" title="Collections" />
                    <Tab id="reputation" title="Reputations" />
                </Tabs>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                {battletag ? (
                    <Navbar.Heading>
                        Logged in as: <strong>{battletag}</strong>
                    </Navbar.Heading>
                ) : null}

                {!userContext.token ? (
                    <BnetLoginButton className="bp3-minimal" />
                ) : (
                    <BnetLogoutButton className="bp3-minimal" />
                )}
            </Navbar.Group>
        </Navbar>
    )

    return userContext.token === null ? (
        <>
            <BattlenetHeader />
            <p style={{ textAlign: 'center' }}>Please log in.</p>
        </>
    ) : (
        <>
            <BattlenetHeader />
            {currentNavbarTab === "profile" ? (
                <ProfileSummary profileSummary={profileSummary} />
            ) : null}
            {currentNavbarTab === "collections" ? (
                <CollectionSummary collectionsSummary={collectionsSummary} />
            ) : null}
            {currentNavbarTab === "reputation" ? (
                <ReputationSummary reputations={reputations} allFactions={allFactions} />
            ) : null}
        </>
    )
}

export default BnetLanding;