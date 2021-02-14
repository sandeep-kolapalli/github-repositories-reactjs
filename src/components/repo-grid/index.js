/**
 * Component to render the GitHub public repositories in a tabular structure build using Bootstrap, JS and CSS 
 */

import React, { useState, useEffect } from 'react'
import './styles.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
const _ = require('lodash')

export default function RepoGrid(props) {
    let [gitRepos, setGitRepos] = useState([]);
    let [sortKey, setSortKey] = useState('owner');
    let [isSortDirectionAsc, setSortDirection] = useState('asc');

    /**
     * Update Git Repos local state object whenever the props is changed
     */
    useEffect(() => {
        setGitRepos(_.sortBy(props.gitRepos, [repo => repo[sortKey].toLowerCase()]));
    }, [props.gitRepos])

    /**
     * Deletes the repository row from the grid
     * @param {*} id : unique id of the repo
     */
    const deleteRepoFromGrid = (id) => {
        setGitRepos(gitRepos => gitRepos.filter(x => x.id !== id))
    }

    /**
     * Triggers an event whenever data is chnaged in the search text box
     * @param {*} event : Trigger event
     */
    const handleSearchChange = (event) => {
        let searchText = event.target.value.toLowerCase();

        setGitRepos(props.gitRepos.filter(x =>
            x.repo_name.toLowerCase().indexOf(searchText) !== -1 ||
            x.owner.toLowerCase().indexOf(searchText) !== -1 ||
            (x.description && x.description.toLowerCase().indexOf(searchText) !== -1)
        ))
    }

    /**
     * Sorts the grid repo based on the column and order selected
     * @param {*} sortKeyName 
     */
    const sortRepoGrid = (sortKeyName) => {
        let isAsc = sortKeyName === sortKey ? !isSortDirectionAsc : true;
        setSortKey(sortKeyName);
        setSortDirection(isAsc);
        setGitRepos(
            _.orderBy(props.gitRepos, [repo => repo[sortKeyName].toLowerCase()], [isAsc ? 'asc' : 'desc'])
        );
    }

    /**
     * Commented out to check the API issue where only 100 repos are returned at max 
     */
    // const handleRepoCountChange = (event) => {
    //     const repoCount = event.target.value;
    //     props.loadGitRepoGrid(repoCount);
    // }

    return (
        <div className='table-responsive tbl-repos'>
            <input
                type='text'
                className='form-control txt-search'
                placeholder='Search'
                onChange={handleSearchChange}
            />
            
            {/* <span className='span-repo-count'>
                Repo Count
                <select
                    className='form-control ddl-repo-count'
                    placeholder='Search'
                    onChange={handleRepoCountChange}>
                    {
                        [100, 200, 500]
                            .map(count => <option value={count} key={count}>{count}</option>)
                    }
                </select>
            </span> */}

            <table className='table tbl-git-repos'>
                <thead>
                    <tr>
                        <th style={{ width: '15%' }} onClick={() => sortRepoGrid('owner')}>
                            Owner
                            <i className={`bi ${sortKey === 'owner' ? isSortDirectionAsc ? 'bi-caret-up-fill' : 'bi-caret-down-fill' : ''}`}></i>
                        </th>
                        <th style={{ width: '15%' }} onClick={() => sortRepoGrid('repo_name')}>
                            Repo Name
                            <i className={`bi ${sortKey === 'repo_name' ? isSortDirectionAsc ? 'bi-caret-up-fill' : 'bi-caret-down-fill' : ''}`}></i>
                        </th>
                        <th style={{ width: '20%' }} onClick={() => sortRepoGrid('repo_url')}>
                            Repo Link
                            <i className={`bi ${sortKey === 'repo_url' ? isSortDirectionAsc ? 'bi-caret-up-fill' : 'bi-caret-down-fill' : ''}`}></i>
                        </th>
                        <th style={{ width: '45%' }} className='no-cursor'>
                            Description
                        </th>
                        <th style={{ width: '5%' }} className='no-cursor'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gitRepos.length === 0 &&
                        <tr key='no-records'>
                            <td colSpan='5'>
                                No records to display
                            </td>
                        </tr>
                    }
                    {
                        gitRepos.map(x => {
                            return (
                                <tr key={`${x.repo_name}-${x.owner}`}>
                                    <td>
                                        <img src={x.avatar} className='img-repo-owner' /> {x.owner}
                                    </td>
                                    <td>
                                        {x.repo_name}
                                    </td>
                                    <td>
                                        <a href={x.repo_url} target='_blank'>{x.repo_full_name}</a>
                                    </td>
                                    <td>
                                        {x.description}
                                    </td>
                                    <td>
                                        <i className='bi bi-trash img-delete-repo' title='Delete the repository from the grid' onClick={() => deleteRepoFromGrid(x.id)}></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}