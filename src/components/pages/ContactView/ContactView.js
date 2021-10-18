import React from 'react';
import { 
  Grid, Divider, Typography, IconButton, Avatar
    } from '@material-ui/core';
import {
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } 
  from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      main: {
        display: 'flex'
      },
      page: {
        width: '100%',
        padding: theme.spacing(10),
      },
      field: {
        margin: theme.spacing(3.5)
      },
      fieldnew: {
        margin: theme.spacing(4),
        color: 'black',
      },
      typography: {
        marginLeft: theme.spacing(3.3),
        marginRight: theme.spacing(.5),
        marginTop: theme.spacing(.5),
        marginBottom: theme.spacing(.5),
        color: 'gray',
      },
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      textField: {
        width : "90%",
        borderBottom : "none",
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
      table: {
        minWidth: 500,
        border: 0,
      },
      cell: {
        borderBottom: 'none'
      }
    }),
);

export default function ContactView({ contact, currEvents }) {
  const classes = useStyles();

  let currEvent = currEvents;

  const currDate = new Date();

  console.log(currDate)

  return (
    <div>
        
      <Divider/>

      <DialogTitle>
          <IconButton>
            <Avatar 
              src= {contact[0].imageUrl}
              style={{
                margin: "5px",
                width: "110px",
                height: "110px",
              }} 
            />
            </IconButton>
          <Typography gutterBottom variant='h3'>
            { contact[0].Name }
          </Typography>
      </DialogTitle>
      
      <DialogContent>
        
        <Typography gutterBottom variant='h4'>
          Future Interactions
        </Typography>
      
        <DialogContentText>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead> 
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography variant='h6'  className={classes.typography}> Date </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Description </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Notes </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currEvent.map((row) => 
                  { Date.parse(row.Date) < Date.parse(currDate) &&
                    
                  <TableRow className={classes.row} key={row.date}>
                    <TableCell className={classes.cell} component="th" scope="row">
                      <Typography> {row.Date} </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                    <Typography> {row.Occasion} </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                    <Typography> {row.Description} </Typography>
                    </TableCell>
                  </TableRow>
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>

        <br/>
      
        <Typography gutterBottom variant='h4'>
          Details
        </Typography>

        <DialogContentText>
          <Grid container>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Name }
            </Grid>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Email }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Birthday
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Birthday }
            </Grid>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Phone Number
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Phone_Number }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Location
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Location }
            </Grid>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Education
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Education }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Industry
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Industry }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Company
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Company }
            </Grid>
            <Grid item xs={2}>
              <br/>
              <Typography 
              variant='h6' 
              className={classes.typography}
              >
                Position
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Position }
            </Grid>
          </Grid>
        </DialogContentText>
      
        <br/>
      
        <Typography gutterBottom variant='h4'>
          Past Interactions
        </Typography>

        <DialogContentText>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead> 
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography variant='h6'  className={classes.typography}> Date </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Description </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Notes </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currEvent.map((row) => 
                  { row.Date < currDate &&
                    <TableRow className={classes.row} key={row.date}>
                      <TableCell className={classes.cell} component="th" scope="row">
                        <Typography> {row.Date} </Typography>
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                      <Typography> {row.Occasion} </Typography>
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                      <Typography> {row.Description} </Typography>
                      </TableCell>
                    </TableRow>
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </div>
  );
}
