import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useStyles from './styles';
import {createPost, updatePost} from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate();
    let isCorrect = true;
    const [isTitle, setIsTitle] = useState(true)
    const [isMessage, setIsMessage] = useState(true)
    const [isPhoto, setIsPhoto] = useState(true)

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const validation = (values) => {

        isCorrect = true
        setIsTitle(true)
        setIsMessage(true)
        setIsPhoto(true)

        if(values.title === '') {
            setIsTitle(false)
            isCorrect = false
        }

        if(values.message === '') {
            setIsMessage(false)
            isCorrect = false
        }

        if(values.selectedFile === '')
        {
            setIsPhoto(false)
            isCorrect = false;
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validation(postData)
        if(isCorrect)
        {
            if(currentId){
                dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
            } else {
                dispatch(createPost({...postData, name: user?.result?.name}, navigate));
            }

            clear();
        }
    }
    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own posts and like other's posts.
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: ''});
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" required={true} fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                {!isTitle &&(
                    <p style={{color: 'red', marginLeft: '10px'}}> Tile is required!</p>
                )}
                <TextField name="message" variant="outlined" label="Message" required={true} fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                {!isMessage &&(
                    <p style={{color: 'red', marginLeft: '10px'}}> Message is required!</p>
                )}
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type ="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/></div>
                {!isPhoto &&(
                    <p style={{color: 'red'}}> Image is required!</p>
                )}
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;