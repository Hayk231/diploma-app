import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTableUsers, updateGoalActiveness, updateUserActiveness} from "../../redux/Admin/adminMiddlewares";
import moment from "moment";
import {openEditModal} from "../../redux/User/userActions";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import {MenuItem, Select} from "@material-ui/core";
import EnhancedTable from "../../Helpers/components/ListTable/ListTable";
import {triggerChange} from "../../redux/Admin/adminActions";

const UserList = () => {
    const {users} = useSelector(state => state.admin);
    const {editModal} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(0);
    const [allowRerender, setAllowRerender] = useState(false)
    const [role, setRole] = useState('USER');

    const getUsers = (filter, order, orderBy, page, rowsPerPage) => {
        const offset = page * rowsPerPage;
        const limit = rowsPerPage;
        const ascending = order === 'asc';
        dispatch(getTableUsers({
            blocked: !!filter,
            role,
            orderBy,
            offset,
            limit,
            ascending
        }))
    }

    useEffect(() => {
        if (allowRerender) {
            dispatch(triggerChange())
        } else {
            setAllowRerender(true)
        }
    }, [role])

    const usersRow = users.map(el => {
        const row = {
            'USER': {
                'id': el.id,
                'data.fullName': el.data.fullName,
                'data.birthday': moment(el.data.birthday).format('LL'),
                'data.country': el.data.country,
                'data.gender': el.data.gender,
                'email': el.email
            },
            'ORGANIZATION': {
                'id': el.id,
                'data.fullName': el.data.fullName,
                'email': el.email
            },
            'ADMIN': {
                'id': el.id,
                'email': el.email
            }
        }

        return row[role]
    });

    const handleGoalAdd = () => {
        dispatch(openEditModal({type: 'userAdd', data: {roles}}))
    }

    const headCells = role === 'USER' ? [
            {id: 'data.fullName', numeric: false, disablePadding: false, label: 'Full Name'},
            {id: 'data.birthday', numeric: false, disablePadding: false, label: 'Birthday'},
            {id: 'data.country', numeric: false, disablePadding: false, label: 'Country'},
            {id: 'data.gender', numeric: false, disablePadding: false, label: 'Gender'},
            {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
        ]
        : role === 'ORGANIZATION' ? [
                {id: 'data.fullName', numeric: false, disablePadding: false, label: 'Full Name'},
                {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
            ]
            : [
                {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
            ]

    const selectedAction = (selected) => {
        dispatch(updateUserActiveness(selected, !filter, role))
    }

    const filters = [
        {value: 0, label: 'Active'},
        {value: 1, label: 'Blocked'},
    ];

    const selectedActionContent = !filter ? {title: 'Block', icon: <BlockIcon style={{color: '#f56069'}}/>}
        : {title: 'Activate', icon: <CheckCircleIcon style={{color: '#7fdc8b'}}/>};

    const extra = (
        <div style={{width: '80px', marginLeft: '20px', cursor: 'pointer', color: '#8DBFBE'}}
             onClick={handleGoalAdd}>
            +Add User
        </div>
    );

    const roles = [
        {value: 'USER', label: 'User'},
        {value: 'ORGANIZATION', label: 'Organization'},
        {value: 'ADMIN', label: 'Admin'},
    ]

    const roleComponent = () => (
        <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={role}
            onChange={event => setRole(event.target.value)}
        >
            {
                roles.map(el => (
                    <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                ))
            }
        </Select>
    );

    return (
        <div>
            {editModal && <ModalContainer type={editModal}/>}
            <EnhancedTable rows={usersRow} headCells={headCells} hideId={true}
                           selectedAction={selectedAction} tableTitle={roleComponent()} filter={filter}
                           setFilter={setFilter} filters={filters} getData={getUsers} defOrder='email'
                           selectedActionContent={selectedActionContent} extra={extra}
            />
        </div>
    );
};

export default UserList;