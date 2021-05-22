import React from 'react';
import './AdminHeader.scss';
import {Link, useHistory} from "react-router-dom";
import {outUser} from "../../redux/Admin/adminActions";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch} from "react-redux";

const navBarContents = [
    {label: 'Users', path: './users', absPath: '/admin/users'},
    {label: 'Goals', path: './goals', absPath: '/admin/goals'},
    {label: 'Donations', path: './donations', absPath: '/admin/donations'},
]

const AdminHeader = () => {

    const dispatch = useDispatch()
    const history = useHistory();

    return (
        <div className='admin_header'>
            <Link to='/' style={{color: '#fff'}}>Logo</Link>
            <div className='admin_header_navbar'>
                {
                    navBarContents.map(el => {
                        return (
                            <Link to={el.path} key={el.path} className={el.absPath === history.location.pathname ?
                                'admin_header_navbar_item_active' : ''}>
                                {el.label}
                            </Link>
                        )
                    })
                }
                <ExitToAppIcon onClick={() => dispatch(outUser())}/>
            </div>
        </div>
    );
};

export default AdminHeader;