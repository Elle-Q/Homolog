import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {open} from "./item-slice";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {StyledTableCell, StyledTableRow} from "../../../features/table/table";
import TableBody from "@mui/material/TableBody";
import Action from "../../../features/table/action";
import {listItem} from "../../../api/item.service";
import OpenIconSpeedDial from "../../../common/open-icon-speed-dial";
import ItemModal from "./item-modal";
import api from "../../../api/api";
import {openAlert} from "../../../features/alert/alertSlice";

function Item(props) {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        listItem().then((data) => {
            setItems(data)
        })
    }, [])

    const handleAddClick = () =>
        dispatch(
            open({
                readOnly: false,
                data:{}
            }));

    const actions = [
        {icon: <AddIcon/>, name: '添加', onClick:handleAddClick},
        {icon: <DeleteIcon/>, name: '批量删除'},
        {icon: <DoNotDisturbOnIcon/>, name: '批量下架'},
    ];


    const handleDel = async (id) => {
        api.post('/homo-admin/item/delete', {
            id: id
        }).then((resp) => {
            if (resp) {
                const arr = items.filter((item) => item.ID !== id);
                setItems(arr);
            }
        })
        dispatch(openAlert())
    }

    const handleOpen = (data) => {
        dispatch(open({
            readOnly:true,
            type:"show",
            data:data,
        }))
    }


    const handleEdit = (data) => {
        dispatch(open({
            readOnly:false,
            type:"edit",
            data:data,
        }))
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>id</StyledTableCell>
                            <StyledTableCell align="center">名称</StyledTableCell>
                            <StyledTableCell align="center">类别</StyledTableCell>
                            <StyledTableCell align="center">预览图</StyledTableCell>
                            <StyledTableCell align="center">作者</StyledTableCell>
                            <StyledTableCell align="center">得分</StyledTableCell>
                            <StyledTableCell align="center">下载量</StyledTableCell>
                            <StyledTableCell align="center">价格</StyledTableCell>
                            <StyledTableCell align="center">创建时间</StyledTableCell>
                            <StyledTableCell align="center">更新时间</StyledTableCell>
                            <StyledTableCell align="center">操作</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            items.map((row) => (
                                <StyledTableRow key={row.ID}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.ID}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.Name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Cat.Title}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Preview}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Author}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Scores}</StyledTableCell>
                                    <StyledTableCell align="center">{row.DownCnt}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Price}</StyledTableCell>
                                    <StyledTableCell align="center">{row.UpdateTime}</StyledTableCell>
                                    <StyledTableCell align="center">{row.CreateTime}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Action data={row}
                                                handleDel={handleDel}
                                                handleOpen={handleOpen}
                                                handleEdit={handleEdit}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {OpenIconSpeedDial(actions)}

            <ItemModal />
        </React.Fragment>
    );
}

export default Item;