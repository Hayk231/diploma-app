import React, {useEffect, useState} from 'react';
import './GoalModal.scss';
import axios from "axios";
import {baseUrl, getToken} from "../../../Helpers/Constants";
import Loading from "../../../Helpers/components/Loading/Loading";
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch} from "react-redux";
import {triggerChange} from "../../../redux/Admin/adminActions";

const GoalImageModal = ({data}) => {
    const [statData, setStatData] = useState([]);
    const [thumbImageData, setThumbImageData] = useState(data.thumbnailImageData || null);
    const [customLoading, setCustomLoading] = useState(false);
    const dispatch = useDispatch();

    const AuthStr = 'Bearer '.concat(getToken());

    useEffect(() => {
        setCustomLoading(true)
        axios.get(baseUrl + `goals/${data.organizationUserId}/${data.id}/data`, {
            headers: {Authorization: AuthStr}
        }).then(res => {
            setStatData(res.data);
            setCustomLoading(false)
        })

        return () => {
            dispatch(triggerChange());
        }
    },[]);

    const uploadThumbImage = (event) => {
        const thumbImage = event.target.files[0]
        const imageData = new FormData();
        imageData.append('image', thumbImage);
        imageData.append('isThumbnail', true);
        setCustomLoading(true)
        axios.post(baseUrl + `goals/${data.organizationUserId}/${data.id}/images`,
                        imageData, {headers: {Authorization: AuthStr,}})
            .then(res => {
                setThumbImageData(res.data)
                setCustomLoading(false)
            })
    }

    const deleteThumbImage = () => {
        setCustomLoading(true)
        axios.delete(baseUrl + `goals/${data.organizationUserId}/${data.id}/images/${thumbImageData.publicId}`,
            {headers: {Authorization: AuthStr}})
            .then(() => {
                setThumbImageData(null)
                setCustomLoading(false)
        })
    }

    console.log('stat', statData)
    return (
        <div style={{minHeight: '300px'}}>
            { customLoading && <Loading/> }
            <div className='thumb_image_container'>
                {
                    thumbImageData ? (
                        <div className='thumb_image_exists'>
                            <img src={thumbImageData.url} alt={data.title}/>
                            <div className='thumb_image_delete_container' onClick={deleteThumbImage}>
                                <DeleteForeverIcon/>
                            </div>
                        </div>
                    ) : (
                        <label className='thumb_image_empty'>
                            <div>
                                <AddIcon/>
                            </div>
                            <input type="file" accept="image/*" onChange={event => uploadThumbImage(event)}/>
                        </label>
                    )
                }
            </div>
        </div>
    );
}

export default GoalImageModal;