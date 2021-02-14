/**
 * Component to render the GitHub public repositories in a tabular structure build using Matrial UI & Material Table 
 */

import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import gridIcons from '../../assets/theme/material-icons'
import repoGridStyles from './styles'

export default function RepoGridMaterial(props) {

    let [gitRepos, setGitRepos] = useState([]);
    let styles = repoGridStyles();

    /**
     * Update Git Repos local state object whenever the props is changed
    */
    useEffect(() => {
        setGitRepos(props.gitRepos);
    }, [props.gitRepos])

    /**
     * Deletes the repository row from the grid
     * @param {*} event : trigger event
     * @param {*} rowData : data related to the row which is being deleted
     */
    const deleteRepoFromGrid = (event, rowData) => {
        setGitRepos(gitRepos => gitRepos.filter(x => x.id !== rowData.id))
    }

    return (
        <div className={styles.grid}>
            <MaterialTable
                title=''
                className={styles.grid}
                icons={gridIcons}
                columns={[
                    {
                        title: 'Owner',
                        render: (client) => {
                            return <span><img src={client.avatar} className={styles.avatar} /> {client.owner}</span>
                        },
                        cellStyle: {
                            width: '15%'
                        }
                    },
                    {
                        title: 'Name',
                        field: 'repo_name',
                        cellStyle: {
                            width: '15%'
                        }
                    },
                    {
                        title: 'Repo Link',
                        render: (client) => {
                            return <a href={client.repo_url} target='_blank'>{client.repo_full_name}</a>
                        },
                        cellStyle: {
                            width: '20%'
                        }
                    },
                    {
                        title: 'Description',
                        field: 'description',
                        cellStyle: {
                            width: '45%'
                        }
                    }
                ]}
                data={gitRepos}
                actions={[
                    ({
                        icon: gridIcons.Delete,
                        iconProps: {
                            style: {
                                color: 'red !important'
                            }
                        },
                        tooltip: 'Delete Repo',
                        onClick: (event, rowData) => { deleteRepoFromGrid(event, rowData) },
                    })
                ]}
                options={{
                    search: true,
                    sorting: true,
                    paging: true,
                    pageSize: 5,
                    actionsColumnIndex: -1,
                    headerStyle: {
                        height: 20,
                        backgroundColor: '#01579b',
                        color: '#fff',
                        fontSize: '0.9em',
                        fontWeight: 'bold'
                    },
                    cellStyle: {
                        whiteSpace: 'nowrap',
                        fontSize: '0.8em'
                    },
                }}
            />
        </div>

    )
}
