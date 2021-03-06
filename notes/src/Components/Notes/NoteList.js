import React from 'react';
import {Link} from 'react-router-dom'; 

import NoteCard from './NoteCard';
import './notes.css';

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            totalPages: 1,
            notesPerPage: 10,
            searchText: '',
        }
    }

    componentDidMount() {
        this.setState({
            totalPages: Math.ceil(this.props.notes.length / 10),
        })
    }

    /* Goto the previous page of notes. */
    prevPage = () => {
        if (this.state.pageNumber === 1) {
            return 0;
        }
        else {
            this.setState({
                pageNumber: this.state.pageNumber - 1,
            })
        }
    }

    /* Goto the next page of notes. */
    nextPage = () => {
        if (this.state.pageNumber === this.state.totalPages) {
            return 0;
        }
        else {
            this.setState({
                pageNumber: this.state.pageNumber + 1,
            })
        }
    }

    search = e => {
        this.setState({
            searchText: e.target.value,
        })
    }

    render() {
        /* Pagination logic */
        let pageNotes = [];

        // This returns NaN without coercing it into a Number
        let limit = Number(this.state.notesPerPage * this.state.pageNumber);
        if (limit > this.props.notes.length) {
            // If we've reached the end of the notes then don't get an index out of bounds exception.
            limit = this.props.notes.length;
        }
        if (this.props.notes.length > this.state.notesPerPage) {
            for(let i = (this.state.pageNumber-1) * 10; i < limit;  i++) {
                pageNotes.push(this.props.notes[i]);
            }
        }
        else {
            pageNotes = this.props.notes;
        }

        return (
            <>
            <h2>Your Notes: Page {this.state.pageNumber}</h2>
            <label onChange={this.search}>Search: </label>
            <input className='search-bar' name='search' type='text' onChange={this.search}>{this.searchText}</input>
            <div className='note-list'>
                {pageNotes.map(note => {                 
                    return (
                        <Link to={`/note/${note.id}`} className='card-link' key={note.id + note.title}> 
                            <NoteCard key={note.id} note={note} search={this.state.searchText}/>
                        </Link>
                    )
                })}
            </div>
            {this.props.notes.length > this.state.notesPerPage 
                ? <><button onClick={this.prevPage}>&larr;</button> <button onClick={this.nextPage}>&rarr;</button></> 
                : <></> 
            }
            </>
        )
    }
}

export default NoteList;