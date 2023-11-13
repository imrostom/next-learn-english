'use client';

import { useEffect, useState } from "react";

const getLetterWordCountList = async () => {
    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/letter-word-count');
    return data.json();
}

export default function LetterWordList({handleWordListByFilterLetter}) {
    const [letterWordCountList, setLetterWordCountList] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetchLetterWordCountList();
    }, []);

    const handleFilterLetter = (letter) => {
        setFilter(letter);
        handleWordListByFilterLetter(letter);
    }

    async function fetchLetterWordCountList() {
        try {
            const { data } = await getLetterWordCountList();
            setLetterWordCountList(data);
        } catch (error) {
            console.error("Error fetching letter word count list:", error);
        }
    }

    return (
        <div className="mb-3">
            {letterWordCountList.map((letter, index) => (
                <span 
                    key={index}
                    style={{cursor: 'pointer'}}
                    onClick={() => handleFilterLetter(letter.letter)} 
                    className={`badge mx-1 ${filter === letter.letter ? 'bg-success' : 'bg-dark'}`} 
                >
                    {letter.letter} ({letter.count})
                </span>
            ))}

            {filter && <p className="mt-3">Now you are filtering word list data based on letter <span className="badge bg-success">{filter}</span></p>}
        </div>
    )
}