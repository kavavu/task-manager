import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const globalStyles = makeStyles((theme: Theme) =>
  createStyles({

    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      padding: theme.spacing(3),
      
    },

  }),
);

 
