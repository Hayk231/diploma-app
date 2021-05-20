import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTableGoals, updateGoalActiveness} from "../../redux/Admin/adminMiddlewares";
import EnhancedTable from "../../Helpers/components/ListTable/ListTable";
import defImage from "../../User/images/default_image.jpg";
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import {openEditModal} from "../../redux/User/userActions";
import moment from "moment";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';
import {Fade, Menu, MenuItem} from "@material-ui/core";

const GoalList = () => {

    const {goals} = useSelector(state => state.admin);
    const {editModal} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useState(1);
    const [changeEl, setChangeEl] = useState(null);
    const open = Boolean(anchorEl);

    const getGoals = (filter, order, orderBy, page, rowsPerPage) => {
        const offset = page * rowsPerPage;
        const limit = rowsPerPage;
        const ascending = order === 'asc';
        dispatch(getTableGoals({active: !!filter, orderBy, offset, limit, ascending}))
    }

    const handleActionOpen = (event, data) => {
        event.stopPropagation();
        setChangeEl(data)
        setAnchorEl(event.currentTarget);
    };

    const handleActionClose = (event) => {
        event && event.stopPropagation();
        setChangeEl(null)
        setAnchorEl(null);
    };

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
                <div className='row_actions_menu' key={el.id}>
                    <div onClick={(event) => handleActionOpen(event, el)}>
                        <MoreVertIcon/>
                    </div>
                </div>
            )
        }
    });

    const handleTextEdit = (event) => {
        event.stopPropagation();
        dispatch(openEditModal({type: 'goalTextEdit', data: changeEl}))
        handleActionClose();
    }
    const handleImageEdit = (event) => {
        event.stopPropagation();
        dispatch(openEditModal({type: 'goalImageEdit', data: changeEl}))
        handleActionClose()
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
        dispatch(updateGoalActiveness(selected, !filter))
    }

    const filters = [
        {value: 1, label: 'Active'},
        {value: 0, label: 'Inactive'},
    ];

    const selectedActionContent = filter ? { title: 'Deactivate', icon: <BlockIcon style={{color: '#f56069'}}/> }
                                         : { title: 'Activate', icon: <CheckCircleIcon style={{color: '#7fdc8b'}}/> }

    return (
        <>
            {editModal && <ModalContainer type={editModal}/>}
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
                <MenuItem onClick={handleTextEdit}>Edit Texts</MenuItem>
                <MenuItem onClick={handleImageEdit}>Edit Images</MenuItem>
            </Menu>
            <EnhancedTable rows={goalsRow} headCells={headCells} hideId={true}
                           selectedAction={selectedAction} tableTitle='Goals' filter={filter}
                           setFilter={setFilter} filters={filters} getData={getGoals} selectedActionContent={selectedActionContent}
            />
        </>
    );
}

export default GoalList;