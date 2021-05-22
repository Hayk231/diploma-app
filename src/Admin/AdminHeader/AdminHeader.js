import React from 'react';
import './AdminHeader.scss';
import {Link, useHistory} from "react-router-dom";

const navBarContents = [
    {label: 'Users', path: './users', absPath: '/admin/users'},
    {label: 'Goals', path: './goals', absPath: '/admin/goals'},
    {label: 'Donations', path: './donations', absPath: '/admin/donations'},
]

const AdminHeader = () => {

    const history = useHistory();

    return (
        <div className='admin_header'>
            <Link to='/' style={{color: '#fff'}}>Logo</Link>
            <div className='admin_header_navbar'>
                {
                    navBarContents.map(el => {
                        console.log(el.path, history.location.pathname)
                        return (
                            <Link to={el.path} key={el.path} className={el.absPath === history.location.pathname ?
                                'admin_header_navbar_item_active' : ''}>
                                {el.label}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AdminHeader;