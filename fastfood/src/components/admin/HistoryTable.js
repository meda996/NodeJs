import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: "#F88C00",
  },
  body: {
    fontSize: 14,
    '&.active' : {
      backgroundColor : "pink"
    }
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    borderLeft: "1px solid gray",
    borderRight: "1px solid gray",
  },
}))(TableRow);

function createData(nazivPredmeta, id) {
  return { nazivPredmeta, id };
}


const useStyles = makeStyles({
  table: {
    width: 'fit-content',
    marginLeft: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    borderBottom: "2px solid gray"
  },
});

function PredmetiTabela(props) {
  const classes = useStyles();
  const [rows,setRows] = React.useState([]);
 
  useEffect(() => {

    const fillRows = () => {
        return(
            <div></div>
        )
        }
  })

  const handleClick = (event) => {
    props.cb(event.target.id);
    setAktivan(event.target.id);
  }

  return (
    <TableContainer >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Naziv Predmeta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow hover key={row._id}>
              <StyledTableCell id={red.id}  component="th" onClick={handleClick} scope="row">
                {row.nesto}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect()(PredmetiTabela);