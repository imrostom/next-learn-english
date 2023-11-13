'use client';

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import LetterWordList from "./LetterWordList";

const getWordList = async (params = null) => {
    let url = process.env.NEXT_PUBLIC_API_URL + '/words';
    if (params) {
        url = url + '?' + new URLSearchParams(params);
    }

    const data = await fetch(url, params);
    return data.json();
}

export default function WordList() {
    const [wordList, setWordList] = useState([]);
    const [pageCount, setPageCount] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetchWordList();
    }, []);

    useEffect(() => {
        fetchWordList({ current_page: currentPage, filter });
    }, [filter, currentPage]);

    const handleWordListByFilterLetter = (letter) => {
        setFilter(letter);
        setCurrentPage(1);
    }

    const handleWordListByPagination = ({ selected }) => {
        setCurrentPage(selected + 1);
    }

    async function fetchWordList(params = null) {
        try {
            const { data: { data, pagination } } = await getWordList(params);
            console.log(data, pagination);
            console.log(parseInt(pagination.lastPage));
            setWordList(data);
            setPageCount(parseInt(pagination.lastPage));
        } catch (error) {
            console.error("Error fetching word list:", error);
        }
    }

    const calculateSerialNo = (index) => {
        // Assuming currentPage is 1-indexed
        const itemsPerPage = 50;
        const startingSerialNo = (currentPage - 1) * itemsPerPage;
    
        // Serial number for the current item on the page
        const currentSerialNo = startingSerialNo + index + 1;
    
        return currentSerialNo;
    };
    

    return (
        <div className='body-area'>
            
            <LetterWordList handleWordListByFilterLetter={handleWordListByFilterLetter}></LetterWordList>

            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-success">
                        <th>#</th>
                        <th>Word</th>
                        <th>Translate</th>
                        <th>POS</th>
                    </tr>
                </thead>
                <tbody>
                    {wordList.map((word, index) => (
                        <tr key={index}>
                            <td>{calculateSerialNo(index)}</td>
                            <td>{word.word}</td>
                            <td>{word.translate}</td>
                            <td>{word.pos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <ReactPaginate
                    key={pageCount}
                    breakLabel="..."
                    previousLabel="< Previous"
                    nextLabel="Next >"
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    onPageChange={handleWordListByPagination}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                />

            </div>
        </div>
    )
}