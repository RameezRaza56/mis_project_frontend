import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useAuth } from 'src/hooks/useAuth'
import { useState, Link } from 'react';
import axios from 'axios';

const AssignCourseCoordinator = () => {
    const [formValues, setFormValues] = useState({ year: "", session: "" });
    const { useSessionYear, useSession } = useAuth()
    const [response, setResponse] = useState([])
    // console.log(useSession);
    var sessionYear = Object.values(useSessionYear);
    var session = Object.values(useSession);
    const handleYear = (e) => {
        setFormValues({ ...formValues, year: e.target.value })
    }
    const handleSession = (e) => {
        setFormValues({ ...formValues, session: e.target.value })
    }
    const fetchcourses = (params) => {
        axios
            .post(process.env.APIURL + 'getCoursesBySession', params)
            .then(async response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setResponse(response.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleClick = (e) => {
        var formData = { session: formValues.session, session_year: formValues.year };
        fetchcourses(formData);
    }
    return (
        <div style={{ padding: "auto" }}>
            <Card sx={{ minWidth: 300, maxWidth: 400, margin: "auto" }}>
                <CardContent>
                    <Box>
                        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                            <InputLabel id="select-year">Select year</InputLabel>
                            <Select
                                labelId="select-year"
                                id="select-year"
                                value={formValues.year}
                                label="Select year"
                                onChange={handleYear}
                            >
                                {sessionYear.map(option => {
                                    return (
                                        <MenuItem key={option.id} value={option.session_year}>{option.session_year}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
                            <InputLabel id="select-session">Select session</InputLabel>
                            <Select
                                labelId="select-session"
                                id="select-session"
                                value={formValues.session}
                                label="Select session"
                                onChange={handleSession}
                            >
                                {session.map(option => {
                                    return (
                                        <MenuItem key={option.id} value={option.session}>{option.session}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
                <CardActions>
                            <Button size="medium" variant="contained" color="primary" disabled={formValues.year === "" || formValues.session === ""} onClick={handleClick}>
                                Search courses
                            </Button>
                </CardActions>

                {
                response.map((data)=>{
                    return (
                        <div>
                            <div>{data.sub_code}</div>
                            <div>{data.subject_name}</div>
                            <div>{data.offered_to_name}</div>
                            <br/>
                        </div>
                    )
                })
            }
            </Card>
        </div>
    )
}

export default AssignCourseCoordinator