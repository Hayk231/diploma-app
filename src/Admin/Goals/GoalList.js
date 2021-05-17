import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTableGoals, updateGoalActiveness} from "../../redux/Admin/adminMiddlewares";
import Loading from "../../Helpers/components/Loading/Loading";
import EnhancedTable from "../../Helpers/components/ListTable/ListTable";
import defImage from "../../User/images/default_image.jpg";
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import {openEditModal} from "../../redux/User/userActions";
import moment from "moment";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Fade, Menu, MenuItem} from "@material-ui/core";

const GoalList = () => {

    const {goals, goalsCount} = useSelector(state => state.admin);
    const {editModal} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useState(1);
    const [orderBy, setOrderBy] = useState('amount');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const offset = page * rowsPerPage;
        const limit = page * rowsPerPage + rowsPerPage;
        const ascending = order === 'asc';
        dispatch(getTableGoals({active: !!filter, orderBy, offset, limit, ascending}))
    }, [filter, order, orderBy, page, rowsPerPage])

    const handleActionOpen = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleActionClose = (event) => {
        event && event.stopPropagation();
        setAnchorEl(null);
    };

    if (!goals.length) {
        return <Loading/>
    }
    const goalsRow = goals.map(el => {
        const imageSrc = el.thumbnailImageData ? el.thumbnailImageData.url : defImage;
        return {
            'id': el.id,
            'title': (
                <div className='row_with_image'>
                    <img src={imageSrc}
                         alt={el.title}/>
                    {el.title}
                </div>
            ),
            'description': el.description.slice(0, 18),
            'amount': el.amount,
            'statistics.collected': el.statistics.collected.toFixed(2),
            'statistics.supportersCount': el.statistics.supportersCount,
            'dateCreated': moment(el.dateCreated).format('LL'),
            'actions': (
                <div className='row_actions_menu'>
                    <div onClick={handleActionOpen}>
                        <MoreVertIcon/>
                    </div>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        anchorPosition={{left: 20, top: 40}}
                        keepMounted
                        open={open}
                        onClose={handleActionClose}
                        classes={{paper: 'row_popover'}}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={(event) => handleTextEdit(event, el)}>Edit Texts</MenuItem>
                        <MenuItem onClick={(event) => handleImageEdit(event, el)}>Edit Images</MenuItem>
                    </Menu>
                </div>
            )
        }
    });

    const handleTextEdit = (event, data) => {
        event.stopPropagation();
        handleActionClose()
        dispatch(openEditModal({type: 'goalTextEdit', data}))
    }
    const handleImageEdit = (event, data) => {
        event.stopPropagation();
        handleActionClose()
        dispatch(openEditModal({type: 'goalImageEdit', data}))
    }

    const headCells = [
        {id: 'title', numeric: false, disablePadding: false, label: 'Details'},
        {id: 'description', numeric: false, disablePadding: false, label: 'Description'},
        {id: 'amount', numeric: true, disablePadding: false, label: 'Amount ($)'},
        {id: 'statistics.collected', numeric: true, disablePadding: false, label: 'Collected ($)'},
        {id: 'statistics.supportersCount', numeric: true, disablePadding: false, label: 'Supporters'},
        {id: 'dateCreated', numeric: false, disablePadding: false, label: 'Create date'},
        {id: 'actions', numeric: true, disablePadding: false, label: 'Actions', disableSorting: true},
    ];

    const selectedAction = (selected) => {
        dispatch(updateGoalActiveness(selected))
    }

    const filters = [
        {value: 1, label: 'Active'},
        {value: 0, label: 'Inactive'},
    ];

    return (
        <>
            {editModal && <ModalContainer type={editModal}/>}
            <EnhancedTable rows={goalsRow} headCells={headCells} hideId={true}
                           selectedAction={selectedAction} tableTitle='Goals'
                           filter={filter} setFilter={setFilter} filters={filters}
                           orderBy={orderBy} setOrderBy={setOrderBy} averageCount={goalsCount}
                           order={order} setOrder={setOrder}
                           page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
            />
        </>
    );
}

export default GoalList;