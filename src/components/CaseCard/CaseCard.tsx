import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link, Divider
} from '@material-ui/core';
import classes from './CaseCard.module.scss';

type PropsType = {
  title: string,
  desc: string,
  address: string,
  occurredAt: number,
  updatedAt: number,
  url: string,
  imageThumbUrl: string | null,
};

const CaseCard: React.FC<PropsType> = (_props) => <>
  <Card className={classes.root}>
    <CardMedia className={classes.thumbBox}>
      <div>
        <img src={_props.imageThumbUrl ? _props.imageThumbUrl : 'https://fakeimg.pl/300x300/'} alt="thumb"/>
      </div>
    </CardMedia>
    <CardContent className={classes.content}>
      <div className={classes.title}>
        <Link href={_props.url} target="_blank" rel="noreferrer">{_props.title}</Link>
      </div>
      <Typography variant="subtitle1" color="textSecondary">{_props.desc}</Typography>
      <Divider style={{margin: '15px 0'}}/>
      <Typography variant="subtitle1" color="textSecondary"><strong>Theft
        date</strong>: {new Date(_props.occurredAt * 1000).toUTCString()}</Typography>
      <Typography variant="subtitle1" color="textSecondary"><strong>Report
        date</strong>: {new Date(_props.updatedAt * 1000).toUTCString()}</Typography>
      <Typography variant="subtitle1" color="textSecondary"><strong>Location</strong>: {_props.address}</Typography>
    </CardContent>
  </Card>
</>

export default CaseCard;
