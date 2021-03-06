import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./styles/Explore.css";
import {ProfileModel} from "../api/ProfileModel";
import {creatorFilter, FetchProfiles} from "../api/fetchProfiles";
import {Link, useLocation} from "react-router-dom";
import Loader from "../components/Loader";

const Explore = (props: any) => {
    const [users, setUsers] = useState<ProfileModel[]>([]);
    const [load, setLoad] = useState(true);

    async function fetchUsers() {
        // @ts-ignore
        FetchProfiles()
            .then((fetchProfiles: any) => {
                setUsers(fetchProfiles)
                console.log(fetchProfiles)
            })
            .finally(() => {
              setLoad(false);
            })
    }

    useEffect(() => {
      fetchUsers().then(() => console.log(users))
    }, []);

    // @ts-ignore
    return (
      <>
        {load ? <Loader/> : <div>
            <div>
                <div className="bg-image-container">
                    <img src="./images/explore page background.jpg" className="bg-image"/>
                </div>
                {/* <div className="bg-text">
                    <h1>Search bar</h1>
                </div> */}
            </div>

            <div className="flex-row">
                <Grid container alignItems="center" style={{width: "90%"}}>
                    {Array(users.length).fill(0).map((e, i) => (
                        <Grid item md={4} sm={6} xs={12}>
                            <div className="card">
                                <Grid container alignItems="center">
                                    <Grid item lg={6} xs={12}>
                                        <div>
                                            <img src="./images/sample profile pic.jpg" className="profilepic"
                                                 alt="sample profile picture"/>
                                            <h5>{users[i].description}</h5>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} xs={12} justifyContent="center" alignItems="center">
                                        <div>
                                            <h2>{users[i].name}</h2>
                                            <h5>{users[i].username}</h5>
                                        </div>
                                        <Link className="nav-link" to={"/profile/" + users[i].publicKey}>
                                            <Button variant="contained" color="error">Profile</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>}
      </>
    );
}

export default Explore;