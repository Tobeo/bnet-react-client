import { useState, useEffect } from "react";
import Styled from "styled-components";
import Loader from "../Loader";

const TabHeader = Styled.h1`
    margin-left: 4rem;
`;

const ReputationSummary = (props) => {
    const [allFactions, setAllFactions] = useState(props.allFactions);
    const [reputation, setReputation] = useState(props.reputations);

    useEffect(() => {
        setReputation(props.reputations);
    }, [ props.reputations]);

    useEffect(() => {
        setAllFactions(props.allFactions);
    }, [props.allFactions]);

    const highestReputationCharacter = (factionId, response) => {
        let rawRep = 0;
        let highChar = {};

        for (let i = 0; i < reputation.length; i++) {
            for (let j = 0; j < reputation[i].reputations.length; j++) {
                if (reputation[i].reputations[j].faction.id === factionId) {
                    if (reputation[i].reputations[j].standing.raw > rawRep) {
                        rawRep = reputation[i].reputations[j].standing.raw;
                        highChar = reputation[i];
                    }
                }
            }

        }

        switch (response) {
            case "characterName":
                return highChar.CharacterName;
            case "standingName":
                return highChar.reputations.find(element => element.faction.id === factionId).standing.name.en_GB;
            case "standingRaw":
                const standingName = highChar.reputations.find(element => element.faction.id === factionId).standing.name.en_GB;
                switch (standingName) {
                    //todo: add adjusted levels for Hated - Unfriendly, got no examples
                    case "Hated":
                        return <p>No characters have this reputation</p>;
                    case "Hostile":
                        return <p>No characters have this reputation</p>;
                    case "Unfriendly":
                        return <p>No characters have this reputation</p>;
                    case "Neutral":
                        return (
                            <div className="progress-outer">
                                <div className="progress-inner neutral-rep" style={{ width: Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw) / 3000 * 100 + '%' }}>
                                    <div className="progress-text">
                                        {Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw).toString()} / 3000
                                    </div>
                                </div>
                            </div>
                        )
                    case "Friendly":
                        return (
                            <div className="progress-outer">
                                <div className="progress-inner friendly-rep" style={{ width: Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 3000) / 6000 * 100 + '%' }}>
                                    <div className="progress-text">
                                        {Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 3000).toString()} / 6000
                                    </div>
                                </div>
                            </div>
                        )
                    case "Honored":
                        return (
                            <div className="progress-outer">
                                <div className="progress-inner honored-rep" style={{ width: Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 9000) / 12000 * 100 + '%' }}>
                                    <div className="progress-text">
                                        {Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 9000).toString()} / 12000
                                    </div>
                                </div>
                            </div>
                        )
                    case "Revered":
                        return (
                            <div className="progress-outer">
                                <div className="progress-inner revered-rep" style={{ width: Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 21000) / 21000 * 100 + '%' }}>
                                    <div className="progress-text">
                                        <span>{Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 21000).toString()} / 21000</span>
                                    </div>
                                </div>
                            </div>
                        )
                    case "Exalted":
                        return (
                            <div className="progress-outer">
                                <div className="progress-inner exalted-rep" style={{ width: Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 21000) / 21000 * 100 + '%' }}>
                                    <div className="progress-text">
                                        <span>{Number(highChar.reputations.find(element => element.faction.id === factionId).standing.raw - 21000).toString()} / 21000</span>
                                    </div>
                                </div>
                            </div>
                        )
                    default:
                        return 0;

                }
        }
        return highChar;
    }

    return allFactions === undefined ? (
        <Loader message="Loading all factions" />
    ) :  reputation === undefined ? (
        <Loader message="Loading reputation standings" />
    ) : (
        <>
            <TabHeader>Reputation Summary</TabHeader>
            {allFactions ? (
                <div className={'grid-container'}>
                    {allFactions.factions.map((faction) => (
                        <div className={'grid-item-reputation'} key={faction.id}>
                            <p>{faction.name.en_GB}</p>
                            {highestReputationCharacter(faction.id).CharacterName
                                ? (
                                    <>
                                        <p>Highest rep: <strong>
                                            {highestReputationCharacter(faction.id, 'name').CharacterName}
                                        </strong>
                                        </p>
                                        <p>Standing: <strong>
                                            {highestReputationCharacter(faction.id, 'standingRaw')}


                                            {highestReputationCharacter(faction.id, 'standingName')}
                                        </strong>
                                        </p>
                                    </>
                                )
                                : <p>No characters have this reputation</p>
                            }
                            <br />
                        </div>
                    ))}
                </div>
            ) : null}

        </>

    )
}

export default ReputationSummary;