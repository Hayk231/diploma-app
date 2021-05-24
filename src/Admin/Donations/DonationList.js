import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTableDonations} from "../../redux/Admin/adminMiddlewares";
import moment from "moment";
import EnhancedTable from "../../Helpers/components/ListTable/ListTable";
import {MenuItem, Select} from "@material-ui/core";
import {triggerChange} from "../../redux/Admin/adminActions";

const DonationList = () => {

    const { donations } = useSelector(state => state.admin);
    const [filter, setFilter] = useState('CONFIRMED');
    const [type, setType] = useState('ONE_TIME');
    const [allowRerender, setAllowRerender] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (allowRerender) {
            dispatch(triggerChange())
        } else {
            setAllowRerender(true)
        }
    }, [type])

    const getDonations = (filter, order, orderBy, page, rowsPerPage) => {
        const offset = page * rowsPerPage;
        const limit = rowsPerPage;
        const ascending = order === 'asc';
        dispatch(getTableDonations({
            donationType: type,
            donationStatus: filter,
            orderBy,
            offset,
            limit,
            ascending
        }))
    }

    const donationRow = donations.map(el => {
        const row = {
            'id': el.id,
            'userId': el.userId,
            'goalId': el.goalId,
            'amount': el.amount,
            'time': moment(el.time).format('LL'),
        };
        if (el.donationStatus === 'CREATED') {
            row.actions = (
                <div>
                    <button>Confirm</button>
                    <button>Cancel</button>
                </div>
            )
        }
        return row
    });

    let headCells = [
        {id: 'userId', numeric: true, disablePadding: false, label: 'User ID'},
        {id: 'goalId', numeric: true, disablePadding: false, label: 'Goal ID'},
        {id: 'amount', numeric: true, disablePadding: false, label: 'Amount ($)'},
        {id: 'time', numeric: false, disablePadding: false, label: 'Create date'},
    ];

    if (filter === 'CREATED') {
        headCells = [...headCells, {
            id: 'actions', numeric: false, disablePadding: false, label: 'Actions', disableSorting: true
        }]
    }

    const filters = [
        {value: 'CONFIRMED', label: 'Confirmed'},
        {value: 'CREATED', label: 'Created'},
    ];

    const extra = (
        <div style={{width: '120px', marginLeft: '20px', cursor: 'pointer', color: '#8DBFBE'}}>
            Create Donation
        </div>
    );

    const types = [
        {value: 'ONE_TIME', label: 'One Time'},
        {value: 'SUBSCRIPTION', label: 'Subscription'},
    ]

    const typeComponent = () => (
        <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={type}
            onChange={event => setType(event.target.value)}
        >
            {
                types.map(el => (
                    <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                ))
            }
        </Select>
    );

    return (
        <div>
            <EnhancedTable rows={donationRow} headCells={headCells} hideId={true}
                           tableTitle={typeComponent()} filter={filter} setFilter={setFilter}
                           filters={filters} getData={getDonations} defOrder='amount'
                           extra={extra} disableSelect={true}/>
        </div>
    );
};

export default DonationList;