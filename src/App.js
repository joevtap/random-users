import React, { useState, useEffect } from "react";
import StyledContentLoader from "styled-content-loader";
import "./App.css";

export default function App() {
    const [personName, setPersonName] = useState(null);
    const [personLastName, setPersonLastName] = useState(null);
    const [personPicture, setPersonPicture] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://api.randomuser.me/");
            const data = await response.json();
            const name = data.results[0].name.first;
            const lastName = data.results[0].name.last;
            const picture = data.results[0].picture.large;
            setPersonName(name);
            setPersonLastName(lastName);
            setPersonPicture(picture);
        }
        fetchData();
    }, []);

    function refreshPage() {
        window.location.reload(false);
    }

    if (personName !== null) {
        return (
            <div className="App">
                <div className="card">
                    <img
                        className="profile-pic"
                        src={personPicture}
                        alt="profile"
                    />
                    <p className="name">{`${personName} ${personLastName}`}</p>
                    <button className="refresh" onClick={refreshPage}>
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <StyledContentLoader backgroundColor="#1d2d50" foregroundColor="#133b5c">
                <div className="card"/>
            </StyledContentLoader>
        </div>
    );
}
