import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import TransactionDialogView from "./transaction-dialog-view";
import { setTableData, deleteTransaction } from "../actions/home-action";
import {
  saveTransaction,
  getTransactionsData,
} from "../actions/transactions-action";
import categoriesData from "../tack/categories";
import "../styles/table-view.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core/";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100%",
  },
});

const TableView = ({ headers }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dataForEditDialog, setDataForEditDialog] = useState();
  const { selectedItemId, tableData, transactionsData } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(setTableData(selectedItemId));
  }, [selectedItemId, transactionsData]);

  const handleEdit = (id) => {
    const data = getTransactionDataById(id);
    setDataForEditDialog(data);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (t_id) => {
    dispatch(deleteTransaction(t_id)).then(() => {
      dispatch(setTableData(selectedItemId));
      dispatch(getTransactionsData());
    });
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveTransaction = (transactionData, t_id) => {
    dispatch(saveTransaction(transactionData, t_id)).then(() => {
      dispatch(getTransactionsData());
      dispatch(setTableData(selectedItemId));
      setIsEditDialogOpen(false);
    });
  };

  const getTransactionDataById = (id) => {
    let tableDataClone = _.cloneDeep(tableData);
    let data = _.find(tableDataClone, { t_id: id });
    delete data.user_id;
    delete data.type;

    //Converting date and time into format which is accepted by html datetime-local input
    const datetimeSplit = data.datetime.split("-");
    const daySplit = datetimeSplit[0];
    const monthSplit = datetimeSplit[1];
    datetimeSplit[0] = monthSplit;
    datetimeSplit[1] = daySplit;

    let date = new Date(datetimeSplit.join("-"));

    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;

    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;

    const year = date.getFullYear();

    let hour = date.getHours();
    hour = hour < 10 ? `0${hour}` : hour;

    let minute = date.getMinutes();
    minute = minute < 10 ? `0${minute}` : minute;

    const dateString = `${year}-${month}-${day}T${hour}:${minute}`;
    data.datetime = dateString;
    data.amount = data.amount.slice(1);

    return data;
  };

  const getEditDialog = () => {
    return (
      isEditDialogOpen && (
        <TransactionDialogView
          open={isEditDialogOpen}
          desc={dataForEditDialog.description}
          amount={dataForEditDialog.amount}
          category={dataForEditDialog.category}
          datetime={dataForEditDialog.datetime}
          id={dataForEditDialog.t_id}
          onCloseHandler={handleDialogClose}
          onSaveHandler={handleSaveTransaction}
        />
      )
    );
  };

  const getViewAccordingToHeader = (column, rowData) => {
    switch (column.id) {
      case "action":
        return (
          <TableCell>
            <div className="tableCellIconsContainer">
              <EditIcon
                fontSize="small"
                cursor="pointer"
                onClick={handleEdit.bind(this, rowData.t_id)}
                style={{ marginRight: "15px" }}
              />
              <DeleteIcon
                fontSize="small"
                cursor="pointer"
                onClick={handleDelete.bind(this, rowData.t_id)}
              />
            </div>
          </TableCell>
        );

      case "caegory":
        const categoryId = rowData[column.id];
        const category = _.find(categoriesData, { id: rowData[column.id] });
        const { label } = category;
        return <TableCell key={column.id}>{label}</TableCell>;

      default:
        return <TableCell key={column.id}>{rowData[column.id]}</TableCell>;
    }
  };
  const getRow = (rowData) => {
    return (
      <TableRow key={rowData.id}>
        {headers.map((header) => getViewAccordingToHeader(header, rowData))}
      </TableRow>
    );
  };

  return (
    <div className="tableViewContainer">
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.id}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>{tableData.map((row) => getRow(row))}</TableBody>
        </Table>
      </TableContainer>
      {getEditDialog()}
    </div>
  );
};

export default TableView;
