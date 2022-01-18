import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Loader from '../Loader';

const TabHeader = Styled.h1`
    margin-left: 4rem;
`;

const ProfileSummary = (props) => {
    const [accounts, setAccounts] = useState(props.profileSummary);

    useEffect(() => {
        setAccounts(props.profileSummary);
    }, [props.profileSummary]);

    console.log()
    return accounts === undefined ? (
        <Loader message="Loading Profile..."/>
    ) : accounts ? (
        <>
            <TabHeader>Profile Summary</TabHeader>
                <div>
                    {accounts.wow_accounts.map((account) => (
                            <table key={account.id}>
                            <thead>
                                <tr>
                                    <th>Account ID</th>
                                    <th>Character Name</th>
                                    <th>Character Level</th>
                                    <th>Character Race</th>
                                    <th>Character Class</th>
                                    <th>Realm</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {account.characters.map((character) => (
                                        <tr key={character.id}>
                                            <td>{account.id}</td>
                                            <td>{character.name}</td>
                                            <td>{character.level}</td>
                                            <td>{character.playable_race.name.en_GB}</td>
                                            <td>{character.playable_class.name.en_GB}</td>
                                            <td>{character.realm.name.en_GB}</td>
                                        </tr>
                                    ))}
                                
                            </tbody>
                        </table>
                    ))}
                </div>
        </>
    ) : null;
};


export default ProfileSummary;