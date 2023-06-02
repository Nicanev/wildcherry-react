import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as Loop} from "../../assets/icons/Loop.svg";

export function SearchMobile() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const searchHandler = async () => {
        if (search) {
            navigate(`/search/${search}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchHandler();
        }
    };

    return (
        <>
            <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Искать на Wildcherry.."
            />
            <button onClick={searchHandler}>
                <Loop/>
            </button>
        </>
    );
}