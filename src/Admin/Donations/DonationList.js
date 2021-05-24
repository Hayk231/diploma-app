import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTableDonations} from "../../redux/Admin/adminMiddlewares";
import moment from "moment";
import EnhancedTable from "../../Helpers/components/ListTable/ListTable";
import {MenuItem, Select} from "@material-ui/core";
import {outUser, triggerChange} from "../../redux/Admin/adminActions";
import {setLoading} from "../../redux/loadingActions";
import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";

const DonationList = () => {

    const {donations} = useSelector(state => state.admin);
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

    const confirmDonation = (goalId, donationId) => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + `donations/${goalId}/${donationId}`, '',
                {headers: {Authorization: AuthStr}}).then(() => {
                dispatch(triggerChange())
            }).catch(error => {
                if (error && error.response && error.response.status === 401) {
                    dispatch(outUser())
                }
            })
        } else {
            dispatch(outUser())
        }
    };

    const cancelDonation = (goalId, donationId) => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.delete(baseUrl + `donations/${goalId}/${donationId}`,
                {headers: {Authorization: AuthStr}}).then(() => {
                dispatch(triggerChange())
            }).catch(error => {
                if (error && error.response && error.response.status === 401) {
                    dispatch(outUser())
                }
            })
        } else {
            dispatch(outUser())
        }
    };

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
                <div className='donation_action_buttons'>
                    <button onClick={() => confirmDonation(el.goalId, el.id)}>Confirm</button>
                    <button onClick={() => cancelDonation(el.goalId, el.id)}>Cancel</button>
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
            id: 'actions', numeric: false, disablePadding: false,
            label: 'Actions', disableSorting: true, align: 'center'
        }]
    }

    const filters = [
        {value: 'CONFIRMED', label: 'Confirmed'},
        {value: 'CREATED', label: 'Created'},
    ];

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
                           extra='' disableSelect={true}/>
        </div>
    );
};

export default DonationList;