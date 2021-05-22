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
    const [secImageData, setSecImageData] = useState([]);
    const [thumbImageData, setThumbImageData] = useState(data.thumbnailImageData || null);
    const [customLoading, setCustomLoading] = useState(false);
    const dispatch = useDispatch();

    const AuthStr = 'Bearer '.concat(getToken());

    useEffect(() => {
        setCustomLoading(true)
        axios.get(baseUrl + `goals/${data.organizationUserId}/${data.id}/data`, {
            headers: {Authorization: AuthStr}
        }).then(res => {
            setSecImageData(res.data.imagesData);
            setCustomLoading(false)
        })

        return () => {
            dispatch(triggerChange());
        }
    }, []);

    const uploadImage = (event, isThumb) => {
        const thumbImage = event.target.files[0]
        const imageData = new FormData();
        imageData.append('image', thumbImage);
        imageData.append('isThumbnail', isThumb);
        setCustomLoading(true)
        axios.post(baseUrl + `goals/${data.organizationUserId}/${data.id}/images`,
            imageData, {headers: {Authorization: AuthStr,}})
            .then(res => {
                isThumb ? setThumbImageData(res.data)
                        : setSecImageData([...secImageData, res.data]);
                setCustomLoading(false)
            })
    }

    const deleteImage = (publicId, isThumb) => {
        setCustomLoading(true)
        axios.delete(baseUrl + `goals/${data.organizationUserId}/${data.id}/images/${publicId}`,
            {headers: {Authorization: AuthStr}})
            .then(() => {
                 if (isThumb) {
                     setThumbImageData(null)
                 } else {
                     setSecImageData(secImageData.filter(el => el.publicId !== publicId));
                 }
                setThumbImageData(null)
                setCustomLoading(false)
            })
    }

    console.log('stat', secImageData)
    return (
        <div className='goal_image_modal'>
            {customLoading && <Loading/>}
            <div className='thumb_image_container'>
                {
                    thumbImageData ? (
                        <div className='thumb_image_exists'>
                            <img src={thumbImageData.url} alt={data.title}/>
                            <div className='thumb_image_delete_container'
                                 onClick={() => deleteImage(thumbImageData.publicId, true)}>
                                <DeleteForeverIcon/>
                            </div>
                        </div>
                    ) : (
                        <label className='thumb_image_empty'>
                            <div>
                                <AddIcon/>
                            </div>
                            <input type="file" accept="image/*" onChange={event => uploadImage(event, true)}/>
                        </label>
                    )
                }
            </div>
            <div className='sec_image_container'>
                {secImageData.length &&
                    secImageData.filter(image => !image.thumbnail).map(el => (
                        <div className='sec_image_single' key={el.publicId}>
                            <img src={el.url} alt={el.publicId}/>
                            <button onClick={() => deleteImage(el.publicId, false)}>
                                <DeleteForeverIcon/>
                            </button>
                        </div>
                    ))
                }
                <label className='sec_image_add'>
                    <span>+ Add image</span>
                    <input type="file" accept="image/*" onChange={event => uploadImage(event, false)}/>
                </label>
            </div>
        </div>
    );
}

export default GoalImageModal;