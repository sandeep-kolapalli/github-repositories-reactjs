/**
 * Component to render the home page layout.
 * API call to fetch the GitHub repositories will, which then will be passed as props to the Grid components
 * Features 2 kinds of grids - 
 *  1. Based on Bootstrap, JS, CSS stylings
 *  2. Based on Material UI and Material Table
 */

import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { fetchGitPublicRepositories } from '../../services/git-service'
import RepoGridMaterial from '../repo-grid-material';
import RepoGrid from '../repo-grid'
import PageHeader from '../page-header';

export default function Home() {

    const [gitRepos, setGitRepos] = useState([]);

    /**
     * Asynchronously fetches the public repositories from GitHub and saves in the state
     * @param {*} count : Count of repositories to be fetched from the API. This can be used for pagination
     */
    async function loadGitRepoGrid(count) {
        fetchGitPublicRepositories(1, count).then(res => {
            let resLimitedProperties = res.map(x => {
                return {
                    id: x.id,
                    repo_name: x.name,
                    repo_full_name: x.full_name,
                    repo_url: x.html_url,
                    owner: x.owner.login,
                    description: x.description,
                    avatar: x.owner.avatar_url
                }
            });

            setGitRepos(resLimitedProperties);
        })
    }

    /**
     * Calls the method 'loadGitRepoGrid' upon component rendering
     */
    useEffect(() => {
        loadGitRepoGrid(100);
    }, [])

    return (
        <div>
            <Router>
                <PageHeader />
                {
                    gitRepos.length > 0 &&
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/bootstrap-grid" />
                        </Route>
                        <Route path='/bootstrap-grid'>
                            <RepoGrid className='repoGridMain' gitRepos={gitRepos} loadGitRepoGrid={loadGitRepoGrid} />
                        </Route>
                        <Route path='/material-grid'>
                            <RepoGridMaterial gitRepos={gitRepos} />
                        </Route>
                    </Switch>
                }
            </Router>
        </div>
    )
}