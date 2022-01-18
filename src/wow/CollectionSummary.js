import { useState, useEffect } from "react";
import Styled from "styled-components";
import Loader from "../Loader";

const TabHeader = Styled.h1`
    margin-left: 4rem;
`;

const CollectionSummary = (props) => {
    const [collections, setCollections] = useState(props.collectionsSummary);

    useEffect(() => {
        setCollections(props.collectionsSummary);
    }, [props.collectionsSummary]);


    return collections === undefined ? (
        <Loader message="Loading Collections..."/>
    ) : collections ? (
        <>
            <TabHeader>Collection Summary</TabHeader>
            <b style={{marginLeft:'4rem'}}>Collected mounts:</b>
                <div className={'grid-container'}>
                    {collections.mounts.map((mount) => (
                        <div className={'grid-item'}key={mount.mount.id}>
                            {mount.mount.name.en_GB}
                        </div>
                    ))}
                </div>
        </>
    ) : null;
};




export default CollectionSummary;